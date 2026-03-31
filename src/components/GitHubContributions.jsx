import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const GITHUB_USERNAME = 'hegekara';
const targetUrl = `https://github.com/${GITHUB_USERNAME}?action=show&controller=profiles&tab=contributions&user_id=${GITHUB_USERNAME}`;

function parseGitHubHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  let total = 0;
  const totalEl = doc.querySelector('#js-contribution-activity-description');
  if (totalEl) {
    const m = totalEl.textContent.match(/(\d+(?:,\d+)*)/);
    if (m) total = parseInt(m[1].replace(/,/g, ''), 10);
  }

  let breakdown = { commits: 0, prs: 0, issues: 0, review: 0 };
  const percentagesEl = doc.querySelector('.js-activity-overview-graph-container');
  if (percentagesEl && percentagesEl.dataset.percentages) {
    try {
      const data = JSON.parse(percentagesEl.dataset.percentages);
      breakdown.commits = data['Commits'] || 0;
      breakdown.prs = data['Pull requests'] || 0;
      breakdown.issues = data['Issues'] || 0;
      breakdown.review = data['Code review'] || 0;
    } catch(e) {}
  }

  const monthlyData = {};
  const cells = doc.querySelectorAll('td.ContributionCalendar-day');
  
  cells.forEach((cell) => {
    const date = cell.getAttribute('data-date');
    const id = cell.getAttribute('id');
    let count = 0;
    
    if (id) {
      const tooltipEl = doc.querySelector(`tool-tip[for="${id}"]`);
      if (tooltipEl) {
        const text = tooltipEl.textContent.trim();
        const match = text.match(/^(\d+)\s+contribution/); 
        if (match) count = parseInt(match[1], 10);
      }
    }

    if (date) {
      const monthKey = date.substring(0, 7);
      if (!monthlyData[monthKey]) monthlyData[monthKey] = 0;
      monthlyData[monthKey] += count;
    }
  });

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
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

  return { total, breakdown, monthlyStats };
}

export default function GitHubContributions() {
  const { lang } = useLanguage();
  const [data, setData] = useState({ total: 0, breakdown: { commits: 0, prs: 0, issues: 0, review: 0 }, monthlyStats: [] });
  const [loading, setLoading] = useState(true);
  const [isMonthsOpen, setIsMonthsOpen] = useState(false);

  useEffect(() => {
    async function fetchContribs() {
      try {
        const PROXY_URL = import.meta.env.DEV 
          ? `/github-api/${GITHUB_USERNAME}?action=show&controller=profiles&tab=contributions&user_id=${GITHUB_USERNAME}`
          : `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

        const res = await fetch(PROXY_URL, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        
        const html = await res.text();
        const parsed = parseGitHubHTML(html);
        setData(parsed);
        setLoading(false);
      } catch (err) {
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
      labels: {
        commits: 'Commits',
        prs: 'Pull Requests',
        issues: 'Issues',
        review: 'Code Review'
      },
      showBtn: 'Show Monthly Breakdown',
      hideBtn: 'Hide Monthly Breakdown',
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    tr: {
      loading: 'GitHub Aktivitesi Eşitleniyor...',
      sectionTitle: '05 — Aktivite',
      inLastYear: 'son bir yılda',
      labels: {
        commits: 'Commitler',
        prs: 'Pull Requestler',
        issues: 'Sorunlar (Issues)',
        review: 'Kod İncelemesi'
      },
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

  const statsCards = [
    { label: t.labels.commits, pct: data.breakdown.commits, icon: 'bi-git' },
    { label: t.labels.prs,     pct: data.breakdown.prs,     icon: 'bi-arrow-left-right' },
    { label: t.labels.issues,  pct: data.breakdown.issues,  icon: 'bi-exclamation-circle' },
    { label: t.labels.review,  pct: data.breakdown.review,  icon: 'bi-code-square' },
  ];

  return (
    <section className="contrib-section" id="github" style={{ padding: '80px 0' }}>
      <div className="container">
        <p className="section-title">{t.sectionTitle}</p>
        <h2 className="section-heading">
          <i className="bi bi-github" style={{ marginRight: 12 }} />
          {data.total} {lang === 'en' ? 'Contributions' : 'Katkı'} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{t.inLastYear}</span>
        </h2>

        <div className="row g-3">
          {statsCards.map(({ label, pct, icon }) => (
            <div key={label} className="col-6 col-md-3">
              <div className="glass-card text-center" style={{ padding: '18px 12px' }}>
                <i className={`bi ${icon}`} style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', marginBottom: 8, display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: pct > 0 ? 'var(--accent-blue)' : 'var(--text-dim)' }}>
                  {pct}%
                </span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsMonthsOpen(!isMonthsOpen)}
            className="btn-outline-custom"
            style={{ minWidth: '200px' }}
          >
            <i className={`bi bi-chevron-${isMonthsOpen ? 'up' : 'down'} me-2`} />
            {isMonthsOpen ? t.hideBtn : t.showBtn}
          </button>
        </div>

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
                          {mStat.count} commit
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