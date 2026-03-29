import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* Background effects */}
      <div className="hero-bg-grid" />
      <div className="hero-glow" />
      <div className="hero-glow-right" />

      <div className="container position-relative">
        <div className="row align-items-center">
          <div className="col-lg-8">
            {/* Eyebrow */}
            <p className="hero-eyebrow fade-in-up">
              Software Development Engineer
            </p>

            {/* Name */}
            <h1 className="hero-name fade-in-up delay-1">
              Hilmi Ege<br />Kara
            </h1>

            {/* Title line */}
            <p className="hero-title fade-in-up delay-2">
              <strong>@hegekara</strong> &nbsp;·&nbsp; Kocaeli, Türkiye
            </p>

            {/* Description */}
            <p className="hero-desc fade-in-up delay-3">
              Software Engineering student at Kocaeli University building scalable web &amp;
              mobile applications. Passionate about microservices, React, and clean backend
              architecture.
            </p>

            {/* CTA buttons */}
            <div className="hero-actions fade-in-up delay-4">
              <a href="#projects" className="btn-primary-custom">
                <i className="bi bi-code-slash" /> View Projects
              </a>
              <a
                href="mailto:hegekara48@gmail.com"
                className="btn-outline-custom"
              >
                <i className="bi bi-envelope" /> Get In Touch
              </a>
            </div>
          </div>

          {/* Right: terminal card */}
          <div className="col-lg-4 d-none d-lg-flex justify-content-end fade-in-up delay-3">
            <div
              className="glass-card"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', width: 320, minWidth: 280 }}
            >
              {/* Terminal header */}
              <div
                className="d-flex align-items-center gap-2 mb-3"
                style={{ borderBottom: '1px solid var(--border)', paddingBottom: 12 }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: 6, color: 'var(--text-muted)', fontSize: '0.7rem' }}>portfolio.sh</span>
              </div>

              {/* Terminal lines */}
              <TermLine prompt="$" text="whoami" delay={0} />
              <TermOutput text="hilmi_ege_kara" color="var(--accent-cyan)" delay={0.5} />
              <TermLine prompt="$" text="cat role.txt" delay={1} />
              <TermOutput text="Software Dev Engineer" color="var(--text-primary)" delay={1.5} />
              <TermOutput text="@ Vericom Teknoloji" color="var(--accent-blue)" delay={1.8} />
              <TermLine prompt="$" text="echo $GPA" delay={2.3} />
              <TermOutput text="3.65 / 4.00" color="#28c840" delay={2.8} />
              <TermLine prompt="$" text="ls skills/" delay={3.3} />
              <TermOutput text="Java  React  Go  C#  PostgreSQL" color="var(--text-muted)" delay={3.8} />
              <TermLine prompt="$" text="_" delay={4.3} blink />
            </div>
          </div>
        </div>

        {/* Social icons bottom left */}
        <div className="hero-socials">
          {[
            { icon: 'bi-github',   href: 'https://github.com/hegekara'   },
            { icon: 'bi-linkedin', href: 'https://linkedin.com'           },
            { icon: 'bi-envelope', href: 'mailto:hegekara48@gmail.com'    },
          ].map(({ icon, href }) => (
            <a key={icon} href={href} target="_blank" rel="noreferrer" className="social-link">
              <i className={`bi ${icon}`} />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator d-none d-md-flex">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.15em', writingMode: 'vertical-rl' }}>
            SCROLL
          </span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}

/* ── tiny terminal helpers ── */
function TermLine({ prompt, text, delay, blink }) {
  return (
    <div
      className="fade-in-up"
      style={{ marginBottom: 4, animationDelay: `${delay}s`, opacity: 0 }}
    >
      <span style={{ color: 'var(--accent-blue)', marginRight: 8 }}>{prompt}</span>
      <span style={{ color: 'var(--text-primary)' }}>{text}</span>
      {blink && (
        <span
          style={{
            display: 'inline-block',
            width: 7,
            height: '1em',
            background: 'var(--accent-cyan)',
            marginLeft: 2,
            verticalAlign: 'middle',
            animation: 'dotBounce 1s step-end infinite',
          }}
        />
      )}
    </div>
  );
}

function TermOutput({ text, color, delay }) {
  return (
    <div
      className="fade-in-up"
      style={{
        marginBottom: 6,
        paddingLeft: 18,
        color,
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    >
      {text}
    </div>
  );
}
