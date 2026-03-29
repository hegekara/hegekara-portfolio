import React, { useEffect, useState } from 'react';

export default function About() {
  const [githubCount, setGithubCount] = useState('...');

  useEffect(() => {
    async function fetchGitHubCount() {
      try {
        const GITHUB_USERNAME = 'hegekara';
        const url = `/github-api/${GITHUB_USERNAME}?action=show&controller=profiles&tab=contributions&user_id=${GITHUB_USERNAME}`;
        const res = await fetch(url);
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const totalEl = doc.querySelector('#js-contribution-activity-description');
        if (totalEl) {
          const m = totalEl.textContent.match(/(\d+(?:,\d+)*)/);
          if (m) setGithubCount(m[1]);
        }
      } catch (e) {
        console.error('GitHub verisi çekilemedi:', e);
        setGithubCount('660+'); // Olası bir hatada gösterilecek fallback
      }
    }
    fetchGitHubCount();
  }, []);

  const STATS = [
    { number: '3.65',       label: 'GPA / 4.00' },
    { number: '3+',         label: 'Years of Coding' },
    { number: '8+',         label: 'Projects' },
    { number: githubCount,  label: 'GitHub Contributions' }, // Dinamik oldu
  ];
  
  return (
    <section className="about-section" id="about">
      <div className="container">
        {/* Section title */}
        <p className="section-title">01 &mdash; About</p>
        <h2 className="section-heading">Who I Am</h2>

        <div className="row g-5 align-items-start">
          {/* Text */}
          <div className="col-lg-7">
            <p className="about-text mb-3">
              I'm a Software Engineering student at <strong style={{ color: 'var(--text-primary)' }}>Kocaeli University</strong> with
              a GPA of 3.65/4, currently working as a Software Development Engineer at
              <strong style={{ color: 'var(--accent-blue)' }}> Vericom Teknoloji A.Ş.</strong> My focus is
              on building performant, maintainable web and mobile applications using modern technologies.
            </p>
            <p className="about-text mb-3">
              I specialize in <strong style={{ color: 'var(--text-primary)' }}>React</strong> and <strong style={{ color: 'var(--text-primary)' }}>React Native</strong> on
              the frontend, and <strong style={{ color: 'var(--text-primary)' }}>Java Spring Boot</strong> microservices on the backend. I enjoy
              designing clean APIs, working with relational &amp; NoSQL databases, and handling end-to-end
              deployment pipelines.
            </p>
            <p className="about-text">
              As a member of the <strong style={{ color: 'var(--accent-cyan)' }}>Star-Lab (Software Technologies Research Laboratory)</strong> at
              KOU, I stay engaged with cutting-edge research and collaborative academic projects.
            </p>

            {/* Education */}
            <div className="edu-card mt-4">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                  <p className="edu-degree">Bachelor of Software Engineering</p>
                  <p className="edu-school">Kocaeli University</p>
                  <p className="edu-gpa">
                    GPA: <strong>3.65 / 4.00</strong> &nbsp;·&nbsp; 2022 – Present
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--accent-cyan)',
                    background: 'rgba(6,182,212,0.08)',
                    border: '1px solid rgba(6,182,212,0.2)',
                    padding: '3px 10px',
                    borderRadius: '100px',
                  }}
                >
                  Star-Lab Member
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="col-lg-5">
            <div className="glass-card">
              <div className="row g-0">
                {STATS.map(({ number, label }, i) => (
                  <div key={label} className="col-6">
                    <div
                      className="stat-item"
                      style={{
                        borderRight:  i % 2 === 0 ? '1px solid var(--border)' : 'none',
                        borderBottom: i < 2       ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <span className="stat-number">{number}</span>
                      <span className="stat-label">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact mini */}
            <div className="glass-card mt-3">
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                Contact
              </p>
              {[
                { icon: 'bi-envelope',  label: 'hegekara48@gmail.com', href: 'mailto:hegekara48@gmail.com' },
                { icon: 'bi-github',    label: 'github.com/hegekara',  href: 'https://github.com/hegekara' },
                { icon: 'bi-geo-alt',   label: 'Kocaeli, Türkiye',     href: null                          },
              ].map(({ icon, label, href }) => (
                <div key={label} className="d-flex align-items-center gap-2 mb-2">
                  <i
                    className={`bi ${icon}`}
                    style={{ color: 'var(--accent-blue)', width: 16 }}
                  />
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {label}
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
