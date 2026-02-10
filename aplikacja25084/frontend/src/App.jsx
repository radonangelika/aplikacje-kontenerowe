import React, { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

async function getJson(path) {
  const r = await fetch(path);
  const t = await r.text();
  try {
    return JSON.parse(t);
  } catch {
    return { raw: t };
  }
}

function nowLabel() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function App() {
  const [health, setHealth] = useState(null);
  const [db, setDb] = useState(null);
  const [visits, setVisits] = useState(null);
  const [loading, setLoading] = useState(true);

  // Live controls
  const [live, setLive] = useState(true);
  const [intervalMs, setIntervalMs] = useState(3000);

  // Chart history
  const [history, setHistory] = useState(() => []); // {t, v}
  const timerRef = useRef(null);

  async function refresh() {
    const [h, d, v] = await Promise.all([
      getJson("/api/health"),
      getJson("/api/db"),
      getJson("/api/visits"),
    ]);

    setHealth(h);
    setDb(d);
    setVisits(v);

    const vv = typeof v?.visits === "number" ? v.visits : null;
    if (vv !== null) {
      setHistory((prev) => {
        const next = [...prev, { t: nowLabel(), v: vv }];
        // trzymamy ostatnie 30 punktów
        return next.slice(-30);
      });
    }

    setLoading(false);
  }

  async function addVisit() {
    await getJson("/api/init");
    await refresh();
  }

  // Live polling
  useEffect(() => {
    // pierwsze pobranie
    refresh();

    // sprzątanie poprzedniego timera
    if (timerRef.current) clearInterval(timerRef.current);

    if (live) {
      timerRef.current = setInterval(() => {
        refresh();
      }, intervalMs);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, intervalMs]);

  const statusPill = useMemo(() => {
    const ok = health?.status === "healthy";
    return ok
      ? { text: "API: healthy", tone: "ok" }
      : { text: "API: unknown", tone: "warn" };
  }, [health]);

  const dbTime = db?.db_time ?? db?.raw ?? "—";
  const visitsCount = visits?.visits ?? "—";

  const chartData = useMemo(() => {
    return {
      labels: history.map((p) => p.t),
      datasets: [
        {
          label: "Visits",
          data: history.map((p) => p.v),
          tension: 0.35,
          pointRadius: 2,
          pointHoverRadius: 4,
          borderWidth: 2,
        },
      ],
    };
  }, [history]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
      },
    };
  }, []);

  return (
    <div style={S.page}>
      <div style={S.topbar}>
        <div style={S.brand}>
          <div style={S.logo}>🐳</div>
          <div>
            <div style={S.title}>Panel projektu</div>
            <div style={S.subtitle}>React + Nginx + Flask + Postgres + Docker Compose</div>
          </div>
        </div>

        <div style={S.pills}>
          <span style={{ ...S.pill, ...(statusPill.tone === "ok" ? S.pillOk : S.pillWarn) }}>
            {statusPill.text}
          </span>
          <span style={{ ...S.pill, ...S.pillNeutral }}>
            Live: {live ? "ON" : "OFF"}
          </span>
        </div>
      </div>

      <div style={S.grid}>
        {/* Left column */}
        <div style={S.card}>
          <div style={S.cardHeader}>
            <div>
              <div style={S.cardTitle}>Sterowanie</div>
              <div style={S.cardHint}>Odświeżanie danych + dodawanie wizyt</div>
            </div>
          </div>

          <div style={S.actionsRow}>
            <button style={{ ...S.btn, ...S.btnDark }} onClick={refresh} disabled={loading}>
              Odśwież
            </button>
            <button style={{ ...S.btn, ...S.btnPrimary }} onClick={addVisit} disabled={loading}>
              Dodaj wizytę
            </button>
          </div>

          <div style={S.liveRow}>
            <label style={S.switchRow}>
              <input
                type="checkbox"
                checked={live}
                onChange={(e) => setLive(e.target.checked)}
              />
              <span style={S.switchLabel}>Auto-odświeżanie</span>
            </label>

            <div style={S.selectRow}>
              <span style={S.small}>Interwał:</span>
              <select
                value={intervalMs}
                onChange={(e) => setIntervalMs(Number(e.target.value))}
                style={S.select}
              >
                <option value={1000}>1s</option>
                <option value={2000}>2s</option>
                <option value={3000}>3s</option>
                <option value={5000}>5s</option>
                <option value={10000}>10s</option>
              </select>
            </div>
          </div>

          <div style={S.metrics}>
            <div style={S.metric}>
              <div style={S.metricLabel}>Visits</div>
              <div style={S.metricValue}>{visitsCount}</div>
            </div>
            <div style={S.metric}>
              <div style={S.metricLabel}>DB time</div>
              <div style={S.metricValueSmall}>{String(dbTime).slice(0, 26)}</div>
            </div>
          </div>

          <div style={S.note}>
            <div style={S.noteTitle}>Podpowiedź</div>
            <div style={S.noteText}>
              Frontend rozmawia z backendem przez <b>/api</b> (reverse proxy w Nginx).
              Backend łączy się z bazą po nazwie serwisu <b>db</b>.
            </div>
          </div>
        </div>

        {/* Right column - chart */}
        <div style={S.cardWide}>
          <div style={S.cardHeader}>
            <div>
              <div style={S.cardTitle}>Wykres visits</div>
              <div style={S.cardHint}>Ostatnie 30 pomiarów (aktualizowane na żywo)</div>
            </div>
          </div>

          <div style={S.chartBox}>
            <Line data={chartData} options={chartOptions} />
          </div>

          <div style={S.bottomGrid}>
            <div style={S.smallCard}>
              <div style={S.smallTitle}>API /health</div>
              <pre style={S.pre}>{loading ? "Ładuję..." : JSON.stringify(health, null, 2)}</pre>
            </div>
            <div style={S.smallCard}>
              <div style={S.smallTitle}>API /db</div>
              <pre style={S.pre}>{loading ? "Ładuję..." : JSON.stringify(db, null, 2)}</pre>
            </div>
            <div style={S.smallCard}>
              <div style={S.smallTitle}>API /visits</div>
              <pre style={S.pre}>{loading ? "Ładuję..." : JSON.stringify(visits, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>

      <div style={S.footer}>
        <span>
          Wejście do kontenerów:
          <code style={S.code}> docker exec -it app-web sh </code>
          <code style={S.code}> docker exec -it app-api sh </code>
        </span>
      </div>
    </div>
  );
}

const S = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "linear-gradient(180deg, #f7f8ff 0%, #f6f7fb 50%, #f3f4f6 100%)",
    minHeight: "100vh",
    padding: 28,
    color: "#111827",
  },
  topbar: {
    maxWidth: 1100,
    margin: "0 auto 16px auto",
    background: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(229,231,235,0.9)",
    borderRadius: 18,
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backdropFilter: "blur(8px)",
  },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
    background: "#111827",
    color: "white",
    fontSize: 22,
  },
  title: { fontSize: 22, fontWeight: 900, lineHeight: 1.1 },
  subtitle: { color: "#6b7280", fontSize: 13 },
  pills: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" },
  pill: { padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  pillOk: { background: "#dcfce7", color: "#166534" },
  pillWarn: { background: "#fef3c7", color: "#92400e" },
  pillNeutral: { background: "#e5e7eb", color: "#111827" },

  grid: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: 14,
  },
  card: {
    background: "white",
    borderRadius: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 25px rgba(0,0,0,.06)",
    padding: 16,
  },
  cardWide: {
    background: "white",
    borderRadius: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 25px rgba(0,0,0,.06)",
    padding: 16,
  },
  cardHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  cardTitle: { fontSize: 16, fontWeight: 900 },
  cardHint: { fontSize: 13, color: "#6b7280", marginTop: 4 },

  actionsRow: { display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" },
  btn: { padding: "10px 14px", border: 0, borderRadius: 12, cursor: "pointer", fontWeight: 900 },
  btnPrimary: { background: "#2563eb", color: "white" },
  btnDark: { background: "#111827", color: "white" },

  liveRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 12,
    padding: 12,
    borderRadius: 14,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    flexWrap: "wrap",
  },
  switchRow: { display: "flex", alignItems: "center", gap: 10 },
  switchLabel: { fontWeight: 800, color: "#111827" },
  selectRow: { display: "flex", alignItems: "center", gap: 8 },
  select: { padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", fontWeight: 700 },
  small: { fontSize: 12, color: "#6b7280", fontWeight: 800 },

  metrics: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 },
  metric: { padding: 12, borderRadius: 14, background: "#0b1020", color: "#d1e7ff" },
  metricLabel: { fontSize: 12, opacity: 0.85, fontWeight: 800 },
  metricValue: { fontSize: 28, fontWeight: 1000, marginTop: 6 },
  metricValueSmall: { fontSize: 12, fontWeight: 800, marginTop: 10, opacity: 0.95 },

  note: { marginTop: 12, padding: 12, borderRadius: 14, border: "1px dashed #cbd5e1", background: "#f8fafc" },
  noteTitle: { fontWeight: 900 },
  noteText: { color: "#475569", marginTop: 6, fontSize: 13, lineHeight: 1.35 },

  chartBox: { height: 260, marginTop: 10, padding: 10, borderRadius: 14, border: "1px solid #e5e7eb", background: "#f9fafb" },

  bottomGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 12 },
  smallCard: { border: "1px solid #e5e7eb", borderRadius: 14, padding: 10, background: "#ffffff" },
  smallTitle: { fontWeight: 900, fontSize: 13, marginBottom: 8 },
  pre: { background: "#0b1020", color: "#d1e7ff", padding: 10, borderRadius: 12, overflow: "auto", minHeight: 110, margin: 0 },

  footer: { maxWidth: 1100, margin: "12px auto 0 auto", color: "#6b7280", fontSize: 13 },
  code: { background: "#111827", color: "white", padding: "2px 8px", borderRadius: 8, marginLeft: 8 }
};
