import React, { useState } from 'react';

const PROJECTS = [
  {
    year: '2025',
    icon: '🏛️',
    title: 'Department Management System',
    desc: 'Web-based platform enabling academic staff to manage internal operations: course schedules, classroom assignments, exam timetables, and seating arrangements. Follows a microservices architecture for scalability and modularity. JWT validation at the gateway level secures all APIs.',
    tags: ['React.js', 'Java', 'Spring Boot', 'Spring Cloud', 'Netflix-Eureka', 'Gateway', 'OpenFeign', 'JAXRS', 'JWT', 'PostgreSQL', 'MySQL', 'MongoDB'],
    arch: 'Microservices',
  },
  {
    year: '2025',
    icon: '🗺️',
    title: 'Activity Planning System',
    desc: 'Enables users to create activities, view them on a map, and indicate participation. The Swift front-end supports Turkish and English localization, uses MapKit for maps, Keychain for secure storage, and Combine for async operations.',
    tags: ['Swift', 'Java', 'Spring Framework', 'JWT', 'PostgreSQL', 'MapKit', 'Combine'],
    arch: 'Microservices',
  },
  {
    year: '2025',
    icon: '🗄️',
    title: 'File Repository Backup System',
    desc: 'Secure file upload and sharing platform ensuring data integrity. Threading powers anomaly detection via log analysis, file change tracking through timestamps, and automated backups to prevent data loss.',
    tags: ['React', 'Java', 'Spring Framework', 'Log4j', 'JWT', 'PostgreSQL'],
    arch: 'Multithreaded',
  },
  {
    year: '2024',
    icon: '🌿',
    title: 'Treepedia',
    desc: 'Deep learning-based plant disease diagnosis and mapping platform. Built with Django, it uses official Turkish Ministry of Agriculture datasets and Kaggle image datasets. Maps trees across Turkey, classifies leaf diseases, provides treatment recommendations, and visualizes nationwide disease spread.',
    tags: ['Django', 'Python', 'Deep Learning', 'Kaggle', 'Maps'],
    arch: 'ML / Full-Stack',
  },
];

const FILTER_OPTIONS = ['All', '2025', '2024', 'Microservices', 'Full-Stack'];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filtered = PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.year === filter || p.arch.includes(filter) || p.tags.some(t => t === filter);
  });

  return (
    <section id="projects" style={{ padding: '90px 0', background: 'var(--bg-surface)' }}>
      <div className="container">
        <p className="section-title">03 &mdash; Projects</p>
        <h2 className="section-heading">Things I've Built</h2>

{/* 
        <div className="d-flex flex-wrap gap-2 mb-4">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                padding: '5px 14px',
                borderRadius: '100px',
                border: `1px solid ${filter === opt ? 'var(--accent-blue)' : 'var(--border)'}`,
                background: filter === opt ? 'rgba(59,130,246,0.12)' : 'transparent',
                color: filter === opt ? 'var(--accent-blue)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
 */}

        {/* Grid */}
        <div className="row g-4">
          {filtered.map((project, i) => (
            <div key={i} className="col-md-6">
              <div className="project-card">
                {/* Top row */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="project-year"># {project.year}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--accent-cyan)',
                      background: 'rgba(6,182,212,0.07)',
                      border: '1px solid rgba(6,182,212,0.18)',
                      padding: '2px 8px',
                      borderRadius: '100px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {project.arch}
                  </span>
                </div>

                <span className="project-icon">{project.icon}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
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
          Check my <a href="https://github.com/hegekara">GitHub account</a> for more project.
        </p>
      </div>
    </section>
  );
}
