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
	}
}

export function initLocale() {
	if (browser) {
		const stored = localStorage.getItem('locale');
		if (stored === 'en' || stored === 'tr') {
			locale = stored;
		}
	}
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
