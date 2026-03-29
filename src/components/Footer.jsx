import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Socials */}
        <div className="footer-socials">
          {[
            { icon: 'bi-github',    href: 'https://github.com/hegekara',        label: 'GitHub'   },
            { icon: 'bi-linkedin',  href: 'https://linkedin.com',               label: 'LinkedIn' },
            { icon: 'bi-envelope',  href: 'mailto:hegekara48@gmail.com',        label: 'Email'    },
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
          HILMI EGE <span style={{ color: 'var(--accent-blue)' }}>KARA</span>
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
          SOFTWARE DEVELOPMENT ENGINEER
        </p>

        {/* Copy */}
        <p className="footer-copy">
          © {year} Hilmi Ege Kara &nbsp;·&nbsp; Built with React.js &nbsp;·&nbsp; Deployed on AWS S3
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
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-blue)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
        >
          <i className="bi bi-arrow-up" /> BACK TO TOP
        </a>
      </div>
    </footer>
  );
}
