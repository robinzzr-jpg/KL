import { useState } from "react";

/* ─── BOOKING LINKS ── */
const BOOKING = {
  petronas: { official: "https://eticket.petronastwintowers.com.my", klook: "https://www.klook.com/en-MY/activity/2750-petronas-twin-towers-kuala-lumpur/", headout: "https://www.headout.com/petronas-twin-towers-kuala-lumpur-tickets-and-tours" },
  petrosains: { official: "https://eticket.petrosains.com.my", klook: "https://www.klook.com/en-MY/activity/26203-petrosains-discovery-centre-ticket-kuala-lumpur/", headout: "https://www.headout.com/petrosains-discovery-centre-tickets", combo: "https://www.headout.com" },
  superpark: { official: "https://www.superpark.com.my/tickets/", klook: "https://www.klook.com/en-MY/activity/26494-superpark-indoor-playland-ticket-kuala-lumpur/", headout: "https://www.headout.com" },
  berjaya: { official: "https://berjayatimessquarethemeparkkl.com/buy-online/", klook: "https://www.klook.com/en-MY/search/?query=berjaya+times+square+theme+park", headout: "https://www.headout.com" },
  birdpark: { official: "https://www.klbirdpark.com/plan-your-visit/", klook: "https://www.klook.com/en-MY/activity/9188-kl-bird-park-one-way-transfer-kuala-lumpur/", headout: "https://www.headout.com" },
  kidzania: { klook: "https://www.klook.com/en-MY/search/?query=kidzania+kuala+lumpur" },
};

/* ─── WEATHER DATA ── */
const weatherDays = [
  { date: "Sun 31 May", label: "Day 1 — Arrival", high: 31, low: 22, emoji: "⛅", feel: "Hot & partly cloudy", rain: "Low", tip: "Morning likely sunny. Afternoon showers possible after 3pm — nothing major. Perfect travel day." },
  { date: "Mon 1 Jun", label: "Day 2 — Public Holiday! 👑", high: 31, low: 23, emoji: "🌦️", feel: "Hot, humid, afternoon showers likely", rain: "Medium", tip: "⚠️ Public holiday rain plan ready — SuperPark or KidZania if Batu Caves washes out." },
  { date: "Tue 2 Jun", label: "Day 3 — KLCC Day", high: 32, low: 23, emoji: "☀️", feel: "Warm, mostly sunny", rain: "Low–Medium", tip: "June is one of KL's drier months. Morning KLCC visits best before afternoon rain." },
  { date: "Wed 3 Jun", label: "Day 4 — Departure Day", high: 32, low: 22, emoji: "⛅", feel: "Hot, partly cloudy", rain: "Low", tip: "Morning shopping at Pavilion — all indoor. Private transfer at 2pm." },
];

/* ─── WET WEATHER PLAN ── */
const wetWeatherBackups = [
  {
    day: "Day 2 (Mon 1 Jun) — Batu Caves Rained Out",
    primary: "If heavy rain before 9am, skip Batu Caves entirely",
    icon: "🌧️",
    options: [
      { name: "Option A: SuperPark Malaysia (all-day)", desc: "Jump straight to Avenue K. 10am opening, 2.5–3 hour session. Best rain backup — completely indoor, brilliant for both ages.", book: "klook.com" },
      { name: "Option B: Petrosains + Petronas Towers (TODAY)", desc: "OPEN on public holidays! Morning visit to Towers then Petrosains. Move Day 3 sightseeing to tomorrow.", book: "headout.com" },
      { name: "Option C: KidZania KL (full day)", desc: "Perfect rainy-day indoor spend. 3+ hours of roleplay for your 8yo especially.", book: "klook.com" },
      { name: "Option D: The Exchange TRX + TRX City Park", desc: "KL's newest mall with free rooftop park. Great indoor backup.", book: null },
      { name: "Option E: Museum of Illusions + Pavilion mall crawl", desc: "Quick 45-min museum, then Pavilion for shopping. Low-cost, flexible.", book: null },
    ]
  },
  {
    day: "Any Day — Afternoon Shower (3–5pm)",
    primary: "KL rain is usually short and intense. Best to wait it out indoors",
    icon: "⛈️",
    options: [
      { name: "Mall hop to nearest AC", desc: "Every day's itinerary ends near Pavilion, Suria KLCC or Berjaya Times Square — all within easy reach.", book: null },
      { name: "KLCC Park to Suria KLCC", desc: "If rain hits during the park visit, walk directly into Suria KLCC for shopping.", book: null },
      { name: "Jalan Alor rain contingency", desc: "Jalan Alor stalls put up awnings in rain — the experience continues!", book: null },
    ]
  },
  {
    day: "Days 3 & 4 — KLCC Park / Pavilion Rained Out",
    primary: "Both days are largely indoor anyway — very low rain risk to itinerary",
    icon: "🌦️",
    options: [
      { name: "Day 3: Rain during KLCC Park wading pool", desc: "Just head back into Suria KLCC and browse. Very low risk.", book: null },
      { name: "Day 4 backup shopping: The Exchange TRX", desc: "If Pavilion feels crowded/rainy, TRX is a great alternative.", book: null },
    ]
  },
];

/* ─── ATTRACTIONS DATA ── */
const attractions = [
  {
    name: "Petronas Twin Towers", emoji: "🏙️", color: "#1A4A6E",
    urgency: "BOOK NOW — SELLS OUT", urgencyColor: "#c0392b",
    hours: [
      { day: "Tue–Sun + Public Holidays", time: "9:00am – 9:00pm (last admission 8:30pm)" },
      { day: "Monday", time: "CLOSED (except 2nd & 4th Monday)" },
      { day: "Your visit: Tue 2 Jun", time: "✅ OPEN — 9am–9pm" },
    ],
    prices: [
      { cat: "Foreign Adult (13+)", price: "RM 98", note: "~SGD 29 / USD 21" },
      { cat: "Foreign Child (3–12)", price: "RM 50", note: "~SGD 15 / USD 11" },
      { cat: "Under 2", price: "FREE", note: "" },
      { cat: "Combo + Petrosains (Headout)", price: "From RM 130+", note: "Saves vs buying separately" },
    ],
    booking: BOOKING.petronas,
    tips: ["🔴 Time-ticketed — LATE ARRIVALS NOT ACCOMMODATED. Be at entrance 15 min early.", "Book 1–2 weeks ahead during school holidays — slots sell out fast.", "Best combo: Klook or Headout."],
    reviews: ["\"Smooth visit, no delays, no lines. Staff kind and ready to support guests.\" — Headout verified, Mar 2025", "\"Very efficient staff even during school holidays.\" — Tiqets verified, 2026"],
  },
  {
    name: "Petrosains Discovery Centre", emoji: "🔬", color: "#2E7D55",
    urgency: "BOOK AHEAD", urgencyColor: "#e67e22",
    hours: [
      { day: "Mon (Public Holidays only)", time: "9:30am – 6:30pm (last admission 5:00pm)" },
      { day: "Tue – Thu", time: "9:30am – 5:30pm (last admission 4:00pm)" },
      { day: "Friday", time: "1:30pm – 5:30pm (last admission 4:00pm)" },
      { day: "Sat / Sun / Public Holidays", time: "9:30am – 6:30pm (last admission 5:00pm)" },
      { day: "Mon 1 Jun (Public Holiday 👑)", time: "✅ OPEN — 9:30am–6:30pm (public holiday hours)" },
      { day: "Tue 2 Jun (your planned visit)", time: "✅ OPEN — 9:30am–5:30pm (last admission 4pm)" },
    ],
    prices: [
      { cat: "Foreign Adult", price: "~RM 46", note: "Confirm at eticket.petrosains.com.my" },
      { cat: "Foreign Child (3–12)", price: "~RM 35", note: "Third-party often cheaper" },
      { cat: "Under 2", price: "FREE", note: "" },
      { cat: "Energy Capsule Ride", price: "Extra fee", note: "Separate ticket — highly recommended!" },
      { cat: "Maker Studio workshop", price: "Extra fee", note: "Great add-on for 8yo" },
    ],
    booking: BOOKING.petrosains,
    tips: ["CASHLESS only — bring card, Apple/Google Pay, or eWallet.", "Time-ticketed system — book slot in advance.", "Combo with Towers saves money."],
    reviews: ["\"Spent almost 4 hours. Kids didn't want to leave. Space, dinos, F1 tech — all huge hits.\" — Airial Travel, Aug 2025", "\"Clean, interactive, well-organized. Family did not feel rushed.\" — Trip.com, 2026"],
  },
];

/* ─── COMPONENT ── */
export default function KLTravelGuide() {
  const [activeTab, setActiveTab] = useState("weather");
  const [activeDay, setActiveDay] = useState(0);
  const [expandedAtt, setExpandedAtt] = useState(null);
  const [expandedBackup, setExpandedBackup] = useState(null);

  const navItems = [
    { id: "weather", label: "🌦️ Weather" },
    { id: "prices", label: "🎟️ Prices & Book" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia',serif", background: "linear-gradient(160deg,#fdf8f0 0%,#f5ede0 100%)", minHeight: "100vh", color: "#2a1f14" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .cg{font-family:'Cormorant Garamond',Georgia,serif}
        .jost{font-family:'Jost',system-ui,sans-serif}
        .nav-tab{cursor:pointer;padding:8px 14px;border-radius:4px;font-family:'Jost',sans-serif;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;border:1.5px solid transparent}
        .nav-tab.active{background:#2a1f14;color:#fdf8f0;border-color:#2a1f14}
        .nav-tab:not(.active){background:rgba(255,255,255,0.65);color:#6b5040;border-color:rgba(42,31,20,0.15)}
        .expand-card{background:white;border-radius:10px;padding:16px 18px;margin-bottom:11px;border:1.5px solid rgba(42,31,20,0.1);cursor:pointer;transition:all 0.2s}
        .expand-card:hover{border-color:rgba(42,31,20,0.25);box-shadow:0 4px 14px rgba(42,31,20,0.1)}
        .badge{display:inline-block;padding:2px 9px;border-radius:3px;font-size:10px;letter-spacing:1px;font-weight:600;font-family:'Jost',sans-serif;text-transform:uppercase}
        .price-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(42,31,20,0.06)}
        .hours-row{display:flex;gap:8px;padding:6px 0;border-bottom:1px solid rgba(42,31,20,0.06);align-items:flex-start}
      `}</style>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#1a3a2a 0%,#2c5a40 45%,#C8773A 100%)", padding: "44px 22px 34px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          <h1 className="cg" style={{ fontSize: 44, fontWeight: 600, color: "#fff", marginTop: 10, lineHeight: 1.1 }}>Kuala Lumpur<br /><span style={{ color: "#f5c87a", fontStyle: "italic" }}>Journey in the Wild</span></h1>
          <p className="jost" style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 8, letterSpacing: 1 }}>31 MAY – 3 JUNE 2026 · BUKIT BINTANG, KUALA LUMPUR · FAMILY OF 4</p>
        </div>
      </div>

      {/* STICKY NAV */}
      <div style={{ background: "rgba(253,248,240,0.97)", borderBottom: "1px solid rgba(42,31,20,0.12)", padding: "10px 22px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", gap: 6, overflowX: "auto" }}>
          {navItems.map(t => <button key={t.id} className={`nav-tab ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>)}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 18px 48px" }}>

        {/* ══ WEATHER TAB ══ */}
        {activeTab === "weather" && (
          <div>
            <h2 className="cg" style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>Weather Forecast & Backup Plans 🌦️</h2>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 20 }}>Late May / Early June in KL</p>

            {/* Day-by-day forecast */}
            <h3 className="cg" style={{ fontSize: 22, fontWeight: 600, marginBottom: 14 }}>Your Day-by-Day Forecast</h3>
            {weatherDays.map((w, i) => (
              <div key={i} style={{ background: "white", borderRadius: 10, padding: "16px 18px", marginBottom: 12, border: "1.5px solid rgba(42,31,20,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div className="jost" style={{ fontSize: 10, color: "#8a6040", letterSpacing: 2, textTransform: "uppercase" }}>{w.label}</div>
                    <div className="cg" style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>{w.date} {w.emoji}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 28, fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: "#C8773A" }}>{w.high}°C</div>
                    <div className="jost" style={{ fontSize: 11, color: "#8a6040" }}>Low {w.low}°C</div>
                  </div>
                </div>
                <div className="jost" style={{ fontSize: 13, color: "#4a3828", marginTop: 8 }}>{w.tip}</div>
              </div>
            ))}

            {/* Wet weather backup plans */}
            <h3 className="cg" style={{ fontSize: 24, fontWeight: 600, marginBottom: 14, marginTop: 24 }}>🌧️ Wet Weather Backup Plans</h3>
            {wetWeatherBackups.map((b, i) => (
              <div key={i} className="expand-card" onClick={() => setExpandedBackup(expandedBackup === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 26 }}>{b.icon}</span>
                    <div>
                      <div className="cg" style={{ fontSize: 18, fontWeight: 600, color: "#1A4A6E" }}>{b.day}</div>
                      <div className="jost" style={{ fontSize: 12, color: "#8a6040", marginTop: 2 }}>{b.primary}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 20, color: "#1A4A6E", fontFamily: "'Jost',sans-serif" }}>{expandedBackup === i ? "−" : "+"}</span>
                </div>
                {expandedBackup === i && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(26,74,110,0.15)" }}>
                    {b.options.map((opt, j) => (
                      <div key={j} style={{ background: "rgba(26,74,110,0.05)", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
                        <div className="cg" style={{ fontSize: 16, fontWeight: 600, color: "#1A4A6E" }}>{opt.name}</div>
                        <div className="jost" style={{ fontSize: 13, color: "#4a3828", marginTop: 4 }}>{opt.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ══ PRICES TAB ══ */}
        {activeTab === "prices" && (
          <div>
            <h2 className="cg" style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>Prices, Hours & Booking Links 🎟️</h2>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 20 }}>Tap to expand each attraction</p>

            {attractions.map((att, i) => (
              <div key={i} className="expand-card" onClick={() => setExpandedAtt(expandedAtt === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 26 }}>{att.emoji}</span>
                    <div>
                      <div className="cg" style={{ fontSize: 19, fontWeight: 600, color: att.color }}>{att.name}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 20, color: att.color, fontFamily: "'Jost',sans-serif" }}>{expandedAtt === i ? "−" : "+"}</span>
                </div>

                {expandedAtt === i && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: `2px solid ${att.color}20` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 16 }}>
                      <div>
                        <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: att.color, fontWeight: 700, marginBottom: 8 }}>🕐 Hours</div>
                        {att.hours.map((h, j) => (
                          <div key={j} className="hours-row">
                            <div className="jost" style={{ fontSize: 11.5, color: "#8a6040", minWidth: 130 }}>{h.day}</div>
                            <div className="jost" style={{ fontSize: 12, color: "#2a1f14" }}>{h.time}</div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: att.color, fontWeight: 700, marginBottom: 8 }}>💰 Prices</div>
                        {att.prices.map((p, j) => (
                          <div key={j} className="price-row">
                            <div className="jost" style={{ fontSize: 12.5, color: "#4a3828" }}>{p.cat}</div>
                            <div style={{ textAlign: "right" }}>
                              <div className="jost" style={{ fontSize: 14, fontWeight: 600, color: att.color }}>{p.price}</div>
                              {p.note && <div className="jost" style={{ fontSize: 10, color: "#8a6040" }}>{p.note}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: att.color, fontWeight: 700, marginBottom: 8 }}>💡 Tips</div>
                    {att.tips.map((t, j) => <div key={j} className="jost" style={{ fontSize: 13, color: "#4a3828", marginBottom: 6 }}>• {t}</div>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 44, textAlign: "center", paddingBottom: 12, borderTop: "1px solid rgba(200,119,58,0.2)", paddingTop: 26 }}>
          <p className="cg" style={{ fontSize: 20, fontStyle: "italic", color: "#C8773A" }}>"Into the wild — and back before bedtime. 🐾"</p>
        </div>
      </div>
    </div>
  );
}
