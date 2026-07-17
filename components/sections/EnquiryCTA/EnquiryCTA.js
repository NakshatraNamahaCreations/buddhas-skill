'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import {
  FiUser,
  FiPhone,
  FiMail,
  FiBookOpen,
  FiMessageSquare,
  FiMessageCircle,
  FiSend,
  FiCheckCircle,
} from 'react-icons/fi';
import { brand, cta } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './EnquiryCTA.module.css';

// Simple, defensive regexes — validation only, not for security.
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitize = (s) => String(s || '').replace(/[\r\n<>]/g, '').trim().slice(0, 500);
const waNumber = (v) => String(v || '').replace(/\D/g, '');

function validate(values) {
  const errors = {};
  if (!values.name.trim())                        errors.name    = 'Please share your name.';
  if (!values.phone.trim())                       errors.phone   = 'Phone is required.';
  else if (!PHONE_RE.test(values.phone.trim()))   errors.phone   = 'Enter a valid phone number.';
  if (!values.email.trim())                       errors.email   = 'Email is required.';
  else if (!EMAIL_RE.test(values.email.trim()))   errors.email   = 'Enter a valid email address.';
  if (!values.program)                            errors.program = 'Pick a program.';
  return errors;
}

const emptyForm = { name: '', phone: '', email: '', program: '', message: '' };

export default function EnquiryCTA() {
  const rootRef  = useRef(null);
  const leftRef  = useRef(null);
  const cardRef  = useRef(null);
  const formRef  = useRef(null);

  const [values, setValues]   = useState(emptyForm);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const fields = gsap.utils.toArray('[data-field]', formRef.current);

      if (reduced) {
        gsap.set([leftRef.current, cardRef.current], { opacity: 1, y: 0 });
        gsap.set(fields, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(leftRef.current, { opacity: 0, x: -30 });
      gsap.set(cardRef.current, { opacity: 0, y: 30 });
      gsap.set(fields, { opacity: 0, y: 16 });

      gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
        .to(leftRef.current, { opacity: 1, x: 0, ease: 'power3.out', duration: 0.8 }, 0)
        .to(cardRef.current, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 0.1)
        .to(fields, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.5, stagger: 0.07 }, 0.35);
    },
    { scope: rootRef }
  );

  const change = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const buildWaLink = (v) => {
    const parts = [
      `Hi ${brand.name},`,
      '',
      `Name: ${sanitize(v.name)}`,
      `Phone: ${sanitize(v.phone)}`,
      `Email: ${sanitize(v.email)}`,
      `Program: ${sanitize(v.program)}`,
      v.message ? `Message: ${sanitize(v.message)}` : null,
    ].filter(Boolean).join('\n');
    const num = waNumber(brand.whatsapp);
    return `https://wa.me/${num}?text=${encodeURIComponent(parts)}`;
  };

  const buildMailto = (v) => {
    const subject = `Enquiry: ${sanitize(v.program) || 'Programs'}`;
    const body = [
      `Name: ${sanitize(v.name)}`,
      `Phone: ${sanitize(v.phone)}`,
      `Email: ${sanitize(v.email)}`,
      `Program: ${sanitize(v.program)}`,
      v.message ? `\nMessage: ${sanitize(v.message)}` : '',
    ].filter(Boolean).join('\n');
    return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus('error');
      setMessage('Please fix the highlighted fields.');
      const firstInvalid = Object.keys(nextErrors)[0];
      const el = formRef.current?.querySelector(`[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }

    setStatus('sending');
    setMessage('Sending your enquiry...');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    sanitize(values.name),
          phone:   sanitize(values.phone),
          email:   sanitize(values.email),
          program: sanitize(values.program),
          message: sanitize(values.message),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        // Surface server-side field errors if the API returned any.
        if (data.errors) setErrors((prev) => ({ ...prev, ...data.errors }));
        setStatus('error');
        setMessage(data.error || 'Could not send. Please try WhatsApp or email instead.');
        return;
      }

      setStatus('success');
      setMessage("Your enquiry is in. We'll reply soon.");
    } catch {
      setStatus('error');
      setMessage('Network hiccup — please try WhatsApp or email instead.');
    }
  };

  const openWhatsApp = () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('error');
      setMessage('Please fix the highlighted fields.');
      return;
    }
    window.open(buildWaLink(values), '_blank', 'noopener,noreferrer');
  };

  const openMail = () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('error');
      setMessage('Please fix the highlighted fields.');
      return;
    }
    window.location.href = buildMailto(values);
  };

  const resetForm = () => {
    setValues(emptyForm);
    setErrors({});
    setStatus('idle');
    setMessage('');
  };

  const success = status === 'success';

  return (
    <section
      ref={rootRef}
      className={styles.section}
      id="contact"
      aria-labelledby="cta-title"
    >
      <div className={styles.inner}>
        {/* ---------- Left panel: crimson branded ---------- */}
        <aside ref={leftRef} className={styles.leftPanel} aria-hidden="false">
          <div className={styles.decorCircle} aria-hidden="true" />
          <div className={styles.decorRing} aria-hidden="true" />

          <div className={styles.leftInner}>
            <Eyebrow withDot={false} className={styles.eyebrow}>Get in touch</Eyebrow>

            <h2 id="cta-title" className={styles.title}>
              {cta.title}
            </h2>

            <p className={styles.sub}>{cta.sub}</p>

            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}><FiPhone /></span>
                <div>
                  <span className={styles.contactLabel}>Call us</span>
                  <div className={styles.phoneStack}>
                    {(brand.phones && brand.phones.length ? brand.phones : [brand.phone]).map((p) => (
                      <a key={p} href={`tel:${waNumber(p) || p}`}>{p}</a>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <span className={styles.contactIcon}><FiMail /></span>
                <div>
                  <span className={styles.contactLabel}>Email us</span>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </div>
              </li>
              <li>
                <span className={styles.contactIcon}><FiMessageCircle /></span>
                <div>
                  <span className={styles.contactLabel}>WhatsApp</span>
                  <span>+{waNumber(brand.whatsapp)}</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        {/* ---------- Right: form card ---------- */}
        <div ref={cardRef} className={styles.formCard}>
          {!success && (
            <>
              <div className={styles.formHead}>
                <h3 className={styles.formTitle}>Book a free consultation</h3>
               
              </div>

              <form
                ref={formRef}
                className={styles.form}
                onSubmit={submit}
                noValidate
                aria-describedby="cta-status"
              >
                <div className={styles.field} data-field>
                  <label htmlFor="cta-name" className={styles.label}>Full name</label>
                  <div className={styles.inputWrap}>
                    <span className={styles.inputIcon}><FiUser /></span>
                    <input
                      id="cta-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={styles.input}
                      placeholder="Your full name"
                      value={values.name}
                      onChange={change}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'cta-err-name' : undefined}
                      required
                    />
                  </div>
                  {errors.name && (
                    <p id="cta-err-name" className={styles.error}>{errors.name}</p>
                  )}
                </div>

                <div className={styles.row}>
                  <div className={styles.field} data-field>
                    <label htmlFor="cta-phone" className={styles.label}>Phone</label>
                    <div className={styles.inputWrap}>
                      <span className={styles.inputIcon}><FiPhone /></span>
                      <input
                        id="cta-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={styles.input}
                        placeholder="+91 98xxxxxxxx"
                        value={values.phone}
                        onChange={change}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'cta-err-phone' : undefined}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p id="cta-err-phone" className={styles.error}>{errors.phone}</p>
                    )}
                  </div>

                  <div className={styles.field} data-field>
                    <label htmlFor="cta-email" className={styles.label}>Email</label>
                    <div className={styles.inputWrap}>
                      <span className={styles.inputIcon}><FiMail /></span>
                      <input
                        id="cta-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={styles.input}
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={change}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'cta-err-email' : undefined}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p id="cta-err-email" className={styles.error}>{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className={styles.field} data-field>
                  <label htmlFor="cta-program" className={styles.label}>Choose a program</label>
                  <div className={styles.inputWrap}>
                    <span className={styles.inputIcon}><FiBookOpen /></span>
                    <select
                      id="cta-program"
                      name="program"
                      className={`${styles.input} ${styles.select}`}
                      value={values.program}
                      onChange={change}
                      aria-invalid={!!errors.program}
                      aria-describedby={errors.program ? 'cta-err-program' : undefined}
                      required
                    >
                      <option value="">Which program are you interested in?</option>
                      {cta.programs.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  {errors.program && (
                    <p id="cta-err-program" className={styles.error}>{errors.program}</p>
                  )}
                </div>

                <div className={styles.field} data-field>
                  <label htmlFor="cta-message" className={styles.label}>
                    Message <span className={styles.optional}>(optional)</span>
                  </label>
                  <div className={`${styles.inputWrap} ${styles.inputWrapArea}`}>
                    <span className={`${styles.inputIcon} ${styles.inputIconArea}`}>
                      <FiMessageSquare />
                    </span>
                    <textarea
                      id="cta-message"
                      name="message"
                      rows={3}
                      className={styles.textarea}
                      placeholder="Anything specific you'd like to know?"
                      value={values.message}
                      onChange={change}
                      maxLength={500}
                    />
                  </div>
                </div>

                <div className={styles.actions} data-field>
                  <button
                    type="submit"
                    className={styles.primaryBtn}
                    disabled={status === 'sending'}
                  >
                    <FiSend aria-hidden="true" />
                    <span>{status === 'sending' ? 'Sending...' : 'Send Enquiry'}</span>
                  </button>
                  <button
                    type="button"
                    className={styles.mail}
                    onClick={openWhatsApp}
                    disabled={status === 'sending'}
                  >
                    Or WhatsApp us instead
                  </button>
                </div>

                <p
                  id="cta-status"
                  className={`${styles.status} ${status === 'error' ? styles.statusError : ''}`}
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </p>
              </form>
            </>
          )}

          {success && (
            <div className={styles.success} role="status" aria-live="polite">
              <div className={styles.successIcon}>
                <FiCheckCircle />
              </div>
              <h3 className={styles.successTitle}>Enquiry received.</h3>
              <p className={styles.successBody}>
                We&rsquo;ve sent a confirmation to <strong>{values.email}</strong>.
                Someone from admissions will be in touch shortly. In a hurry?{' '}
                <button
                  type="button"
                  className={styles.link}
                  onClick={() => window.open(buildWaLink(values), '_blank', 'noopener,noreferrer')}
                >
                  WhatsApp us
                </button>{' '}
                or{' '}
                <button type="button" className={styles.link} onClick={openMail}>
                  email directly
                </button>.
              </p>
              <button type="button" className={styles.reset} onClick={resetForm}>
                Send another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
