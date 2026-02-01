/**
 * Strips event handlers and script tags from SVG path content
 * used with {@html} to prevent XSS from CMS-sourced icon fields.
 */
export function sanitizeSvgContent(raw: string): string {
	return raw
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/\bon\w+\s*=\s*"[^"]*"/gi, '')
		.replace(/\bon\w+\s*=\s*'[^']*'/gi, '');
}
