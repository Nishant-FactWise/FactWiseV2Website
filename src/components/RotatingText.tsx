'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: 'first' | 'last' | 'center';
  initial?: any;
  animate?: any;
  exit?: any;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: any;
  rotationInterval?: number;
  splitBy?: 'characters' | 'words';
  auto?: boolean;
  loop?: boolean;
}

const RotatingText = forwardRef<HTMLDivElement, RotatingTextProps>((props, ref) => {
  const {
    texts,
    mainClassName = '',
    staggerFrom = 'first',
    initial = { y: '100%' },
    animate = { y: 0 },
    exit = { y: '-120%' },
    staggerDuration = 0.025,
    splitLevelClassName = '',
    transition = { type: 'spring', damping: 30, stiffness: 400 },
    rotationInterval = 2000,
    splitBy = 'characters',
    auto = true,
    loop = true,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!auto) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (loop ? (prev + 1) % texts.length : Math.min(prev + 1, texts.length - 1)));
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts, rotationInterval, auto, loop]);

  const currentText = texts[currentIndex];
  
  const items = splitBy === 'characters' ? currentText.split('') : currentText.split(' ');

  return (
    <div ref={ref} className={`relative flex ${mainClassName}`}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className="flex whitespace-nowrap"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: {},
            visible: { 
              transition: { 
                staggerChildren: staggerDuration, 
                staggerDirection: staggerFrom === 'last' ? -1 : 1 
              } 
            },
            exit: { 
              transition: { 
                staggerChildren: staggerDuration, 
                staggerDirection: staggerFrom === 'last' ? -1 : 1 
              } 
            },
          }}
        >
          {items.map((item, i) => (
            <div key={i} className={`inline-block ${splitLevelClassName}`}>
              <motion.span
                className="inline-block"
                variants={{
                  hidden: initial,
                  visible: animate,
                  exit: exit,
                }}
                transition={transition}
              >
                {item === ' ' ? '\u00A0' : item}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
