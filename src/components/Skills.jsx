import React from 'react';

const SKILLS = [
  {
    lang: 'Java',
    icon: '☕',
    items: ['OOP', 'Spring Web', 'Spring Cloud', 'Spring Security', 'Spring Boot', 'Netflix-Eureka', 'OpenFeign', 'JAXRS', 'JWT', 'Log4j'],
  },
  {
    lang: 'JavaScript',
    icon: '⚡',
    items: ['React.js', 'React Native', 'Node.js', 'ES2022+', 'Hooks', 'Context API', 'Supabase'],
  },
  {
    lang: 'C#',
    icon: '🔷',
    items: ['OOP', '.NET Core', 'Entity Framework', 'LINQ', 'ASP.NET'],
  },
  {
    lang: 'Go',
    icon: '🐹',
    items: ['Chi', 'Gorilla WebSocket', 'REST APIs', 'Concurrency'],
  },
  {
    lang: 'Swift',
    icon: '🍎',
    items: ['iOS Development', 'MapKit', 'Combine', 'Keychain', 'Localization'],
  },
  {
    lang: 'Data',
    icon: '🗄️',
    items: ['PostgreSQL', 'MySQL', 'MSSQL', 'MongoDB', 'Supabase'],
  },
  {
    lang: 'DevOps & Tools',
    icon: '🛠️',
    items: ['Git', 'GitHub', 'Docker', 'AWS S3', 'App Store Connect', 'Google Play Console', 'Huawei AppGallery'],
  },
  {
    lang: 'Python',
    icon: '🐍',
    items: ['Django', 'Deep Learning', 'Data Processing', 'Kaggle Datasets'],
  },
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <p className="section-title">04 &mdash; Skills</p>
        <h2 className="section-heading">Tech Stack</h2>

        <div className="row g-4">
          {SKILLS.map(({ lang, icon, items }) => (
            <div key={lang} className="col-md-6 col-lg-4 col-xl-3">
              <div className="skill-group h-100">
                <p className="skill-lang">
                  <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                  {lang}
                </p>
                <div className="skill-tags">
                  {items.map((item) => (
                    <span key={item} className="tech-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            marginTop: 40,
            letterSpacing: '0.06em',
          }}
        >
          <span style={{ color: 'var(--accent-cyan)', marginRight: 8 }}>✦</span>
          Also comfortable with REST API design, microservices architecture, and agile workflows.
        </p>
      </div>
    </section>
  );
}
