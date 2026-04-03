import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  const content = {
    en: {
      tagline: 'SOFTWARE DEVELOPMENT ENGINEER',
      copy: `© ${year} Hilmi Ege Kara  ·  Built with React.js`,
      backToTop: 'BACK TO TOP'
    },
    tr: {
      tagline: 'YAZILIM GELİŞTİRME MÜHENDİSİ',
      copy: `© ${year} Hilmi Ege Kara  ·  React.js ile geliştirildi`,
      backToTop: 'YUKARI DÖN'
    }
  };

  const t = content[lang];

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Socials */}
        <div className="footer-socials">
          {[
            { icon: 'bi-github', href: 'https://github.com/hegekara', label: 'GitHub'   },
            { icon: 'bi-linkedin', href: 'https://www.linkedin.com/in/hilmi-ege-kara/',label: 'LinkedIn' },
            { icon: 'bi-envelope', href: 'mailto:hegekara48@gmail.com', label: 'Email'    },
          ].map(({ icon, href, label }) => (
            <a
              key={icon}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label={label}
            >
              <i className={`bi ${icon}`} />
            </a>
          ))}
        </div>

        {/* Name */}
        <p className="footer-name">
          HILMİ EGE <span style={{ color: 'var(--accent-blue)' }}>KARA</span>
        </p>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.15em',
            marginBottom: 10,
          }}
        >
          {t.tagline}
        </p>

        {/* Copy */}
        <p className="footer-copy">
          {t.copy}
        </p>

        {/* Back to top */}
        <a
          href="#hero"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 18,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
            transition: 'color 0.2s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-blue)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
        >
          <i className="bi bi-arrow-up" /> {t.backToTop}
        </a>
      </div>
    </footer>
  );
}