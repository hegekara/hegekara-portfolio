import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#about',       label: 'about'       },
  { href: '#experience',  label: 'experience'  },
  { href: '#projects',    label: 'projects'    },
  { href: '#skills',      label: 'skills'      },
  { href: '#github',      label: 'contributions'      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="site-nav"
      style={{ background: scrolled ? 'rgba(7,8,16,0.97)' : 'rgba(7,8,16,0.85)' }}
    >
      <div className="container d-flex align-items-center justify-content-between" style={{ height: 60, marginTop: 15 }}>
        {/* Brand */}
        <a href="#hero" className="nav-brand text-decoration-none">
          HEK<span>.</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links d-none d-md-flex list-unstyled mb-0 d-flex align-items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav-link ${active === href ? 'active' : ''}`}
                onClick={() => setActive(href)}
              >
                <span style={{ color: 'var(--accent-cyan)', marginRight: 3 }}>./</span>
                {label}
              </a>
            </li>
          ))}
          {/* CV İndir Butonu - Masaüstü */}
          <li className="ms-3">
            <a
              href="/cv.pdf"
              download="hilmi_ege_kara_cv.pdf"
              className="nav-link"
              style={{
                color: 'var(--accent-cyan)',
                border: '1px solid var(--accent-cyan)',
                padding: '4px 12px',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <div className="collapse d-md-none" id="mobileNav">
        <div
          className="container pb-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="d-block py-2"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textDecoration: 'none'
              }}
              data-bs-toggle="collapse"
              data-bs-target="#mobileNav"
            >
              <span style={{ color: 'var(--accent-cyan)' }}>./</span>{label}
            </a>
          ))}

          <a
            href="/cv.pdf"
            download="hilmi_ege_kara_cv.pdf"
            className="d-block py-2 mt-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
            data-bs-toggle="collapse"
            data-bs-target="#mobileNav"
          >
            <span style={{ color: 'var(--accent-cyan)' }}>./</span>Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
}