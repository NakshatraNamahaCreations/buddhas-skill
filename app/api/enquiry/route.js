// POST /api/enquiry
// Sends two emails via Gmail (nodemailer):
//   1) internal notification to admissions
//   2) branded auto-reply back to the enquirer
//
// Env vars required in .env.local (do NOT commit):
//   GMAIL_USER            — Gmail address nodemailer authenticates as
//   GMAIL_APP_PASSWORD    — 16-char App Password (NOT the regular password)
//   ADMISSIONS_EMAIL      — where the internal notification lands
//   BRAND_NAME (optional) — display name on outgoing emails

import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// CORS — comma-separated list of origins in ALLOWED_ORIGINS env var.
// Never use '*' here, this endpoint sends real email.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim().replace(/\/$/, ''))
  .filter(Boolean);

function corsHeaders(origin) {
  if (!ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

// Preflight — browsers send OPTIONS before a POST with a JSON body.
// Without a 200/204 here, the POST never fires cross-origin.
export async function OPTIONS(request) {
  const origin = request.headers.get('origin') || '';
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Belt-and-braces sanitiser: strips control chars and angle brackets,
// caps length to prevent header injection and giant-payload DoS.
const clean = (s, max = 500) =>
  String(s ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, max);

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

function validate(body) {
  const errors = {};
  const name    = clean(body.name, 120);
  const phone   = clean(body.phone, 40);
  const email   = clean(body.email, 160);
  const program = clean(body.program, 120);
  const message = clean(body.message, 1000);

  if (!name)                        errors.name = 'Name is required.';
  if (!phone)                       errors.phone = 'Phone is required.';
  else if (!PHONE_RE.test(phone))   errors.phone = 'Enter a valid phone number.';
  if (!email)                       errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(email))   errors.email = 'Enter a valid email address.';
  if (!program)                     errors.program = 'Pick a program.';

  return { values: { name, phone, email, program, message }, errors };
}

function makeTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

function internalEmail({ name, phone, email, program, message }) {
  const brand = process.env.BRAND_NAME || "Buddha's Skill Academy";
  const subject = `New enquiry · ${program} · ${name}`;

  const text = [
    `New enquiry from the ${brand} website`,
    '',
    `Name:    ${name}`,
    `Phone:   ${phone}`,
    `Email:   ${email}`,
    `Program: ${program}`,
    '',
    message ? `Message:\n${message}` : '(no message)',
  ].join('\n');

  const html = `
    <table style="font-family:Arial,sans-serif;font-size:14px;color:#2b2720;line-height:1.5">
      <tr><td colspan="2" style="padding-bottom:12px;font-size:16px;font-weight:700;color:#b32830">
        New enquiry from the ${escapeHtml(brand)} website
      </td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#6b6459">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#6b6459">Phone</td><td>${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#6b6459">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#6b6459">Program</td><td>${escapeHtml(program)}</td></tr>
      ${message ? `<tr><td style="padding:12px 12px 4px 0;color:#6b6459;vertical-align:top">Message</td><td style="padding-top:12px;white-space:pre-wrap">${escapeHtml(message)}</td></tr>` : ''}
    </table>
  `;

  return { subject, text, html };
}

function autoReplyEmail({ name, program }) {
  const brand = process.env.BRAND_NAME || "Buddha's Skill Academy";
  const subject = `Thanks for reaching out, ${name.split(' ')[0]}`;

  const text = [
    `Hi ${name},`,
    '',
    `Thanks for enquiring about ${program} at ${brand}. We've received your details and someone from the admissions team will be in touch shortly.`,
    '',
    `If it's urgent, WhatsApp us on the number listed on our website.`,
    '',
    `— The ${brand} team`,
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#2b2720;line-height:1.55;max-width:560px">
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thanks for enquiring about <strong>${escapeHtml(program)}</strong> at ${escapeHtml(brand)}. We've received your details and someone from the admissions team will be in touch shortly.</p>
      <p>If it's urgent, WhatsApp us on the number listed on our website.</p>
      <p style="margin-top:24px;color:#6b6459">— The ${escapeHtml(brand)} team</p>
    </div>
  `;

  return { subject, text, html };
}

export async function POST(request) {
  const origin = request.headers.get('origin') || '';
  const headers = corsHeaders(origin);

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.ADMISSIONS_EMAIL) {
    return Response.json(
      { ok: false, error: 'Email service not configured on the server.' },
      { status: 500, headers }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400, headers });
  }

  const { values, errors } = validate(body);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 400, headers });
  }

  const brand = process.env.BRAND_NAME || "Buddha's Skill Academy";
  const transport = makeTransport();

  const internal = internalEmail(values);
  const reply    = autoReplyEmail(values);

  try {
    await Promise.all([
      transport.sendMail({
        from: `"${brand} Website" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMISSIONS_EMAIL,
        replyTo: `"${values.name}" <${values.email}>`,
        subject: internal.subject,
        text: internal.text,
        html: internal.html,
      }),
      transport.sendMail({
        from: `"${brand}" <${process.env.GMAIL_USER}>`,
        to: values.email,
        replyTo: process.env.ADMISSIONS_EMAIL,
        subject: reply.subject,
        text: reply.text,
        html: reply.html,
      }),
    ]);
  } catch (err) {
    console.error('[enquiry] send failed', err);
    return Response.json(
      { ok: false, error: 'Could not send email. Please try again or WhatsApp us.' },
      { status: 502, headers }
    );
  }

  return Response.json({ ok: true }, { headers });
}
