'use client';
import React from 'react';

export function useScroll(threshold: number | (() => number)) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		const currentThreshold = typeof threshold === 'function' ? threshold() : threshold;
		setScrolled(window.scrollY > currentThreshold);
	}, [threshold]);

	React.useEffect(() => {
		onScroll(); // initial check
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		}
	}, [onScroll]);

	return scrolled;
}
