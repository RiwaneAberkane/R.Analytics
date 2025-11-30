// app/page.tsx

type KPI = {
  label: string;
  value: string;
};

type TopPage = {
  url: string;
  views: number;
};

type VisitByDay = {
  day: string;
  visitors: number;
};

export default function Home() {
  const kpis: KPI[] = [
    { label: "Visiteurs aujourd'hui", value: "1 284" },
    { label: "Pages vues", value: "3 972" },
    { label: "Taux de conversion", value: "4,3 %" },
    { label: "Nouvelles inscriptions", value: "87" },
  ];

  const topPages: TopPage[] = [
    { url: "/pricing", views: 982 },
    { url: "/blog/seo-guide", views: 756 },
    { url: "/landing/black-friday", views: 643 },
    { url: "/features", views: 512 },
  ];

  const visitsByDay: VisitByDay[] = [
    { day: "Lun", visitors: 720 },
    { day: "Mar", visitors: 860 },
    { day: "Mer", visitors: 910 },
    { day: "Jeu", visitors: 790 },
    { day: "Ven", visitors: 1040 },
    { day: "Sam", visitors: 680 },
    { day: "Dim", visitors: 540 },
  ];

  return (
    <main className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">R.Analytics</div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link active">
            Dashboard
          </a>
          <a href="#" className="sidebar-link">
            Rapports
          </a>
          <a href="#" className="sidebar-link">
            Utilisateurs
          </a>
          <a href="#" className="sidebar-link">
            Paramètres
          </a>
        </nav>
      </aside>

      {/* Contenu principal */}
      <section className="content">
        <header className="content-header">
          <div>
            <h1>Vue d’ensemble</h1>
            <p className="subtitle">Performances des 7 derniers jours</p>
          </div>
          <button className="btn-primary">Exporter les données</button>
        </header>

        {/* KPIs */}
        <div className="kpi-grid">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="kpi-card">
              <span className="kpi-label">{kpi.label}</span>
              <span className="kpi-value">{kpi.value}</span>
            </div>
          ))}
        </div>

        <div className="grid-2">
          {/* Graphique simplifié (fake) */}
          <div className="card">
            <h2>Visiteurs par jour</h2>
            <div className="chart-placeholder">
              {visitsByDay.map((item) => (
                <div key={item.day} className="chart-bar">
                  <div
                    className="chart-bar-inner"
                    style={{
                      height: `${(item.visitors / 1100) * 100}%`,
                    }}
                  />
                  <span className="chart-label">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top pages */}
          <div className="card">
            <h2>Pages les plus vues</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Vues</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page) => (
                  <tr key={page.url}>
                    <td>{page.url}</td>
                    <td>{page.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
