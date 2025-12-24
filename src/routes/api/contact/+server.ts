import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const resend = new Resend(RESEND_API_KEY);

// HTML escape function to prevent XSS
function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

// Simple in-memory rate limiting (works for single instance)
// For production with multiple instances, use Redis/KV store
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requests per minute

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const requests = rateLimitMap.get(ip) || [];
	const recentRequests = requests.filter((t) => now - t < RATE_LIMIT_WINDOW);

	if (recentRequests.length >= RATE_LIMIT_MAX) {
		return false;
	}

	rateLimitMap.set(ip, [...recentRequests, now]);
	return true;
}

// Clean up old entries periodically to prevent memory leak
setInterval(() => {
	const now = Date.now();
	for (const [ip, requests] of rateLimitMap.entries()) {
		const recentRequests = requests.filter((t) => now - t < RATE_LIMIT_WINDOW);
		if (recentRequests.length === 0) {
			rateLimitMap.delete(ip);
		} else {
			rateLimitMap.set(ip, recentRequests);
		}
	}
}, 60000); // Clean every minute

// Input length limits
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 100;
const MAX_COMPANY_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		// Rate limiting
		const clientIp = getClientAddress();
		if (!checkRateLimit(clientIp)) {
			return json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
		}

		const body = await request.json();
		const { name, email, company, message, _gotcha } = body;

		// Honeypot check - if filled, silently succeed (it's a bot)
		if (_gotcha) {
			return json({ success: true });
		}

		// Validate required fields
		if (!name || !email || !message) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Validate input lengths
		if (
			name.length > MAX_NAME_LENGTH ||
			email.length > MAX_EMAIL_LENGTH ||
			message.length > MAX_MESSAGE_LENGTH ||
			(company && company.length > MAX_COMPANY_LENGTH)
		) {
			return json({ error: 'Input exceeds maximum length' }, { status: 400 });
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Invalid email address' }, { status: 400 });
		}

		// Sanitize all user inputs to prevent XSS
		const safeName = escapeHtml(name.trim());
		const safeEmail = escapeHtml(email.trim());
		const safeCompany = company ? escapeHtml(company.trim()) : '';
		const safeMessage = escapeHtml(message.trim());

		// Send email via Resend
		const { data, error } = await resend.emails.send({
			from: 'Onur Haniffa <hello@onurhaniffa.com>',
			to: ['contact@onurhaniffa.com'],
			replyTo: email.trim(), // Use original email for reply-to
			subject: `New inquiry from ${safeName}${safeCompany ? ` (${safeCompany})` : ''}`,
			html: `
				<div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #1a1a1a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
						New Contact Form Submission
					</h2>

					<div style="margin: 20px 0;">
						<p style="margin: 8px 0;"><strong>Name:</strong> ${safeName}</p>
						<p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
						${safeCompany ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${safeCompany}</p>` : ''}
					</div>

					<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
						<p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
					</div>

					<hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
					<p style="color: #666; font-size: 12px;">
						This message was sent from your website contact form.
					</p>
				</div>
			`
		});

		if (error) {
			console.error('Resend error:', error);
			return json({ error: 'Failed to send email' }, { status: 500 });
		}

		return json({ success: true, id: data?.id });
	} catch (err) {
		console.error('Contact form error:', err);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
