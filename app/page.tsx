// app/page.tsx
import { getDailyAnalytics, DailyAnalytics } from "@/lib/hygraph";

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

type ScaledVisit = VisitByDay & {
  height: number;
};

export default async function Home() {
  // 🔥 Données Hygraph
  const analytics: DailyAnalytics[] = await getDailyAnalytics();

  const lastDay = analytics[analytics.length - 1];

  // 👉 KPIs = basé sur le dernier jour
  const kpis: KPI[] = [
    {
      label: "Visiteurs aujourd'hui",
      value: lastDay ? lastDay.visitors.toString() : "-",
    },
    {
      label: "Pages vues",
      value: lastDay ? lastDay.pageViews.toString() : "-",
    },
    {
      label: "Conversions",
      value: lastDay ? lastDay.conversions.toString() : "-",
    },
    {
      label: "Nouvelles inscriptions",
      value: lastDay ? lastDay.signups.toString() : "-",
    },
  ];

  // 👉 Données pour le graph (jour + visiteurs)
  const visitsByDay: VisitByDay[] =
    analytics.length > 0
      ? analytics.map((item) => ({
        day: new Date(item.date).toLocaleDateString("fr-FR", {
          weekday: "short",
        }),
        visitors: item.visitors,
      }))
      : [];

  // Hauteur max du graph en pixels
  const GRAPH_HEIGHT = 160;

  const maxVisitors =
    visitsByDay.length > 0
      ? Math.max(...visitsByDay.map((v) => v.visitors))
      : 1;

  const scaledVisits: ScaledVisit[] = visitsByDay.map((item) => ({
    ...item,
    height: Math.max(
      10,
      (item.visitors / maxVisitors) * GRAPH_HEIGHT // min 10px
    ),
  }));

  // 👉 Tableau fake pour “Pages les plus vues”
  const topPages: TopPage[] = [
    { url: "/pricing", views: 982 },
    { url: "/blog/seo-guide", views: 756 },
    { url: "/landing/black-friday", views: 643 },
    { url: "/features", views: 512 },
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
            <p className="subtitle">
              Performances des {analytics.length || 0} derniers jours
            </p>
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
          {/* 🔷 GRAPH VISITEURS */}
          <div className="card">
            <h2>Visiteurs par jour</h2>
            <div className="chart-wrapper">
              <div className="chart-placeholder">
                {scaledVisits.map((item) => (
                  <div
                    key={item.day + item.visitors}
                    className="chart-bar"
                    title={`${item.day} : ${item.visitors} visiteurs`}
                  >
                    <div
                      className="chart-bar-inner"
                      style={{
                        height: `${item.height}px`,
                      }}
                    />
                    <span className="chart-label">{item.day}</span>
                  </div>
                ))}

                {scaledVisits.length === 0 && (
                  <p className="subtitle">Aucune donnée à afficher.</p>
                )}
              </div>
            </div>
          </div>


          {/* TOP PAGES (fake) */}
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

        {/* HISTORIQUE HYGRAPH */}
        <div className="card" style={{ marginTop: "16px" }}>
          <h2>Historique des données (Hygraph)</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Visiteurs</th>
                <th>Pages vues</th>
                <th>Conversions</th>
                <th>Inscriptions</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((item) => (
                <tr key={item.date}>
                  <td>
                    {new Date(item.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>{item.visitors}</td>
                  <td>{item.pageViews}</td>
                  <td>{item.conversions}</td>
                  <td>{item.signups}</td>
                </tr>
              ))}
              {analytics.length === 0 && (
                <tr>
                  <td colSpan={5}>Aucune donnée trouvée.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
