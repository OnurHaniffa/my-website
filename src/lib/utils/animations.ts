import { animate, stagger } from 'motion';
import type { Action } from 'svelte/action';

// Motion v12 has different types - using any for compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const motionAnimate = animate as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const motionStagger = stagger as any;

// Smooth easing presets
export const easings = {
	snappy: [0.25, 0.1, 0.25, 1],
	smooth: [0.4, 0, 0.2, 1],
	gentle: [0.4, 0, 0.6, 1],
	bouncy: [0.68, -0.55, 0.265, 1.55]
};

// Fade in on mount
export const fadeIn: Action<HTMLElement, { duration?: number; delay?: number }> = (
	node,
	params = {}
) => {
	const { duration = 0.4, delay = 0 } = params;

	node.style.opacity = '0';

	const animation = motionAnimate(
		node,
		{ opacity: [0, 1] },
		{ duration, delay, easing: easings.smooth }
	);

	return {
		destroy() {
			animation.stop();
		}
	};
};

// Slide up and fade in
export const slideUp: Action<HTMLElement, { duration?: number; delay?: number; distance?: number }> = (
	node,
	params = {}
) => {
	const { duration = 0.5, delay = 0, distance = 20 } = params;

	node.style.opacity = '0';
	node.style.transform = `translateY(${distance}px)`;

	const animation = motionAnimate(
		node,
		{
			opacity: [0, 1],
			transform: [`translateY(${distance}px)`, 'translateY(0px)']
		},
		{ duration, delay, easing: easings.smooth }
	);

	return {
		destroy() {
			animation.stop();
		}
	};
};

// Scale in
export const scaleIn: Action<HTMLElement, { duration?: number; delay?: number }> = (
	node,
	params = {}
) => {
	const { duration = 0.4, delay = 0 } = params;

	node.style.opacity = '0';
	node.style.transform = 'scale(0.95)';

	const animation = motionAnimate(
		node,
		{
			opacity: [0, 1],
			transform: ['scale(0.95)', 'scale(1)']
		},
		{ duration, delay, easing: easings.snappy }
	);

	return {
		destroy() {
			animation.stop();
		}
	};
};

// Stagger children animation
export function staggerChildren(
	container: HTMLElement,
	selector: string,
	options: { delay?: number; staggerDelay?: number; duration?: number } = {}
) {
	const { delay = 0, staggerDelay = 0.05, duration = 0.4 } = options;
	const children = container.querySelectorAll(selector);

	children.forEach((child) => {
		(child as HTMLElement).style.opacity = '0';
		(child as HTMLElement).style.transform = 'translateY(10px)';
	});

	return motionAnimate(
		children,
		{
			opacity: [0, 1],
			transform: ['translateY(10px)', 'translateY(0px)']
		},
		{
			duration,
			delay: motionStagger(staggerDelay, { start: delay }),
			easing: easings.smooth
		}
	);
}

// Smooth transition between states (for service switching)
export function crossfade(
	outElement: HTMLElement | null,
	inElement: HTMLElement | null,
	duration = 0.25
) {
	const animations: ReturnType<typeof animate>[] = [];

	if (outElement) {
		animations.push(
			motionAnimate(outElement, { opacity: [1, 0] }, { duration: duration * 0.6, easing: 'ease-out' })
		);
	}

	if (inElement) {
		inElement.style.opacity = '0';
		animations.push(
			motionAnimate(
				inElement,
				{ opacity: [0, 1] },
				{ duration: duration * 0.8, delay: duration * 0.2, easing: 'ease-out' }
			)
		);
	}

	return animations;
}

// Animate background color smoothly
export function animateBackground(
	element: HTMLElement,
	fromColor: string,
	toColor: string,
	duration = 0.3
) {
	return motionAnimate(
		element,
		{ backgroundColor: [fromColor, toColor] },
		{ duration, easing: easings.smooth }
	);
}

// Utility: Check for reduced motion preference
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Safe animate wrapper that respects reduced motion
export function safeAnimate(
	element: HTMLElement | NodeListOf<Element>,
	keyframes: Parameters<typeof animate>[1],
	options: Parameters<typeof animate>[2]
) {
	if (prefersReducedMotion()) {
		// Just set final state immediately
		if (element instanceof HTMLElement) {
			Object.entries(keyframes).forEach(([prop, values]) => {
				const finalValue = Array.isArray(values) ? values[values.length - 1] : values;
				(element.style as any)[prop] = finalValue;
			});
		}
		return null;
	}
	return animate(element, keyframes, options);
}
