'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { nav as navContent, brand } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navRef = useRef(null);
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(null);

  // Route-first active check: page routes match by pathname, while any
  // remaining hash-anchor links (e.g. `/#foo`, `#foo`) fall back to the
  // scroll-based `activeHref` set by ScrollTrigger below.
  const isActive = (href) => {
    if (!href) return false;
    if (href.startsWith('#') || href.includes('#')) return activeHref === href;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Toggle solid style after the hero (~80vh) has scrolled past. A plain window
  // scroll listener is more reliable than ScrollTrigger without an explicit
  // trigger element — and it fires under Lenis smooth-scroll too, since Lenis
  // dispatches native scroll events on window.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const threshold = () => window.innerHeight * 0.8;
    const update = () => setSolid(window.scrollY > threshold());
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useGSAP(
    () => {
      // Active-section underline: one ScrollTrigger per section id that actually exists.
      // Handles hrefs of both "#anchor" (same-page) and "/#anchor" (from another
      // route back to the homepage) — we just look at whatever follows the "#".
      const linkTriggers = navContent.links
        .map(({ href }) => {
          const hashIdx = href.indexOf('#');
          const id = hashIdx >= 0 ? href.slice(hashIdx + 1) : null;
          if (!id) return null;
          const el = document.getElementById(id);
          if (!el) return null;
          return ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
              if (self.isActive) setActiveHref(href);
            },
          });
        })
        .filter(Boolean);

      // Swap navbar theme to match the section currently sitting behind it.
      // Sections opt in with `data-nav-theme="light"`; anything else defaults to dark.
      const navH = navRef.current?.offsetHeight ?? 76;
      const themeTriggers = Array.from(
        document.querySelectorAll('[data-nav-theme]')
      ).map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: `top top+=${navH}`,
          end: `bottom top+=${navH}`,
          onToggle: (self) => {
            setOnLight(self.isActive && el.dataset.navTheme === 'light');
          },
        })
      );

      return () => {
        linkTriggers.forEach((t) => t.kill());
        themeTriggers.forEach((t) => t.kill());
      };
    },
    { scope: navRef }
  );

  // Lock body scroll while the mobile overlay is open. Lenis follows html overflow.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on Esc
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const handleNavClick = (href) => () => setMenuOpen(false);

  return (
    <>
      <header
        ref={navRef}
        className={`${styles.nav} ${solid ? styles.solid : ''} ${onLight ? styles.onLight : ''}`}
        aria-label="Primary"
      >
        <a href="/" className={styles.logo} aria-label={`${brand.name} home`}>
          <Image
            src="/images/buddha-logo.jpeg"
            alt=""
            aria-hidden="true"
            width={84}
            height={84}
            className={styles.mark}
            priority
          />
        </a>

        <nav aria-label="Primary navigation">
          <ul className={styles.links}>
            {navContent.links.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`${styles.link} ${active ? styles.linkActive : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a href={navContent.cta.href} className={styles.cta}>
          {navContent.cta.label}
          <span className={styles.arrow} aria-hidden="true">→</span>
        </a>

        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={styles.burgerLines} aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
      </header>

      <div
        id="mobile-menu"
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
      >
        <ul className={styles.overlayList}>
          {navContent.links.map(({ label, href }, i) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.overlayLink} ${active ? styles.overlayLinkActive : ''}`}
                  aria-current={active ? 'page' : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={handleNavClick(href)}
                >
                  <span>{label}</span>
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href={navContent.cta.href}
          className={styles.overlayCta}
          tabIndex={menuOpen ? 0 : -1}
          onClick={handleNavClick(navContent.cta.href)}
        >
          {navContent.cta.label}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </>
  );
}
