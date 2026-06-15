'use client';

import { useEffect, useRef, useReducer, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  eager?: boolean;
}

type State = 'idle' | 'settling' | 'done';

export default function LazySection({
  children,
  rootMargin = '300px 0px',
  minHeight = '60vh',
  eager = false,
}: LazySectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(
    (_: State, next: State) => next,
    eager ? 'done' : 'idle',
  );

  useEffect(() => {
    if (state !== 'idle') return;
    const el = outerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      dispatch('settling');
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          dispatch('settling');
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [state, rootMargin]);

  useEffect(() => {
    if (state !== 'settling') return;

    // After children render, measure their real height and fix the outer
    // wrapper to that exact height. This means the placeholder height
    // matches the real content — no layout shift, no scroll jump.
    // Then after 2 rAFs (Framer Motion has applied initial styles),
    // release the fixed height and go to done.
    const outer = outerRef.current;
    const inner = innerRef.current;
    let id1: number, id2: number;

    id1 = requestAnimationFrame(() => {
      // First rAF: real content has rendered, measure it.
      if (outer && inner) {
        const realHeight = inner.getBoundingClientRect().height;
        if (realHeight > 0) {
          // Lock outer to the real height so page length doesn't change.
          outer.style.minHeight = `${realHeight}px`;
        }
      }
      id2 = requestAnimationFrame(() => {
        // Second rAF: Framer Motion initial styles are set. Release height.
        if (outer) {
          outer.style.minHeight = '';
        }
        dispatch('done');
      });
    });

    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
      if (outer) outer.style.minHeight = '';
    };
  }, [state]);

  const placeholder = state === 'idle' || state === 'settling';

  return (
    <div
      ref={outerRef}
      style={placeholder ? { minHeight, background: '#ffffff' } : undefined}
    >
      {(state === 'settling' || state === 'done') ? (
        <div
          ref={innerRef}
          className={state === 'settling' ? 'fw-lazy-settling' : undefined}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
