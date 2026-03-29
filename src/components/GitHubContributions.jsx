import React, { useState, useEffect } from 'react';

/* ─── Constants ──────────────────────────────────────────────────────────── */
const GITHUB_USERNAME = 'hegekara';
const PROXY_URL = `/github-api/${GITHUB_USERNAME}?action=show&controller=profiles&tab=contributions&user_id=${GITHUB_USERNAME}`;

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function parseGitHubHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // 1. Toplam Contribution Sayısı
  let total = 0;
  const totalEl = doc.querySelector('#js-contribution-activity-description');
  if (totalEl) {
    const m = totalEl.textContent.match(/(\d+(?:,\d+)*)/);
    if (m) total = parseInt(m[1].replace(/,/g, ''), 10);
  }

  // 2. Yüzdelik İstatistikler (Commits, Pull requests vs.)
  let breakdown = { commits: 0, prs: 0, issues: 0, review: 0 };
  const percentagesEl = doc.querySelector('.js-activity-overview-graph-container');
  if (percentagesEl && percentagesEl.dataset.percentages) {
    try {
      const data = JSON.parse(percentagesEl.dataset.percentages);
      breakdown.commits = data['Commits'] || 0;
      breakdown.prs = data['Pull requests'] || 0;
      breakdown.issues = data['Issues'] || 0;
      breakdown.review = data['Code review'] || 0;
    } catch(e) {
      console.error('Yüzdelikler çözümlenemedi:', e);
    }
  }

  // 3. Aylık Commit Sayılarını Gruplama
  const monthlyData = {};
  const cells = doc.querySelectorAll('td.ContributionCalendar-day');
  
  cells.forEach((cell) => {
    const date = cell.getAttribute('data-date'); // Örn: "2025-10-13"
    const id = cell.getAttribute('id');
    let count = 0;
    
    // Hücrenin ID'si ile HTML'deki <tool-tip> etiketinden sayıyı alıyoruz
    if (id) {
      const tooltipEl = doc.querySelector(`tool-tip[for="${id}"]`);
      if (tooltipEl) {
        const text = tooltipEl.textContent.trim();
        const match = text.match(/^(\d+)\s+contribution/); // Sadece sayı kısmını al
        if (match) count = parseInt(match[1], 10);
      }
    }

    if (date) {
      const monthKey = date.substring(0, 7); // "YYYY-MM" formatında key oluştur
      if (!monthlyData[monthKey]) monthlyData[monthKey] = 0;
      monthlyData[monthKey] += count;
    }
  });

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Objedeki verileri diziye çevirip en sondan geriye (en yeniden en eskiye) sırala
  const monthlyStats = Object.keys(monthlyData).map(key => {
    const [yyyy, mm] = key.split('-');
    const monthName = monthNames[parseInt(mm, 10) - 1];
    return {
      key,
      label: `${monthName} ${yyyy}`,
      count: monthlyData[key]
    };
  }).sort((a, b) => b.key.localeCompare(a.key)); 

  return { total, breakdown, monthlyStats };
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function GitHubContributions() {
  const [data, setData] = useState({ total: 0, breakdown: { commits: 0, prs: 0, issues: 0, review: 0 }, monthlyStats: [] });
  const [loading, setLoading] = useState(true);
  const [isMonthsOpen, setIsMonthsOpen] = useState(false);

  useEffect(() => {
    async function fetchContribs() {
      try {
        const res = await fetch(PROXY_URL);
        const html = await res.text();
        const parsed = parseGitHubHTML(html);
        
        setData(parsed);
        setLoading(false);
      } catch (err) {
        console.error('GitHub verisi çekilemedi:', err);
        setLoading(false);
      }
    }
    fetchContribs();
  }, []);

  if (loading) {
    return (
      <section className="contrib-section" id="github" style={{ padding: '80px 0', minHeight: '300px' }}>
        <div className="container text-center">
           <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
           <p className="mt-3" style={{ color: 'var(--text-muted)' }}>GitHub Activity Syncing...</p>
        </div>
      </section>
    );
  }

  const statsCards = [
    { label: 'Commits',       pct: data.breakdown.commits, icon: 'bi-git' },
    { label: 'Pull Requests', pct: data.breakdown.prs,     icon: 'bi-arrow-left-right' },
    { label: 'Issues',        pct: data.breakdown.issues,  icon: 'bi-exclamation-circle' },
    { label: 'Code Review',   pct: data.breakdown.review,  icon: 'bi-code-square' },
  ];

  return (
    <section className="contrib-section" id="github" style={{ padding: '80px 0' }}>
      <div className="container">
        <p className="section-title">05 &mdash; Activity</p>
        <h2 className="section-heading">
          <i className="bi bi-github" style={{ marginRight: 12 }} />
          {data.total} Contributions <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>in the last year</span>
        </h2>

        {/* İstatistik Dağılım Kartları */}
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

        {/* Aylık Dağılım Göster/Gizle Butonu */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsMonthsOpen(!isMonthsOpen)}
            className="btn-outline-custom"
            style={{ minWidth: '200px' }}
          >
            <i className={`bi bi-chevron-${isMonthsOpen ? 'up' : 'down'} me-2`} />
            {isMonthsOpen ? 'Hide Monthly Breakdown' : 'Show Monthly Breakdown'}
          </button>
        </div>

        {/* Aylık Dağılım Listesi (Collapsible) */}
        {isMonthsOpen && (
          <div className="row justify-content-center mt-4 fade-in-up">
            <div className="col-md-8 col-lg-6">
              <div className="glass-card" style={{ padding: '24px' }}>
                <ul className="list-unstyled mb-0">
                  {data.monthlyStats.map((mStat, i) => {
                    // Sadece commit atılan ayları göster
                    if (mStat.count === 0) return null; 
                    
                    const pct = data.total > 0 ? ((mStat.count / data.total) * 100).toFixed(1) : 0;
                    
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
                          <span style={{ color: 'var(--text-primary)' }}>{mStat.label}</span>
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