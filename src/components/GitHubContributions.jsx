import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const GITHUB_USERNAME = 'hegekara';

// Katkı seviyesine göre mavi tonlarını ve koyu griyi belirlediğimiz fonksiyon
const getThemeColor = (level) => {
  switch (level) {
    case 'FIRST_QUARTILE': return '#93c5fd';  // Açık Mavi
    case 'SECOND_QUARTILE': return '#60a5fa'; // Orta Mavi
    case 'THIRD_QUARTILE': return '#3b82f6';  // Mavi
    case 'FOURTH_QUARTILE': return '#1d4ed8'; // Koyu Mavi
    case 'NONE':
    default: return '#374151';                // Koyu Gri
  }
};

export default function GitHubContributions() {
  const { lang } = useLanguage();
  const [data, setData] = useState({ total: 0, weeks: [], monthlyStats: [] });
  const [loading, setLoading] = useState(true);
  const [isMonthsOpen, setIsMonthsOpen] = useState(false);

  useEffect(() => {
    async function fetchContribs() {
      try {
        const url = `https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`;
        const res = await fetch(url);
        const json = await res.json();
        
        let total = json.totalContributions || 0;
        const weeks = json.contributions || [];
        const monthlyData = {};

        // JSON'dan gelen günleri aylık olarak topla
        weeks.forEach((week) => {
          week.forEach((day) => {
            if (day.date) {
              const monthKey = day.date.substring(0, 7); // Örn: "2025-04"
              if (!monthlyData[monthKey]) monthlyData[monthKey] = 0;
              monthlyData[monthKey] += day.contributionCount;
            }
          });
        });
        
        // Aylık veriyi diziye çevir ve yeniden eskiye sırala
        const monthlyStats = Object.keys(monthlyData).map(key => {
          const [yyyy, mm] = key.split('-');
          const monthIndex = parseInt(mm, 10) - 1;
          return {
            key,
            monthIndex,
            year: yyyy,
            count: monthlyData[key]
          };
        }).sort((a, b) => b.key.localeCompare(a.key)); 

        setData({ total, weeks, monthlyStats });
        setLoading(false);
      } catch (err) {
        console.error("GitHub API Error:", err);
        setLoading(false);
      }
    }
    fetchContribs();
  }, []);

  const content = {
    en: {
      loading: 'GitHub Activity Syncing...',
      sectionTitle: '05 — Activity',
      inLastYear: 'in the last year',
      contributions: 'contributions on',
      noContributions: 'No contributions on',
      less: 'Less',
      more: 'More',
      showBtn: 'Show Monthly Breakdown',
      hideBtn: 'Hide Monthly Breakdown',
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    tr: {
      loading: 'GitHub Aktivitesi Eşitleniyor...',
      sectionTitle: '05 — Aktivite',
      inLastYear: 'son bir yılda',
      contributions: 'katkı:',
      noContributions: 'Katkı yok:',
      less: 'Daha az',
      more: 'Daha fazla',
      showBtn: 'Aylık Dağılımı Göster',
      hideBtn: 'Aylık Dağılımı Gizle',
      months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    }
  };

  const t = content[lang];

  if (loading) {
    return (
      <section className="contrib-section" id="github" style={{ padding: '80px 0', minHeight: '300px' }}>
        <div className="container text-center">
           <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
           <p className="mt-3" style={{ color: 'var(--text-muted)' }}>{t.loading}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="contrib-section" id="github" style={{ padding: '80px 0' }}>
      <div className="container">
        <p className="section-title text-center">{t.sectionTitle}</p>
        <h2 className="section-heading text-center mb-4">
          <i className="bi bi-github" style={{ marginRight: 12 }} />
          {data.total} {lang === 'en' ? 'Contributions' : 'Katkı'} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{t.inLastYear}</span>
        </h2>

        {/* Takvim Kartı */}
        <div className="row justify-content-center fade-in-up">
          <div className="col-12 col-xl-10">
            <div className="glass-card" style={{ padding: '24px' }}>
              
              <div 
                className="calendar-scroll-container text-center" 
                style={{ 
                  overflowX: 'auto', 
                  paddingBottom: '10px' 
                }}
              >
                <div 
                  className="github-calendar-grid"
                  style={{ 
                    display: 'inline-flex', 
                    gap: '4px', 
                    textAlign: 'left'
                  }}
                >
                  {data.weeks.map((week, wIndex) => (
                    <div 
                      key={wIndex} 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '4px' 
                      }}
                    >
                      {week.map((day, dIndex) => {
                        const count = day.contributionCount;
                        const date = day.date;
                        const cellColor = getThemeColor(day.contributionLevel);
                        
                        const tooltipText = count === 0 
                          ? `${t.noContributions} ${date}` 
                          : `${count} ${t.contributions} ${date}`;
                          
                        return (
                          <div 
                            key={dIndex}
                            title={tooltipText}
                            style={{
                              width: '12px',
                              height: '12px',
                              backgroundColor: cellColor,
                              borderRadius: '2px',
                              border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Legend */}
              <div 
                className="d-flex align-items-center justify-content-center gap-2 mt-4" 
                style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                <span>{t.less}</span>
                <div style={{ width: 12, height: 12, backgroundColor: getThemeColor('NONE'), borderRadius: 2 }} />
                <div style={{ width: 12, height: 12, backgroundColor: getThemeColor('FIRST_QUARTILE'), borderRadius: 2 }} />
                <div style={{ width: 12, height: 12, backgroundColor: getThemeColor('SECOND_QUARTILE'), borderRadius: 2 }} />
                <div style={{ width: 12, height: 12, backgroundColor: getThemeColor('THIRD_QUARTILE'), borderRadius: 2 }} />
                <div style={{ width: 12, height: 12, backgroundColor: getThemeColor('FOURTH_QUARTILE'), borderRadius: 2 }} />
                <span>{t.more}</span>
              </div>

            </div>
          </div>
        </div>

        {/* Aylık Dağılım Butonu */}
        <div className="mt-5 text-center">
          <button
            onClick={() => setIsMonthsOpen(!isMonthsOpen)}
            className="btn-outline-custom"
            style={{ minWidth: '200px' }}
          >
            <i className={`bi bi-chevron-${isMonthsOpen ? 'up' : 'down'} me-2`} />
            {isMonthsOpen ? t.hideBtn : t.showBtn}
          </button>
        </div>

        {/* Aylık Dağılım Listesi (Açılır/Kapanır) */}
        {isMonthsOpen && (
          <div className="row justify-content-center mt-4 fade-in-up">
            <div className="col-md-8 col-lg-6">
              <div className="glass-card" style={{ padding: '24px' }}>
                <ul className="list-unstyled mb-0">
                  {data.monthlyStats.map((mStat, i) => {
                    if (mStat.count === 0) return null; 
                    const pct = data.total > 0 ? ((mStat.count / data.total) * 100).toFixed(1) : 0;
                    const monthName = t.months[mStat.monthIndex];
                    
                    return (
                      <li 
                        key={mStat.key} 
                        className="d-flex align-items-center justify-content-between mb-3"
                        style={{ 
                          borderBottom: i !== data.monthlyStats.length - 1 ? '1px solid var(--border)' : 'none',
                          paddingBottom: i !== data.monthlyStats.length - 1 ? '12px' : '0' 
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <span style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontWeight: 'bold', width: '55px' }}>
                            %{pct}
                          </span>
                          <span style={{ color: 'var(--text-primary)' }}>{`${monthName} ${mStat.year}`}</span>
                        </div>
                        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                          {mStat.count} {lang === 'en' ? 'contributions' : 'katkı'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}