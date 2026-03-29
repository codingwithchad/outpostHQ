import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Zap, Wifi, Users, Coffee, MapPin, Clock, Shield } from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1208;
    --earth: #2c1f0e;
    --amber: #d97706;
    --amber-light: #fbbf24;
    --sand: #f5f0e8;
    --stone: #e8e0d0;
    --muted: #7a6a54;
    --rust: #b45309;
    --forest: #2d4a2d;
    --sky: #1e3a5f;
    --white: #fefcf7;
  }

  body {
    background: var(--sand);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
  }

  .display {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.02em;
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    background: rgba(245, 240, 232, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(92, 72, 44, 0.12);
  }

  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 0.05em;
    color: var(--ink);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-logo-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--amber);
    display: inline-block;
  }

  .nav-tagline {
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .nav-cta {
    padding: 10px 24px;
    background: var(--ink);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--amber); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0;
    position: relative;
    overflow: hidden;
    background: var(--earth);
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 60% 40%, rgba(217, 119, 6, 0.15) 0%, transparent 70%),
      radial-gradient(ellipse 60% 80% at 20% 80%, rgba(45, 74, 45, 0.2) 0%, transparent 60%),
      linear-gradient(165deg, #1a1208 0%, #2c1f0e 40%, #1e2a1e 100%);
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(217, 119, 6, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(217, 119, 6, 0.06) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    padding: 160px 48px 80px;
    max-width: 1100px;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(217, 119, 6, 0.15);
    border: 1px solid rgba(217, 119, 6, 0.3);
    border-radius: 2px;
    padding: 6px 14px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--amber-light);
    margin-bottom: 32px;
  }

  .hero-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--amber);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .hero-h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(72px, 10vw, 140px);
    line-height: 0.92;
    letter-spacing: 0.01em;
    color: var(--white);
    margin-bottom: 32px;
  }

  .hero-h1 .amber { color: var(--amber); }

  .hero-sub {
    font-size: 18px;
    font-weight: 300;
    color: rgba(254, 252, 247, 0.65);
    max-width: 560px;
    line-height: 1.7;
    margin-bottom: 48px;
  }

  .hero-badges {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 64px;
  }

  .hero-badge {
    padding: 10px 18px;
    border: 1px solid rgba(254, 252, 247, 0.15);
    border-radius: 2px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(254, 252, 247, 0.75);
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hero-badge svg { opacity: 0.6; }

  .hero-bottom-bar {
    position: relative;
    z-index: 2;
    border-top: 1px solid rgba(217, 119, 6, 0.2);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    divide-x: 1px solid rgba(217,119,6,0.2);
  }

  .hero-stat {
    padding: 28px 48px;
    border-right: 1px solid rgba(217, 119, 6, 0.15);
  }
  .hero-stat:last-child { border-right: none; }

  .hero-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    color: var(--amber);
    letter-spacing: 0.02em;
    line-height: 1;
  }

  .hero-stat-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(254, 252, 247, 0.45);
    margin-top: 4px;
  }

  /* SECTION STYLES */
  .section {
    padding: 120px 48px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 16px;
  }

  .section-h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(42px, 5vw, 72px);
    line-height: 0.95;
    letter-spacing: 0.01em;
    color: var(--ink);
    margin-bottom: 24px;
  }

  .section-body {
    font-size: 16px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.7;
    max-width: 520px;
    margin-bottom: 64px;
  }

  /* SCENARIOS */
  .scenarios {
    background: var(--ink);
    padding: 120px 48px;
  }

  .scenarios-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1px;
    background: rgba(217, 119, 6, 0.15);
    border: 1px solid rgba(217, 119, 6, 0.15);
    margin-top: 64px;
  }

  .scenario-card {
    background: var(--earth);
    padding: 40px 36px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
  }

  .scenario-card:hover { background: #3a2a14; }

  .scenario-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--amber);
    transform: scaleX(0);
    transition: transform 0.3s;
    transform-origin: left;
  }

  .scenario-card:hover::before { transform: scaleX(1); }

  .scenario-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 64px;
    color: rgba(217, 119, 6, 0.15);
    line-height: 1;
    margin-bottom: 20px;
    letter-spacing: 0.02em;
  }

  .scenario-icon {
    margin-bottom: 16px;
    color: var(--amber);
  }

  .scenario-h3 {
    font-size: 17px;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 12px;
    letter-spacing: 0.02em;
  }

  .scenario-p {
    font-size: 14px;
    font-weight: 300;
    color: rgba(254, 252, 247, 0.5);
    line-height: 1.7;
  }

  /* FEATURES */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2px;
    background: rgba(92, 72, 44, 0.12);
  }

  .feature-card {
    background: var(--white);
    padding: 40px 36px;
    transition: background 0.2s;
  }

  .feature-card:hover { background: var(--stone); }

  .feature-icon {
    width: 48px; height: 48px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .feature-h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 10px;
    letter-spacing: 0.02em;
  }

  .feature-p {
    font-size: 14px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.7;
  }

  /* PRICING */
  .pricing {
    background: var(--stone);
    padding: 120px 48px;
  }

  .pricing-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2px;
    background: rgba(92, 72, 44, 0.15);
    margin-top: 64px;
  }

  .pricing-card {
    background: var(--white);
    padding: 44px 40px;
    position: relative;
  }

  .pricing-card.featured {
    background: var(--ink);
  }

  .pricing-tag {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pricing-tag-line {
    flex: 1;
    height: 1px;
    background: rgba(217, 119, 6, 0.25);
  }

  .pricing-h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    letter-spacing: 0.02em;
    margin-bottom: 8px;
  }

  .pricing-card:not(.featured) .pricing-h3 { color: var(--ink); }
  .pricing-card.featured .pricing-h3 { color: var(--white); }

  .pricing-desc {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 28px;
    line-height: 1.6;
  }

  .pricing-card:not(.featured) .pricing-desc { color: var(--muted); }
  .pricing-card.featured .pricing-desc { color: rgba(254,252,247,0.55); }

  .pricing-price {
    margin-bottom: 28px;
    padding-bottom: 28px;
    border-bottom: 1px solid;
  }

  .pricing-card:not(.featured) .pricing-price { border-color: rgba(92,72,44,0.12); }
  .pricing-card.featured .pricing-price { border-color: rgba(217,119,6,0.2); }

  .pricing-amount {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 56px;
    letter-spacing: 0.01em;
    line-height: 1;
  }

  .pricing-card:not(.featured) .pricing-amount { color: var(--ink); }
  .pricing-card.featured .pricing-amount { color: var(--amber); }

  .pricing-unit {
    font-size: 13px;
    font-weight: 400;
    margin-top: 4px;
  }

  .pricing-card:not(.featured) .pricing-unit { color: var(--muted); }
  .pricing-card.featured .pricing-unit { color: rgba(254,252,247,0.45); }

  .pricing-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .pricing-feature {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }

  .pricing-card:not(.featured) .pricing-feature { color: var(--muted); }
  .pricing-card.featured .pricing-feature { color: rgba(254,252,247,0.7); }

  .check {
    width: 16px; height: 16px;
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--amber);
  }

  /* CTA */
  .cta-section {
    padding: 120px 48px;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .cta-h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 5vw, 80px);
    line-height: 0.95;
    letter-spacing: 0.01em;
    color: var(--ink);
    margin-bottom: 24px;
  }

  .cta-h2 .amber { color: var(--amber); }

  .cta-body {
    font-size: 16px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .cta-detail {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
  }

  .cta-detail-icon {
    width: 36px; height: 36px;
    background: rgba(217, 119, 6, 0.08);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--amber);
  }

  .cta-detail-text {
    font-size: 14px;
    font-weight: 400;
    color: var(--muted);
    line-height: 1.6;
  }

  .cta-detail-text strong { color: var(--ink); font-weight: 600; }

  /* FORM */
  .form-card {
    background: var(--ink);
    padding: 48px 44px;
    border-radius: 2px;
  }

  .form-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 24px;
    display: block;
  }

  .form-h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    letter-spacing: 0.02em;
    color: var(--white);
    margin-bottom: 8px;
  }

  .form-sub {
    font-size: 14px;
    font-weight: 300;
    color: rgba(254,252,247,0.5);
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-input {
    width: 100%;
    padding: 14px 16px;
    background: rgba(254,252,247,0.06);
    border: 1px solid rgba(217, 119, 6, 0.2);
    border-radius: 2px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--white);
    outline: none;
    transition: border-color 0.2s;
  }

  .form-input::placeholder { color: rgba(254,252,247,0.3); }
  .form-input:focus { border-color: var(--amber); }

  .form-btn {
    width: 100%;
    padding: 16px 24px;
    background: var(--amber);
    color: var(--ink);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 0.08em;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-top: 8px;
  }

  .form-btn:hover { background: var(--amber-light); }
  .form-btn:active { transform: scale(0.99); }
  .form-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .form-err {
    font-size: 13px;
    color: #f87171;
    margin-top: 10px;
  }

  .form-success {
    text-align: center;
    padding: 40px 0;
  }

  .form-success-icon {
    color: var(--amber);
    margin-bottom: 16px;
  }

  .form-success-h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    letter-spacing: 0.02em;
    color: var(--white);
    margin-bottom: 8px;
  }

  .form-success-p {
    font-size: 14px;
    font-weight: 300;
    color: rgba(254,252,247,0.5);
    line-height: 1.6;
  }

  /* FOOTER */
  .footer {
    background: var(--earth);
    padding: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    border-top: 1px solid rgba(217, 119, 6, 0.15);
  }

  .footer-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 0.05em;
    color: var(--white);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .footer-tagline {
    font-size: 12px;
    font-weight: 400;
    color: rgba(254,252,247,0.3);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .footer-right {
    font-size: 13px;
    font-weight: 300;
    color: rgba(254,252,247,0.3);
  }

  @media (max-width: 768px) {
    .nav { padding: 16px 24px; }
    .hero-content { padding: 120px 24px 60px; }
    .hero-bottom-bar { grid-template-columns: 1fr; }
    .hero-stat { border-right: none; border-bottom: 1px solid rgba(217,119,6,0.15); }
    .section { padding: 80px 24px; }
    .scenarios { padding: 80px 24px; }
    .pricing { padding: 80px 24px; }
    .cta-section { grid-template-columns: 1fr; padding: 80px 24px; gap: 48px; }
    .footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
  }
`;

const features = [
  { icon: <Zap size={22} />, color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', title: '10kW Inverter Power', desc: 'Full 800Ah lithium battery system. Charge laptops, monitors, servers — everything your team needs to stay productive.' },
  { icon: <Wifi size={22} />, color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', title: 'Starlink + 5G Failover', desc: 'Dual-redundant connectivity. When one goes down, the other kicks in automatically. No dead zones, no excuses.' },
  { icon: <Users size={22} />, color: '#4ade80', bg: 'rgba(74,222,128,0.08)', title: 'Command Center Setup', desc: '8–10 ergonomic workstations. Standing desk options. Real screens, real chairs. Your team works, not suffers.' },
  { icon: <Coffee size={22} />, color: '#f97316', bg: 'rgba(249,115,22,0.08)', title: 'Fully Catered', desc: 'Coffee, snacks, full meals on request. A well-fed team is a productive team. We handle logistics so you handle business.' },
  { icon: <Shield size={22} />, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', title: 'Dedicated On-Site Support', desc: 'A trained human stays with you. Wi-Fi issues, power questions, catering needs — resolved immediately, not via ticket.' },
  { icon: <MapPin size={22} />, color: '#f87171', bg: 'rgba(248,113,113,0.08)', title: 'Deploys Anywhere', desc: 'Your parking lot. A trailhead in the Cascades. The beach at sunset. We come to you, configured and ready.' },
];

const scenarios = [
  { num: '01', icon: <Zap size={24} />, title: 'Power failure at 9am', desc: "Lights out. Internet down. Your 50-person team stops. You call OutpostHQ. We're there in 45 minutes. Your critical team is back online before the competition knows you had a problem." },
  { num: '02', icon: <Wifi size={24} />, title: 'ISP outage — $10k/hour', desc: "Your internet provider goes down. Calls missed. Deals lost. One month of OutpostHQ standby costs less than two hours of that downtime. We've already done the math." },
  { num: '03', icon: <AlertTriangle size={24} />, title: 'Building evacuation', desc: "HVAC fails. Fire alarm. Evacuation. Your team has nowhere to go. We set up in your parking lot. You're operating before the building gets cleared." },
  { num: '04', icon: <MapPin size={24} />, title: 'Team offsite — no compromises', desc: "Leadership retreat at Rainier. Planning session at Snoqualmie. Real workspace, real internet, real coffee — at the destination your team actually wants to go." },
];

export default function OutpostHQ() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://formspree.io/f/mbjqwbzw', {
        method: 'POST',
        body: JSON.stringify({ email, name }),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setName('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Unable to submit. Check your connection.');
    }
    setLoading(false);
  };

  const scrollToForm = () => {
    document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-dot" />
          OutpostHQ
        </div>
        <div className="nav-tagline">Work from anywhere. Power optional.</div>
        <button className="nav-cta" onClick={scrollToForm}>Get Early Access</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Now deploying — Seattle metro
          </div>
          <h1 className="hero-h1">
            YOUR<br />
            OFFICE<br />
            <span className="amber">ANYWHERE.</span>
          </h1>
          <p className="hero-sub">
            Mobile workspace + emergency business continuity. Power outage, network failure, or team offsite — OutpostHQ deploys a full command center to your location in 45 minutes.
          </p>
          <div className="hero-badges">
            <div className="hero-badge"><Zap size={16} /> 10kW off-grid power</div>
            <div className="hero-badge"><Wifi size={16} /> Starlink + 5G redundancy</div>
            <div className="hero-badge"><Users size={16} /> 8–10 person workspace</div>
            <div className="hero-badge"><Clock size={16} /> 45-min emergency response</div>
          </div>
        </div>
        <div className="hero-bottom-bar">
          <div className="hero-stat">
            <div className="hero-stat-num">45</div>
            <div className="hero-stat-label">Minutes to deployment</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">10kW</div>
            <div className="hero-stat-label">Inverter power output</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">2×</div>
            <div className="hero-stat-label">Redundant internet connections</div>
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="scenarios">
        <div className="scenarios-inner">
          <p className="section-label" style={{ color: 'var(--amber)' }}>When things go wrong</p>
          <h2 className="section-h2" style={{ color: 'var(--white)', marginBottom: 0 }}>
            OUTAGES DON'T<br />SEND WARNINGS.
          </h2>
          <div className="scenarios-grid">
            {scenarios.map((s) => (
              <div key={s.num} className="scenario-card">
                <div className="scenario-num">{s.num}</div>
                <div className="scenario-icon">{s.icon}</div>
                <h3 className="scenario-h3">{s.title}</h3>
                <p className="scenario-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <p className="section-label">What's on board</p>
        <h2 className="section-h2">THE FULL<br />COMMAND CENTER.</h2>
        <p className="section-body">
          This isn't a cargo van with an extension cord. OutpostHQ is a purpose-built mobile workspace with enterprise-grade equipment — deployed, configured, and staffed.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon" style={{ background: f.bg }}>
                <span style={{ color: f.color }}>{f.icon}</span>
              </div>
              <h3 className="feature-h3">{f.title}</h3>
              <p className="feature-p">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <div className="pricing-inner">
          <p className="section-label">Simple, flat-rate pricing</p>
          <h2 className="section-h2">NO SURPRISES.<br />JUST RESULTS.</h2>
          <div className="pricing-grid">
            {/* Emergency */}
            <div className="pricing-card">
              <div className="pricing-tag">Emergency Response <span className="pricing-tag-line" /></div>
              <h3 className="pricing-h3">Emergency Dispatch</h3>
              <p className="pricing-desc">Power failure. Network down. Building evacuation. Call us.</p>
              <div className="pricing-price">
                <div className="pricing-amount">$2,500</div>
                <div className="pricing-unit">Flat rate · 4-hour minimum</div>
              </div>
              <ul className="pricing-features">
                {['45-minute deployment guarantee', 'Full workspace for 8–10 people', 'Power + Starlink + 5G', 'Catering included', 'On-site support staff'].map(f => (
                  <li key={f} className="pricing-feature">
                    <svg className="check" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Standby — featured */}
            <div className="pricing-card featured">
              <div className="pricing-tag">Most popular <span className="pricing-tag-line" /></div>
              <h3 className="pricing-h3">Monthly Standby</h3>
              <p className="pricing-desc">We're on-call for you. Guaranteed 30-minute response, any time.</p>
              <div className="pricing-price">
                <div className="pricing-amount">$4,000</div>
                <div className="pricing-unit">Per month · Annual commitment</div>
              </div>
              <ul className="pricing-features">
                {['30-minute guaranteed response', 'Unlimited emergency deployments', 'Priority offsite booking', '2 scheduled offsites included', 'Dedicated account rep'].map(f => (
                  <li key={f} className="pricing-feature">
                    <svg className="check" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Offsite */}
            <div className="pricing-card">
              <div className="pricing-tag">Team events <span className="pricing-tag-line" /></div>
              <h3 className="pricing-h3">Offsite Day Rate</h3>
              <p className="pricing-desc">Rainier. Snoqualmie. The coast. Wherever your team does their best thinking.</p>
              <div className="pricing-price">
                <div className="pricing-amount">$1,500</div>
                <div className="pricing-unit">Per day</div>
              </div>
              <ul className="pricing-features">
                {['Scenic location deployment', 'Full workspace + amenities', 'Outdoor break coordination', 'Catering on request', 'Transport guidance included'].map(f => (
                  <li key={f} className="pricing-feature">
                    <svg className="check" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="early-access">
        <div className="cta-section">
          <div>
            <p className="section-label">Launching spring 2026</p>
            <h2 className="cta-h2">GET IN<br />BEFORE THE<br /><span className="amber">STORM.</span></h2>
            <p className="cta-body">
              We're opening early access to a small group of Seattle-area businesses. Priority booking, launch pricing, and a dedicated setup call — before we go public.
            </p>
            <div className="cta-detail">
              <div className="cta-detail-icon"><Clock size={18} /></div>
              <div className="cta-detail-text"><strong>We'll reach out within 48 hours</strong> to schedule a 20-minute call and confirm your needs.</div>
            </div>
            <div className="cta-detail">
              <div className="cta-detail-icon"><MapPin size={18} /></div>
              <div className="cta-detail-text"><strong>Currently serving Seattle metro</strong> — Bellevue, Redmond, Kirkland, Everett, and surrounding areas.</div>
            </div>
            <div className="cta-detail">
              <div className="cta-detail-icon"><Shield size={18} /></div>
              <div className="cta-detail-text"><strong>No commitment required</strong> to join the waitlist. No spam. Just a real conversation.</div>
            </div>
          </div>

          <div className="form-card">
            {submitted ? (
              <div className="form-success">
                <CheckCircle size={48} className="form-success-icon" style={{ color: 'var(--amber)', margin: '0 auto 16px', display: 'block' }} />
                <h3 className="form-success-h3">You're In.</h3>
                <p className="form-success-p">We'll be in touch within 48 hours to set up a quick call. Watch your inbox.</p>
              </div>
            ) : (
              <>
                <span className="form-label">Early access waitlist</span>
                <h3 className="form-h3">Reserve your spot.</h3>
                <p className="form-sub">Limited to 12 launch partners in the Seattle area.</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-input"
                      type="email"
                      placeholder="Work email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button className="form-btn" type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Request Early Access'}
                  </button>
                  {error && <p className="form-err">{error}</p>}
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="nav-logo-dot" />
          OutpostHQ
        </div>
        <div className="footer-tagline">Work from anywhere. Power optional.</div>
        <div className="footer-right">Seattle, WA · Launching Spring 2026</div>
      </footer>
    </>
  );
}
