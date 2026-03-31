import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const NAV_LINKS = {
  en: [
    { href: '#about',       label: 'about' },
    { href: '#experience',  label: 'experience' },
    { href: '#projects',    label: 'projects' },
    { href: '#skills',      label: 'skills' },
    { href: '#github',      label: 'contributions' },
  ],
  tr: [
    { href: '#about',       label: 'hakkımda' },
    { href: '#experience',  label: 'deneyim' },
    { href: '#projects',    label: 'projeler' },
    { href: '#skills',      label: 'yetenekler' },
    { href: '#github',      label: 'katkılar' },
  ]
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  
  const [isMobileOpen, setIsMobileOpen] = useState(false); 
  
  const { lang, toggleLang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = NAV_LINKS[lang];

  const handleLinkClick = (href) => {
    setActive(href);
    setIsMobileOpen(false);
  };

  return (
    <nav
      className="site-nav"
      style={{ background: scrolled ? 'rgba(7,8,16,0.97)' : 'rgba(7,8,16,0.85)' }}
    >
      <div className="container d-flex align-items-center justify-content-between" style={{ height: 60, marginTop: 15 }}>
        
        <div className="d-flex align-items-center" style={{ flex: 1, justifyContent: 'flex-start' }}>
          <a href="#hero" className="nav-brand text-decoration-none">
            HEK<span>.</span>
          </a>
        </div>

        {/* Masaüstü Menü Linkleri */}
        <ul className="nav-links d-none d-md-flex list-unstyled mb-0 align-items-center justify-content-center gap-1" style={{ flex: 1 }}>
          {links.map(({ href, label }) => (
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
        </ul>

        {/* Masaüstü CV ve Dil Butonları */}
        <div className="d-none d-md-flex align-items-center justify-content-end gap-3" style={{ flex: 1 }}>
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
            {lang === 'en' ? 'Download Resume' : 'CV İndir'}
          </a>
          
          <button
            onClick={toggleLang}
            className="nav-link"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              padding: 0
            }}
          >
            {lang === 'en' ? 'TR' : 'EN'}
          </button>
        </div>

        <button
          className="d-md-none"
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-cyan)',
            fontSize: '1.8rem',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <i className={`bi ${isMobileOpen ? 'bi-x' : 'bi-list'}`}></i>
        </button>

      </div>

      <div className={`collapse d-md-none ${isMobileOpen ? 'show' : ''}`} id="mobileNav">
        <div
          className="container pb-3 mt-2"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="d-block py-2 mt-1"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textDecoration: 'none'
              }}
              onClick={() => handleLinkClick(href)}
            >
              <span style={{ color: 'var(--accent-cyan)' }}>./</span>{label}
            </a>
          ))}

          <a
            href="/cv.pdf"
            download="hilmi_ege_kara_cv.pdf"
            className="d-block py-2 mt-3"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
            onClick={() => setIsMobileOpen(false)}
          >
            <span style={{ color: 'var(--accent-cyan)' }}>./</span>
            {lang === 'en' ? 'Download Resume' : 'CV İndir'}
          </a>

          <button
            onClick={() => {
              toggleLang();
              setIsMobileOpen(false);
            }}
            className="d-block py-2 mt-2 w-100 text-start"
            style={{
              background: 'transparent',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.06em',
              fontWeight: 'bold',
              paddingLeft: 0
            }}
          >
            <span style={{ color: 'var(--accent-cyan)' }}>./</span>
            {lang === 'en' ? 'TR' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
}