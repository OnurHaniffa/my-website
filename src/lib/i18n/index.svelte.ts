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
		// Locale precedence (server > URL > localStorage):
		//
		// The server (hooks.server.ts) is the source of truth. It already
		// detected URL prefix (`/tr/*`) AND TR-keyword slug routes (e.g.
		// `/kadikoy-web-tasarim/`) and set locale via setLocaleFromServer
		// BEFORE this function runs.
		//
		// We must NOT let localStorage override the server. That would cause
		// hydration mismatches: SSR HTML uses server locale, client JS would
		// flip to localStorage value, footer text would flicker, internal
		// links would point at the wrong locale prefix.
		//
		// localStorage is only consulted when:
		//   1. URL has no /tr prefix AND
		//   2. URL is not a TR-only slug (i.e., we're on a "neutral" route
		//      like the homepage `/` where the server defaulted to 'en' and
		//      the user's stored preference can apply).
		//
		// We can't detect TR-only slugs from the client without duplicating
		// the allowlist. Instead we infer: if server set 'tr', that's a
		// definitive signal — don't override. Only override 'en' from
		// localStorage on URLs without /tr prefix.
		const urlForcesTr = window.location.pathname.startsWith('/tr');
		if (urlForcesTr) {
			locale = 'tr';
		} else if (locale === 'en') {
			// Server defaulted to 'en' — user's stored preference may apply.
			// (If server forced 'tr' via TR-only slug, we leave it alone.)
			const stored = localStorage.getItem('locale');
			if (stored === 'tr') locale = 'tr';
		}
		// Note: we deliberately do NOT write back to localStorage here.
		// That happens explicitly via setLocale() when the user toggles.
		// Auto-syncing on every page load means if the user lands on a TR-only
		// page (server sets locale='tr'), localStorage gets 'tr' written, and
		// when they next visit `/` they'll see TR — which they didn't choose.
		// localStorage should reflect explicit user intent only.
		document.documentElement.lang = locale;
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
