import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState('All');

  const content = {
    en: {
      sectionTitle: '03 — Projects',
      heading: "Things I've Built",
      moreText: "Check my",
      githubLink: "GitHub account",
      moreTextEnd: "for more projects.",
      projects: [
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
      ]
    },
    tr: {
      sectionTitle: '03 — Projeler',
      heading: 'Geliştirdiklerim',
      moreText: "Daha fazla proje için",
      githubLink: "GitHub hesabıma",
      moreTextEnd: "göz atın.",
      projects: [
        {
          year: '2025',
          icon: '🏛️',
          title: 'Bölüm Yönetim Sistemi',
          desc: 'Akademik personelin ders programları, sınıf atamaları, sınav takvimleri ve oturma düzenleri gibi iç operasyonları yönetmesini sağlayan web tabanlı platform. Ölçeklenebilirlik için mikroservis mimarisini kullanır. Gateway seviyesindeki JWT doğrulaması tüm API\'leri güvence altına alır.',
          tags: ['React.js', 'Java', 'Spring Boot', 'Spring Cloud', 'Netflix-Eureka', 'Gateway', 'OpenFeign', 'JAXRS', 'JWT', 'PostgreSQL', 'MySQL', 'MongoDB'],
          arch: 'Mikroservisler',
        },
        {
          year: '2025',
          icon: '🗺️',
          title: 'Aktivite Planlama Sistemi',
          desc: 'Kullanıcıların aktiviteler oluşturmasına, bunları haritada görmesine ve katılımlarını belirtmesine olanak tanır. Swift tabanlı önyüz, Türkçe ve İngilizce yerelleştirmeyi destekler, haritalar için MapKit, güvenli depolama için Keychain ve asenkron işlemler için Combine kullanır.',
          tags: ['Swift', 'Java', 'Spring Framework', 'JWT', 'PostgreSQL', 'MapKit', 'Combine'],
          arch: 'Mikroservisler',
        },
        {
          year: '2025',
          icon: '🗄️',
          title: 'Dosya Deposu Yedekleme Sistemi',
          desc: 'Veri bütünlüğünü sağlayan güvenli dosya yükleme ve paylaşım platformu. Multithreading (çoklu iş parçacığı) yapısı; log analizi ile anomali tespiti, zaman damgaları üzerinden dosya değişikliği takibi ve veri kaybını önlemek için otomatik yedeklemeleri destekler.',
          tags: ['React', 'Java', 'Spring Framework', 'Log4j', 'JWT', 'PostgreSQL'],
          arch: 'Multithreaded',
        },
        {
          year: '2024',
          icon: '🌿',
          title: 'Treepedia',
          desc: 'Derin öğrenme tabanlı bitki hastalığı teşhis ve haritalama platformu. Django ile geliştirilmiş olup, T.C. Tarım Bakanlığı verisetlerini ve Kaggle görüntü verisetlerini kullanır. Türkiye çapında ağaçları haritalar, yaprak hastalıklarını sınıflandırır, tedavi önerileri sunar.',
          tags: ['Django', 'Python', 'Derin Öğrenme', 'Kaggle', 'Haritalar'],
          arch: 'ML / Full-Stack',
        },
      ]
    }
  };

  const t = content[lang];

  const filtered = t.projects.filter((p) => {
    if (filter === 'All') return true;
    return p.year === filter || p.arch.includes(filter) || p.tags.some(tag => tag === filter);
  });

  return (
    <section id="projects" style={{ padding: '90px 0', background: 'var(--bg-surface)' }}>
      <div className="container">
        <p className="section-title">{t.sectionTitle}</p>
        <h2 className="section-heading">{t.heading}</h2>

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
          {t.moreText} <a href="https://github.com/hegekara">{t.githubLink}</a> {t.moreTextEnd}
        </p>
      </div>
    </section>
  );
}