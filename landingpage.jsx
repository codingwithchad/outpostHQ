import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertTriangle, Zap, Wifi, Users, Coffee, MapPin, Clock, Shield, ChevronDown, Star, Truck } from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #12100a;
    --earth: #1e1610;
    --earth2: #2a1d10;
    --amber: #d97706;
    --amber-light: #fbbf24;
    --amber-dim: rgba(217,119,6,0.18);
    --sand: #f2ebe0;
    --stone: #e4dace;
    --muted: #7a6a54;
    --rust: #a84a0a;
    --forest: #1e3320;
    --pine: #2a4a2e;
    --white: #fdf9f2;
    --slate: #1a2030;
    --steel: #2a3545;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--sand);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    overflow-x: hidden;
  }

  /* ── NAV ── */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 48px;
    background: rgba(18,16,10,0.88);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(217,119,6,0.12);
  }

  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 0.08em;
    color: var(--white);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--amber);
    animation: pulse 2.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50% { opacity:0.5; transform:scale(0.8); }
  }

  .nav-center {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(253,249,242,0.35);
  }

  .nav-cta {
    padding: 9px 22px;
    background: var(--amber);
    color: var(--ink);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 0.1em;
    border: none;
    cursor: pointer;
    border-radius: 1px;
    transition: background 0.2s, transform 0.1s;
  }
  .nav-cta:hover { background: var(--amber-light); }
  .nav-cta:active { transform: scale(0.98); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
    background: var(--ink);
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 65% 35%, rgba(217,119,6,0.12) 0%, transparent 65%),
      radial-gradient(ellipse 50% 70% at 15% 75%, rgba(30,51,32,0.35) 0%, transparent 60%),
      linear-gradient(160deg, #0e0c08 0%, #1a1208 45%, #121a0e 100%);
  }

  /* PNW mountain silhouette */
  .hero-mountains {
    position: absolute;
    bottom: 0;
    left: 0; right: 0;
    height: 45%;
    opacity: 0.07;
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 400'%3E%3Cpolygon points='0,400 200,100 350,220 500,60 650,200 800,30 950,180 1100,80 1250,200 1440,90 1440,400' fill='%23d97706'/%3E%3C/svg%3E")
      bottom/cover no-repeat;
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(217,119,6,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(217,119,6,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  .hero-rain {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      175deg,
      transparent 0px,
      transparent 40px,
      rgba(217,119,6,0.02) 40px,
      rgba(217,119,6,0.02) 41px
    );
  }

  .hero-content {
    position: relative;
    z-index: 2;
    padding: 160px 48px 72px;
    max-width: 1140px;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: rgba(217,119,6,0.12);
    border: 1px solid rgba(217,119,6,0.28);
    border-radius: 1px;
    padding: 6px 14px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--amber-light);
    margin-bottom: 28px;
  }

  .hero-h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(80px, 11vw, 148px);
    line-height: 0.88;
    letter-spacing: 0.01em;
    color: var(--white);
    margin-bottom: 28px;
  }

  .hero-h1 .amber { color: var(--amber); }

  .hero-kicker {
    font-size: 13px;
    font-weight: 400;
    font-style: italic;
    color: rgba(253,249,242,0.4);
    letter-spacing: 0.06em;
    margin-bottom: 20px;
    border-left: 2px solid var(--amber);
    padding-left: 14px;
  }

  .hero-sub {
    font-size: 17px;
    font-weight: 300;
    color: rgba(253,249,242,0.6);
    max-width: 540px;
    line-height: 1.75;
    margin-bottom: 44px;
  }

  .hero-badges {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 56px;
  }

  .hero-badge {
    padding: 9px 16px;
    border: 1px solid rgba(253,249,242,0.12);
    border-radius: 1px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(253,249,242,0.65);
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .hero-badge svg { opacity: 0.55; }

  .hero-stats {
    position: relative;
    z-index: 2;
    border-top: 1px solid rgba(217,119,6,0.18);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .hero-stat {
    padding: 26px 40px;
    border-right: 1px solid rgba(217,119,6,0.12);
  }
  .hero-stat:last-child { border-right: none; }

  .hero-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 44px;
    color: var(--amber);
    line-height: 1;
  }

  .hero-stat-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(253,249,242,0.4);
    margin-top: 4px;
  }

  /* ── FLEET ── */
  .fleet {
    background: var(--ink);
    padding: 0 0 120px;
  }

  .fleet-header {
    padding: 100px 48px 64px;
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 48px;
  }

  .fleet-header-left {}

  .fleet-header-right {
    max-width: 380px;
    font-size: 15px;
    font-weight: 300;
    color: rgba(253,249,242,0.45);
    line-height: 1.75;
    flex-shrink: 0;
  }

  .fleet-cards {
    padding: 0 48px;
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: 2px;
    background: rgba(217,119,6,0.1);
  }

  .fleet-card {
    background: var(--earth2);
    padding: 52px 48px;
    position: relative;
    overflow: hidden;
  }

  .fleet-card.flagship {
    background: linear-gradient(145deg, #231808 0%, #1a1208 100%);
    border-top: 2px solid var(--amber);
  }

  .fleet-card.support {
    background: var(--earth);
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0;
    background: transparent;
  }

  .fleet-sub-card {
    background: var(--earth);
    padding: 36px 40px;
    flex: 1;
    position: relative;
  }

  .fleet-sub-card + .fleet-sub-card {
    border-top: 1px solid rgba(217,119,6,0.1);
  }

  .fleet-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 1px;
    margin-bottom: 24px;
  }

  .fleet-badge.gold {
    background: rgba(217,119,6,0.15);
    color: var(--amber-light);
    border: 1px solid rgba(217,119,6,0.3);
  }

  .fleet-badge.silver {
    background: rgba(253,249,242,0.05);
    color: rgba(253,249,242,0.45);
    border: 1px solid rgba(253,249,242,0.1);
  }

  .fleet-h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 40px;
    letter-spacing: 0.02em;
    color: var(--white);
    margin-bottom: 6px;
    line-height: 1;
  }

  .fleet-sub-card .fleet-h3 {
    font-size: 28px;
  }

  .fleet-tagline {
    font-size: 13px;
    font-weight: 400;
    font-style: italic;
    color: var(--amber);
    margin-bottom: 20px;
    letter-spacing: 0.04em;
  }

  .fleet-desc {
    font-size: 14px;
    font-weight: 300;
    color: rgba(253,249,242,0.5);
    line-height: 1.75;
    margin-bottom: 28px;
  }

  .fleet-specs {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 28px;
  }

  .fleet-spec {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    color: rgba(253,249,242,0.65);
    line-height: 1.5;
  }

  .fleet-spec-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--amber);
    flex-shrink: 0;
    margin-top: 7px;
  }

  .fleet-highlight {
    background: rgba(217,119,6,0.08);
    border: 1px solid rgba(217,119,6,0.2);
    border-radius: 1px;
    padding: 14px 16px;
    font-size: 13px;
    font-style: italic;
    color: rgba(253,249,242,0.55);
    line-height: 1.6;
    margin-top: 8px;
  }

  .fleet-highlight strong {
    color: var(--amber-light);
    font-style: normal;
    font-weight: 500;
  }

  /* build-first callout */
  .build-first {
    margin: 64px 48px 0;
    max-width: 1140px;
    margin-left: auto;
    margin-right: auto;
    padding: 32px 40px;
    background: rgba(217,119,6,0.07);
    border: 1px solid rgba(217,119,6,0.2);
    border-radius: 1px;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .build-first-icon {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--amber-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--amber);
    flex-shrink: 0;
  }

  .build-first-text {
    font-size: 15px;
    font-weight: 300;
    color: rgba(253,249,242,0.55);
    line-height: 1.7;
  }

  .build-first-text strong {
    color: var(--amber-light);
    font-weight: 600;
  }

  /* ── SCENARIOS ── */
  .scenarios {
    background: var(--earth2);
    padding: 120px 48px;
  }

  .scenarios-inner {
    max-width: 1140px;
    margin: 0 auto;
  }

  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
    gap: 1px;
    background: rgba(217,119,6,0.12);
    border: 1px solid rgba(217,119,6,0.12);
    margin-top: 60px;
  }

  .scenario-card {
    background: var(--earth);
    padding: 40px 32px;
    position: relative;
    overflow: hidden;
    transition: background 0.25s;
  }

  .scenario-card:hover { background: #2e1e0e; }

  .scenario-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--amber);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
  }

  .scenario-card:hover::after { transform: scaleX(1); }

  .scenario-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 72px;
    color: rgba(217,119,6,0.1);
    line-height: 1;
    margin-bottom: 16px;
  }

  .scenario-icon { color: var(--amber); margin-bottom: 14px; }

  .scenario-h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 10px;
    letter-spacing: 0.02em;
  }

  .scenario-p {
    font-size: 13px;
    font-weight: 300;
    color: rgba(253,249,242,0.45);
    line-height: 1.75;
  }

  /* ── FEATURES ── */
  .features-section {
    padding: 120px 48px;
    max-width: 1140px;
    margin: 0 auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px,1fr));
    gap: 2px;
    background: rgba(92,72,44,0.1);
    margin-top: 60px;
  }

  .feature-card {
    background: var(--white);
    padding: 38px 32px;
    transition: background 0.2s;
  }

  .feature-card:hover { background: var(--stone); }

  .feature-icon {
    width: 44px; height: 44px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
  }

  .feature-h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 9px;
    letter-spacing: 0.02em;
  }

  .feature-p {
    font-size: 13px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.75;
  }

  /* ── PRICING ── */
  .pricing {
    background: var(--stone);
    padding: 120px 48px;
  }

  .pricing-inner {
    max-width: 1140px;
    margin: 0 auto;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 2px;
    background: rgba(92,72,44,0.12);
    margin-top: 60px;
  }

  .pricing-card {
    background: var(--white);
    padding: 44px 36px;
  }

  .pricing-card.featured { background: var(--ink); }

  .pricing-tag {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pricing-tag-line {
    flex: 1; height: 1px;
    background: rgba(217,119,6,0.22);
  }

  .pricing-h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px;
    letter-spacing: 0.02em;
    margin-bottom: 7px;
  }

  .pricing-card:not(.featured) .pricing-h3 { color: var(--ink); }
  .pricing-card.featured .pricing-h3 { color: var(--white); }

  .pricing-desc {
    font-size: 13px;
    font-weight: 300;
    margin-bottom: 24px;
    line-height: 1.65;
  }

  .pricing-card:not(.featured) .pricing-desc { color: var(--muted); }
  .pricing-card.featured .pricing-desc { color: rgba(253,249,242,0.45); }

  .pricing-price {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid;
  }

  .pricing-card:not(.featured) .pricing-price { border-color: rgba(92,72,44,0.1); }
  .pricing-card.featured .pricing-price { border-color: rgba(217,119,6,0.18); }

  .pricing-amount {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    line-height: 1;
    letter-spacing: 0.01em;
  }

  .pricing-card:not(.featured) .pricing-amount { color: var(--ink); }
  .pricing-card.featured .pricing-amount { color: var(--amber); }

  .pricing-unit {
    font-size: 12px;
    font-weight: 400;
    margin-top: 4px;
  }

  .pricing-card:not(.featured) .pricing-unit { color: var(--muted); }
  .pricing-card.featured .pricing-unit { color: rgba(253,249,242,0.38); }

  .pricing-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  .pricing-feature {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    font-size: 13px;
    line-height: 1.5;
  }

  .pricing-card:not(.featured) .pricing-feature { color: var(--muted); }
  .pricing-card.featured .pricing-feature { color: rgba(253,249,242,0.65); }

  .check { width:15px; height:15px; flex-shrink:0; margin-top:2px; color:var(--amber); }

  /* ── CTA ── */
  .cta-wrap {
    background: var(--sand);
    padding: 120px 48px;
  }

  .cta-section {
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 14px;
  }

  .section-h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(42px, 5vw, 72px);
    line-height: 0.92;
    letter-spacing: 0.01em;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .section-body {
    font-size: 15px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.75;
    max-width: 480px;
    margin-bottom: 48px;
  }

  .cta-detail {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 14px;
  }

  .cta-detail-icon {
    width: 34px; height: 34px;
    background: rgba(217,119,6,0.08);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--amber);
  }

  .cta-detail-text {
    font-size: 13px;
    font-weight: 400;
    color: var(--muted);
    line-height: 1.65;
    padding-top: 6px;
  }

  .cta-detail-text strong { color: var(--ink); font-weight: 600; }

  /* FORM */
  .form-card {
    background: var(--ink);
    padding: 48px 44px;
    border-radius: 1px;
  }

  .form-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 20px;
    display: block;
  }

  .form-h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px;
    letter-spacing: 0.02em;
    color: var(--white);
    margin-bottom: 6px;
  }

  .form-sub {
    font-size: 13px;
    font-weight: 300;
    color: rgba(253,249,242,0.42);
    margin-bottom: 28px;
    line-height: 1.65;
  }

  .form-group { margin-bottom: 14px; }

  .form-input {
    width: 100%;
    padding: 13px 15px;
    background: rgba(253,249,242,0.05);
    border: 1px solid rgba(217,119,6,0.18);
    border-radius: 1px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--white);
    outline: none;
    transition: border-color 0.2s;
  }

  .form-input::placeholder { color: rgba(253,249,242,0.28); }
  .form-input:focus { border-color: var(--amber); }

  .form-select {
    width: 100%;
    padding: 13px 15px;
    background: rgba(253,249,242,0.05);
    border: 1px solid rgba(217,119,6,0.18);
    border-radius: 1px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: rgba(253,249,242,0.6);
    outline: none;
    appearance: none;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .form-select:focus { border-color: var(--amber); }
  .form-select option { background: var(--earth2); color: var(--white); }

  .form-btn {
    width: 100%;
    padding: 15px 24px;
    background: var(--amber);
    color: var(--ink);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 19px;
    letter-spacing: 0.1em;
    border: none;
    border-radius: 1px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-top: 6px;
  }

  .form-btn:hover { background: var(--amber-light); }
  .form-btn:active { transform: scale(0.99); }
  .form-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .form-err { font-size: 12px; color: #f87171; margin-top: 8px; }

  .form-success {
    text-align: center;
    padding: 40px 0;
  }

  .form-success-h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px;
    letter-spacing: 0.02em;
    color: var(--white);
    margin: 14px 0 8px;
  }

  .form-success-p {
    font-size: 13px;
    font-weight: 300;
    color: rgba(253,249,242,0.45);
    line-height: 1.65;
  }

  /* ── FAQ ── */
  .faq {
    background: var(--earth);
    padding: 100px 48px;
  }

  .faq-inner {
    max-width: 800px;
    margin: 0 auto;
  }

  .faq-list {
    margin-top: 52px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: rgba(217,119,6,0.1);
  }

  .faq-item {
    background: var(--earth2);
    overflow: hidden;
  }

  .faq-q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 28px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    color: var(--white);
    letter-spacing: 0.02em;
    gap: 16px;
    transition: background 0.2s;
    user-select: none;
  }

  .faq-q:hover { background: rgba(217,119,6,0.06); }

  .faq-chevron {
    color: var(--amber);
    flex-shrink: 0;
    transition: transform 0.28s ease;
  }

  .faq-chevron.open { transform: rotate(180deg); }

  .faq-a {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease, padding 0.25s ease;
    padding: 0 28px;
    font-size: 14px;
    font-weight: 300;
    color: rgba(253,249,242,0.5);
    line-height: 1.8;
  }

  .faq-a.open {
    max-height: 300px;
    padding: 0 28px 24px;
  }

  /* ── FOOTER ── */
  .footer {
    background: var(--ink);
    padding: 44px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    border-top: 1px solid rgba(217,119,6,0.12);
  }

  .footer-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 0.06em;
    color: var(--white);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .footer-tagline {
    font-size: 11px;
    font-weight: 400;
    color: rgba(253,249,242,0.28);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .footer-right {
    font-size: 12px;
    font-weight: 300;
    color: rgba(253,249,242,0.28);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .nav { padding: 16px 20px; }
    .nav-center { display: none; }
    .hero-content { padding: 120px 20px 56px; }
    .hero-stats { grid-template-columns: repeat(2,1fr); }
    .fleet-header { padding: 72px 20px 48px; flex-direction: column; align-items: flex-start; }
    .fleet-cards { grid-template-columns: 1fr; padding: 0 20px; }
    .build-first { margin: 40px 20px 0; }
    .scenarios { padding: 80px 20px; }
    .features-section { padding: 80px 20px; }
    .pricing { padding: 80px 20px; }
    .pricing-grid { grid-template-columns: 1fr; }
    .cta-wrap { padding: 80px 20px; }
    .cta-section { grid-template-columns: 1fr; gap: 48px; }
    .faq { padding: 80px 20px; }
    .footer { padding: 32px 20px; flex-direction: column; align-items: flex-start; }
  }
`;

const faqs = [
  {
    q: "Can people work while the van is driving?",
    a: "Yes — that's one of The Outpost's core features. The flat-panel Starlink works at highway speeds, there's 5G as backup, and every captain's chair has power and a laptop tray. Your team can work the entire drive to Snoqualmie Pass, the coast, or wherever the offsite takes you. We treat the drive as productive time, not dead time."
  },
  {
    q: "What if I have a standby client AND an offsite scheduled at the same time?",
    a: "This is handled upfront in your contract. Emergency standby clients hold priority — that's what they're paying the monthly retainer for. Offsite clients sign an acknowledgment that OutpostHQ operates as a single-unit service during the launch phase, and pricing reflects that. When we add a second unit, this conflict disappears entirely. We're transparent about it rather than overpromising."
  },
  {
    q: "How long does setup take when you arrive on-site?",
    a: "The Outpost van is ready to work the moment you park — your passengers never stopped working. For trailer deployments (larger teams, 8–12 people), plan on a 20–30 minute setup window to extend workspace, connect power, and configure the network. We arrive ahead of the team so everything is running when people walk in."
  },
  {
    q: "Do I need to be near Seattle?",
    a: "For the launch phase, yes — we're serving the greater Seattle metro area including Bellevue, Redmond, Kirkland, and Everett, with offsite range extending to the Cascades, Snoqualmie Pass, and the coast. Emergency response has a 45-minute radius. Offsites can go further with advance notice."
  },
  {
    q: "What's the difference between Executive Class and Field Class?",
    a: "Executive Class is The Outpost van — 4 to 6 captain's chairs, private jet interior, works while moving. It's the flagship experience. Field Class is the trailer-based expansion: more workstations (6–8 additional seats), deployed stationary at the destination. Most offsites use both — executives ride and work in the van, the rest of the team drives separately and meets at the trailer workspace."
  },
  {
    q: "What's the Standby plan actually worth?",
    a: "A single power outage or ISP failure can cost $10,000+ per hour in lost productivity for a 20-person team. The $4,000/month standby plan is less than half a day of downtime. You also get two included offsites per month, priority dispatch, and a 30-minute response guarantee instead of 45."
  },
];

const features = [
  { icon: <Zap size={20} />, color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', title: '10kW Inverter Power', desc: 'Full 800Ah lithium system. Laptops, monitors, servers — everything runs without a shore power connection.' },
  { icon: <Wifi size={20} />, color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', title: 'Starlink + 5G Failover', desc: 'Flat-panel Starlink works at highway speed. 5G kicks in automatically. Redundant connectivity everywhere you go.' },
  { icon: <Users size={20} />, color: '#4ade80', bg: 'rgba(74,222,128,0.08)', title: 'Real Workstations', desc: 'Captain\'s chairs with laptop trays in the van. Standing desk options in the trailer. Actual screens, actual ergonomics.' },
  { icon: <Coffee size={20} />, color: '#f97316', bg: 'rgba(249,115,22,0.08)', title: 'Fully Catered', desc: 'Coffee, snacks, full meals on request. We handle logistics so your team can focus.' },
  { icon: <Shield size={20} />, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', title: 'On-Site Support', desc: 'A trained operator stays with you. Connectivity issues, power questions, anything — resolved on the spot.' },
  { icon: <MapPin size={20} />, color: '#f87171', bg: 'rgba(248,113,113,0.08)', title: 'PNW-Ready Build', desc: 'Weatherproofed for the Pacific Northwest. Rain, cold, mountain elevation — The Outpost is built for it.' },
];

const scenarios = [
  { num: '01', icon: <Zap size={22} />, title: 'Power failure at 9am', desc: "Lights out across the building. Your 40-person team has nowhere to work. You call OutpostHQ. We're there in 45 minutes. Critical staff is back online before your competition knows you had a problem." },
  { num: '02', icon: <Wifi size={22} />, title: 'ISP down — clock is running', desc: "Network goes out. Calls drop. Deals stall. One month of standby costs less than two hours of that downtime. The math isn't complicated." },
  { num: '03', icon: <AlertTriangle size={22} />, title: 'Building evacuation', desc: "HVAC failure. Fire alarm. Evacuated and stuck in the parking lot. We set up right there. Your team is operational before the building gets cleared." },
  { num: '04', icon: <MapPin size={22} />, title: 'Offsite — no compromises', desc: "Powder day at Snoqualmie. Leadership retreat in the Cascades. Your team works the whole drive there. Real workspace at the destination. No compromises." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <ChevronDown size={18} className={`faq-chevron${open ? ' open' : ''}`} />
      </div>
      <div className={`faq-a${open ? ' open' : ''}`}>{a}</div>
    </div>
  );
}

const CheckSVG = () => (
  <svg className="check" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function OutpostHQ() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://formspree.io/f/mvzvkykv', {
        method: 'POST',
        body: JSON.stringify({ email, name, interest }),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        setSubmitted(true);
        setEmail(''); setName(''); setInterest('');
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
          <span className="nav-dot" />
          OutpostHQ
        </div>
        <div className="nav-center">Work from anywhere. Power optional.</div>
        <button className="nav-cta" onClick={scrollToForm}>Get Early Access</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-mountains" />
        <div className="hero-grid" />
        <div className="hero-rain" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="nav-dot" style={{ width: 5, height: 5 }} />
            Now deploying — Seattle metro
          </div>
          <div className="hero-kicker">The Pacific Northwest office, untethered.</div>
          <h1 className="hero-h1">
            YOUR<br />
            OFFICE<br />
            <span className="amber">ANYWHERE.</span>
          </h1>
          <p className="hero-sub">
            Mobile workspace + emergency business continuity. Power outage, network failure, or powder day at Snoqualmie — OutpostHQ puts a full command center wherever your team needs to be.
          </p>
          <div className="hero-badges">
            <div className="hero-badge"><Zap size={14} /> 10kW off-grid power</div>
            <div className="hero-badge"><Wifi size={14} /> Works at highway speed</div>
            <div className="hero-badge"><Users size={14} /> 4–12 person workspace</div>
            <div className="hero-badge"><Clock size={14} /> 45-min emergency response</div>
            <div className="hero-badge"><MapPin size={14} /> PNW-built & weatherproofed</div>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">45</div>
            <div className="hero-stat-label">Min to deployment</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">10kW</div>
            <div className="hero-stat-label">Off-grid power</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">2×</div>
            <div className="hero-stat-label">Redundant internet</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">4–12</div>
            <div className="hero-stat-label">Seats available</div>
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="fleet">
        <div className="fleet-header">
          <div className="fleet-header-left">
            <p className="section-label" style={{ color: 'var(--amber)' }}>The fleet</p>
            <h2 className="section-h2" style={{ color: 'var(--white)', marginBottom: 0 }}>
              BUILT FOR<br />THE NORTHWEST.
            </h2>
          </div>
          <p className="fleet-header-right">
            One flagship van. One expandable trailer. A rugged PNW build that works in rain, cold, and mountain elevation — not a chrome limo from Los Angeles.
          </p>
        </div>

        <div className="fleet-cards">
          {/* Flagship */}
          <div className="fleet-card flagship">
            <div className="fleet-badge gold">
              <Star size={9} /> Executive Class · The Outpost
            </div>
            <h3 className="fleet-h3">The Outpost Van</h3>
            <p className="fleet-tagline">Private jet interior. Mountain-ready build.</p>
            <p className="fleet-desc">
              A converted Mercedes Sprinter built for the Pacific Northwest. Not chrome and white leather — think weathered leather, matte finishes, wool accents, dark timber. Rugged luxury. The kind of thing you'd actually take to a trailhead.
            </p>
            <div className="fleet-specs">
              <div className="fleet-spec"><span className="fleet-spec-dot" /> 4–6 captain's chairs with fold-out laptop trays</div>
              <div className="fleet-spec"><span className="fleet-spec-dot" /> Flat-panel Starlink operates at full highway speed</div>
              <div className="fleet-spec"><span className="fleet-spec-dot" /> 5G cellular failover, auto-switching</div>
              <div className="fleet-spec"><span className="fleet-spec-dot" /> USB-C + AC power at every seat</div>
              <div className="fleet-spec"><span className="fleet-spec-dot" /> Ambient lighting, sound, climate control</div>
              <div className="fleet-spec"><span className="fleet-spec-dot" /> Weatherproofed for rain, cold, elevation</div>
            </div>
            <div className="fleet-highlight">
              <strong>Your team works the entire drive.</strong> Snoqualmie Pass, the coast, the Cascades — the van is the office. No setup time. No dead commute. You arrive productive.
            </div>
          </div>

          {/* Support fleet */}
          <div className="fleet-card support">
            <div className="fleet-sub-card">
              <div className="fleet-badge silver">
                <Truck size={9} /> Field Class · The Expansion
              </div>
              <h3 className="fleet-h3">The Trailer</h3>
              <p className="fleet-tagline">Scale up at the destination.</p>
              <p className="fleet-desc" style={{ marginBottom: 16 }}>
                Towed to any location, the trailer rolls out 6–8 additional workstations — full monitors, standing desks, enterprise networking. For teams too large for the van alone.
              </p>
              <div className="fleet-specs">
                <div className="fleet-spec"><span className="fleet-spec-dot" /> 6–8 stationary workstations with monitors</div>
                <div className="fleet-spec"><span className="fleet-spec-dot" /> Standing desk options</div>
                <div className="fleet-spec"><span className="fleet-spec-dot" /> Networked to van's Starlink + 5G</div>
                <div className="fleet-spec"><span className="fleet-spec-dot" /> 20–30 min setup at destination</div>
              </div>
            </div>
            <div className="fleet-sub-card">
              <div className="fleet-badge silver">
                <Truck size={9} /> Phase 2 · Second Unit
              </div>
              <h3 className="fleet-h3">Utility Van</h3>
              <p className="fleet-tagline">Gear hauler + overflow transport.</p>
              <p className="fleet-desc" style={{ marginBottom: 0 }}>
                A second cargo Sprinter that tows the trailer, carries gear, and transports the larger team to offsites. Adding this unit also eliminates the emergency vs. offsite scheduling conflict — both run simultaneously.
              </p>
            </div>
          </div>
        </div>

        <div className="build-first">
          <div className="build-first-icon"><Star size={20} /></div>
          <p className="build-first-text">
            <strong>Building the van first.</strong> The Outpost is the flagship experience — it's what gets people excited, generates word of mouth, and commands premium pricing. The trailer and second van follow once the first unit is generating revenue. Start with the product that sells itself.
          </p>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="scenarios">
        <div className="scenarios-inner">
          <p className="section-label">When things go sideways</p>
          <h2 className="section-h2" style={{ color: 'var(--white)', marginBottom: 0 }}>
            OUTAGES DON'T<br />SEND WARNINGS.
          </h2>
          <div className="scenarios-grid">
            {scenarios.map(s => (
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
      <section className="features-section">
        <p className="section-label">What's on board</p>
        <h2 className="section-h2">THE FULL<br />COMMAND CENTER.</h2>
        <p className="section-body">
          This isn't a cargo van with an extension cord. OutpostHQ is a purpose-built mobile workspace with enterprise-grade equipment — deployed, configured, and staffed.
        </p>
        <div className="features-grid">
          {features.map(f => (
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
            <div className="pricing-card">
              <div className="pricing-tag">Emergency Response <span className="pricing-tag-line" /></div>
              <h3 className="pricing-h3">Emergency Dispatch</h3>
              <p className="pricing-desc">Power failure. Network down. Building evacuation. Call us anytime.</p>
              <div className="pricing-price">
                <div className="pricing-amount">$2,500</div>
                <div className="pricing-unit">Flat rate · 4-hour minimum</div>
              </div>
              <ul className="pricing-features">
                {['45-minute deployment guarantee', 'Full workspace for up to 12', 'Power + Starlink + 5G', 'Catering included', 'On-site support staff'].map(f => (
                  <li key={f} className="pricing-feature"><CheckSVG />{f}</li>
                ))}
              </ul>
            </div>

            <div className="pricing-card featured">
              <div className="pricing-tag">Most popular <span className="pricing-tag-line" /></div>
              <h3 className="pricing-h3">Monthly Standby</h3>
              <p className="pricing-desc">On-call for you. Guaranteed 30-minute response, any time, any day.</p>
              <div className="pricing-price">
                <div className="pricing-amount">$4,000</div>
                <div className="pricing-unit">Per month · Annual commitment</div>
              </div>
              <ul className="pricing-features">
                {['30-minute guaranteed response', 'Unlimited emergency deployments', 'Priority offsite booking', '2 scheduled offsites included', 'Dedicated account rep'].map(f => (
                  <li key={f} className="pricing-feature"><CheckSVG />{f}</li>
                ))}
              </ul>
            </div>

            <div className="pricing-card">
              <div className="pricing-tag">Team events <span className="pricing-tag-line" /></div>
              <h3 className="pricing-h3">Offsite Day Rate</h3>
              <p className="pricing-desc">Snoqualmie. The coast. Rainier. Wherever your team does their best work.</p>
              <div className="pricing-price">
                <div className="pricing-amount">$1,500</div>
                <div className="pricing-unit">Per day · Van + trailer available</div>
              </div>
              <ul className="pricing-features">
                {['Team works entire drive up', 'Full workspace on arrival', 'Outdoor break coordination', 'Catering on request', 'Transport guidance included'].map(f => (
                  <li key={f} className="pricing-feature"><CheckSVG />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="faq-inner">
          <p className="section-label" style={{ color: 'var(--amber)' }}>Common questions</p>
          <h2 className="section-h2" style={{ color: 'var(--white)' }}>
            QUESTIONS<br />WE HEAR.
          </h2>
          <div className="faq-list">
            {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="early-access" className="cta-wrap">
        <div className="cta-section">
          <div>
            <p className="section-label">Launching spring 2026</p>
            <h2 className="section-h2">GET IN<br />BEFORE THE<br /><span style={{ color: 'var(--amber)' }}>STORM.</span></h2>
            <p className="section-body">
              We're opening early access to a small group of Seattle-area businesses. Priority booking, launch pricing, and a dedicated setup call — before we go public.
            </p>
            <div className="cta-detail">
              <div className="cta-detail-icon"><Clock size={16} /></div>
              <div className="cta-detail-text"><strong>We'll reach out within 48 hours</strong> to schedule a 20-minute call and understand your needs.</div>
            </div>
            <div className="cta-detail">
              <div className="cta-detail-icon"><MapPin size={16} /></div>
              <div className="cta-detail-text"><strong>Currently serving Seattle metro</strong> — Bellevue, Redmond, Kirkland, Everett, and surrounding areas.</div>
            </div>
            <div className="cta-detail">
              <div className="cta-detail-icon"><Shield size={16} /></div>
              <div className="cta-detail-text"><strong>No commitment required</strong> to join the waitlist. No spam. Just a real conversation.</div>
            </div>
          </div>

          <div className="form-card">
            {submitted ? (
              <div className="form-success">
                <CheckCircle size={44} style={{ color: 'var(--amber)', display: 'block', margin: '0 auto' }} />
                <h3 className="form-success-h3">You're In.</h3>
                <p className="form-success-p">We'll be in touch within 48 hours to set up a quick call. Watch your inbox.</p>
              </div>
            ) : (
              <>
                <span className="form-label">Early access waitlist</span>
                <h3 className="form-h3">Reserve your spot.</h3>
                <p className="form-sub">Limited to 12 launch partners in the Seattle area.</p>
                <div className="form-group">
                  <input className="form-input" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <input className="form-input" type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <select className="form-select" value={interest} onChange={e => setInterest(e.target.value)}>
                    <option value="">What interests you most?</option>
                    <option value="standby">Monthly standby / emergency response</option>
                    <option value="offsite">Team offsites</option>
                    <option value="both">Both</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
                <button className="form-btn" onClick={handleSubmit} disabled={loading || !name || !email}>
                  {loading ? 'Sending...' : 'Request Early Access'}
                </button>
                {error && <p className="form-err">{error}</p>}
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="nav-dot" />
          OutpostHQ
        </div>
        <div className="footer-tagline">Work from anywhere. Power optional.</div>
        <div className="footer-right">Seattle, WA · Launching Spring 2026</div>
      </footer>
    </>
  );
}