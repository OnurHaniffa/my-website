import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const resend = new Resend(RESEND_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, email, company, message } = await request.json();

		// Validate required fields
		if (!name || !email || !message) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Invalid email address' }, { status: 400 });
		}

		// Send email via Resend
		const { data, error } = await resend.emails.send({
			from: 'Haniffa Design Studio <hello@onurhaniffa.com>',
			to: ['contact@onurhaniffa.com'],
			replyTo: email,
			subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
			html: `
				<div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #1a1a1a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
						New Contact Form Submission
					</h2>

					<div style="margin: 20px 0;">
						<p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
						<p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
						${company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${company}</p>` : ''}
					</div>

					<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
						<p style="margin: 0; white-space: pre-wrap;">${message}</p>
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
