import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { lang } = useLanguage();

  const content = {
    en: {
      sectionTitle: '02 — Experience',
      heading: 'Work History',
      experiences: [
        {
          role: 'SOFTWARE DEVELOPMENT ENGINEER',
          company: 'Vericom Teknoloji A.Ş.',
          period: '09/2025 – Present',
          active: true,
          bullets: [
            'Developing and maintaining web & mobile applications using React and React Native.',
            'Improving application performance through optimization, debugging, and feature enhancements.',
            'Designing and managing database tables, relational structures, and automated backend tasks (cron jobs) using Supabase.',
            'Managing build and deployment processes for web applications in production environments.',
            'Overseeing mobile release cycles on App Store, Google Play Store, and Huawei App Gallery.',
          ],
        },
        {
          role: 'BACK-END DEVELOPER INTERN',
          company: 'RasyoLife Hayvan Besleme ve Sağlığı A.Ş.',
          period: '08/2025 – 09/2025',
          active: false,
          bullets: [
            'Contributed to back-end systems for an animal health and nutrition platform.',
          ],
        },
        {
          role: 'FULL-STACK DEVELOPER INTERN',
          company: 'Vericom Teknoloji A.Ş.',
          period: '07/2025 – 08/2025',
          active: false,
          bullets: [
            'Built full-stack features for web and mobile products during summer internship.',
          ],
        },
      ]
    },
    tr: {
      sectionTitle: '02 — Deneyim',
      heading: 'İş Geçmişi',
      experiences: [
        {
          role: 'YAZILIM GELİŞTİRME MÜHENDİSİ',
          company: 'Vericom Teknoloji A.Ş.',
          period: '09/2025 – Devam Etmekte',
          active: true,
          bullets: [
            'React ve React Native kullanarak web ve mobil uygulamalar geliştiriyor ve bakımını yapıyorum.',
            'Optimizasyon, hata ayıklama (debugging) ve yeni özellikler ekleyerek uygulama performansını artırıyorum.',
            'Supabase kullanarak veritabanı tablolarını, ilişkisel yapıları ve otomatik arka plan görevlerini (cron jobs) tasarlıyor ve yönetiyorum.',
            'Canlı (production) ortamlardaki web uygulamaları için derleme (build) ve dağıtım (deployment) süreçlerini yönetiyorum.',
            'App Store, Google Play Store ve Huawei App Gallery üzerinde mobil sürüm döngülerini denetliyorum.',
          ],
        },
        {
          role: 'BACK-END GELİŞTİRİCİ STAJYERİ',
          company: 'RasyoLife Hayvan Besleme ve Sağlığı A.Ş.',
          period: '08/2025 – 09/2025',
          active: false,
          bullets: [
            'Bir hayvan sağlığı ve beslenme platformunun arkayüz (back-end) sistemlerine katkıda bulundum.',
          ],
        },
        {
          role: 'FULL-STACK GELİŞTİRİCİ STAJYERİ',
          company: 'Vericom Teknoloji A.Ş.',
          period: '07/2025 – 08/2025',
          active: false,
          bullets: [
            'Yaz stajı boyunca web ve mobil ürünler için full-stack özellikler geliştirdim.',
          ],
        },
      ]
    }
  };

  const t = content[lang];

  return (
    <section id="experience" style={{ padding: '90px 0' }}>
      <div className="container">
        <p className="section-title">{t.sectionTitle}</p>
        <h2 className="section-heading">{t.heading}</h2>

        <div className="exp-timeline">
          {t.experiences.map((exp, i) => (
            <div key={i} className="exp-item">
              <div className={`exp-dot ${exp.active ? 'active' : ''}`} />
              <div className="exp-card">
                {/* Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                  <div>
                    <p className="exp-role">{exp.role}</p>
                    <p className="exp-company">{exp.company}</p>
                  </div>
                  <span
                    className={`tech-badge ${exp.active ? 'active-badge' : ''}`}
                    style={
                      exp.active
                        ? {
                            color: '#28c840',
                            borderColor: '#28c840',
                            background: 'rgba(40,200,64,0.08)',
                          }
                        : {}
                    }
                  >
                    {exp.active && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#28c840',
                          marginRight: 5,
                          animation: 'dotBounce 1.5s ease-in-out infinite',
                        }}
                      />
                    )}
                    {exp.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="exp-desc ps-3">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}