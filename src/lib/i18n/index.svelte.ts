import { browser } from '$app/environment';
import { en } from './translations/en';
import { tr } from './translations/tr';

export type Locale = 'en' | 'tr';

const translations: Record<Locale, typeof en> = { en, tr };

let locale = $state<Locale>('en');

export function getLocale(): Locale {
	return locale;
}

export function setLocale(newLocale: Locale) {
	locale = newLocale;
	if (browser) {
		localStorage.setItem('locale', newLocale);
		document.documentElement.lang = newLocale;
	}
}

export function initLocale() {
	if (browser) {
		// URL-based locale takes priority over localStorage
		if (window.location.pathname.startsWith('/tr')) {
			locale = 'tr';
			localStorage.setItem('locale', 'tr');
		} else {
			// Check if we're on an English URL - always use 'en' for non-/tr/ paths
			const stored = localStorage.getItem('locale');
			if (window.location.pathname.startsWith('/tr')) {
				locale = 'tr';
			} else {
				locale = 'en';
			}
			// Keep localStorage in sync
			localStorage.setItem('locale', locale);
		}
	}
}

/** Set locale from server data (for SSR) */
export function setLocaleFromServer(serverLocale: Locale) {
	locale = serverLocale;
}

/** Get the locale prefix for building links */
export function getLocalePath(path: string): string {
	if (locale === 'tr') {
		return `/tr${path === '/' ? '' : path}`;
	}
	return path;
}

export function t(key: string): string {
	const keys = key.split('.');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let value: any = translations[locale];
	for (const k of keys) {
		if (value == null) return key;
		value = value[k];
	}
	return typeof value === 'string' ? value : key;
}
