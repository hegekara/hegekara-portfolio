import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { lang } = useLanguage();

  const SKILLS = [
    { langName: 'Java', icon: '☕', items: ['OOP', 'Spring Web', 'Spring Cloud', 'Spring Security', 'Spring Boot', 'Netflix-Eureka', 'OpenFeign', 'JAXRS', 'JWT', 'Log4j'] },
    { langName: 'JavaScript', icon: '⚡', items: ['React.js', 'React Native', 'Node.js', 'ES2022+', 'Hooks', 'Context API', 'Supabase'] },
    { langName: 'C#', icon: '🔷', items: ['OOP', '.NET Core', 'Entity Framework', 'LINQ', 'ASP.NET'] },
    { langName: 'Go', icon: '🐹', items: ['Chi', 'Gorilla WebSocket', 'REST APIs', 'Concurrency'] },
    { langName: 'Swift', icon: '🍎', items: ['iOS Development', 'MapKit', 'Combine', 'Keychain', 'Localization'] },
    { langName: 'Data', icon: '🗄️', items: ['PostgreSQL', 'MySQL', 'MSSQL', 'MongoDB', 'Supabase'] },
    { langName: lang === 'en' ? 'DevOps & Tools' : 'DevOps & Araçlar', icon: '🛠️', items: ['Git', 'GitHub', 'Docker', 'AWS S3', 'App Store Connect', 'Google Play Console', 'Huawei AppGallery'] },
    { langName: 'Python', icon: '🐍', items: ['Django', 'Deep Learning', 'Data Processing', 'Kaggle Datasets'] },
  ];

  const content = {
    en: {
      sectionTitle: '04 — Skills',
      heading: 'Tech Stack',
      bottomNote: 'Also comfortable with REST API design, microservices architecture, and agile workflows.'
    },
    tr: {
      sectionTitle: '04 — Yetenekler',
      heading: 'Teknoloji Yığını',
      bottomNote: 'REST API tasarımı, mikroservis mimarileri ve çevik (agile) iş akışlarına da hakimim.'
    }
  };

  const t = content[lang];

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <p className="section-title">{t.sectionTitle}</p>
        <h2 className="section-heading">{t.heading}</h2>

        <div className="row g-4">
          {SKILLS.map(({ langName, icon, items }) => (
            <div key={langName} className="col-md-6 col-lg-4 col-xl-3">
              <div className="skill-group h-100">
                <p className="skill-lang">
                  <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                  {langName}
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
          {t.bottomNote}
        </p>
      </div>
    </section>
  );
}