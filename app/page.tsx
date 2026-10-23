'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LOCAL_BEASTS,
  LOCAL_CHARACTERS,
  LOCAL_ACADEMIES,
  LOCAL_DANGER_ZONES,
  LOCAL_SKILLS,
  getBeastSnapshotAtChapter,
  BeastRecord,
} from '@/sanity/lib/dataService';

export default function HomePage() {
  const [currentChapter, setCurrentChapter] = useState<number>(109);
  const [activeTab, setActiveTab] = useState<'sanctuary' | 'codex' | 'dossier' | 'realm'>('sanctuary');
  const [selectedProtagonist, setSelectedProtagonist] = useState<'leo' | 'lily'>('leo');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAffinity, setSelectedAffinity] = useState<string>('all');
  const [selectedBeast, setSelectedBeast] = useState<BeastRecord | null>(null);

  // Toggle Dark/Light Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // Dynamic parameters calculated by chapter progression
  const getPhaseNumber = (ch: number) => {
    if (ch <= 25) return 1;
    if (ch <= 70) return 2;
    if (ch <= 120) return 3;
    return 4;
  };

  const phase = getPhaseNumber(currentChapter);

  // Dynamic multiplier and attributes for Leo
  const multiplier = phase === 1 ? 8 : phase === 2 ? 9 : phase === 3 ? 10 : 11;
  const mortalSoulRank = phase === 1 ? 'Common 1' : phase === 2 ? 'Uncommon 2' : phase === 3 ? 'Rare 3' : 'Super Rare 4';
  const softCap = phase === 1 ? '10%' : phase === 2 ? '20%' : phase === 3 ? '30%' : '40%';
  const vit = phase === 1 ? 3 : phase === 2 ? 15 : phase === 3 ? 38 : 65;
  const str = phase === 1 ? 3 : phase === 2 ? 18 : phase === 3 ? 42 : 72;
  const agi = phase === 1 ? 3 : phase === 2 ? 22 : phase === 3 ? 45 : 80;
  const sta = phase === 1 ? 4 : phase === 2 ? 16 : phase === 3 ? 40 : 70;
  const intVal = phase === 1 ? 1 : phase === 2 ? 10 : phase === 3 ? 25 : 45;
  const maxMana = intVal * 10 * multiplier;

  // Filter beasts for Codex view
  const filteredBeasts = LOCAL_BEASTS.filter((b) => {
    const matchesQuery =
      searchQuery === '' ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.elementAffinity.some((el) => el.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAffinity =
      selectedAffinity === 'all' ||
      b.elementAffinity.some((el) => el.toLowerCase() === selectedAffinity.toLowerCase());

    return matchesQuery && matchesAffinity;
  });

  return (
    <div className="app-shell">
      {/* 1. FIXED TOP APP HEADER */}
      <header className="app-header pt-safe">
        <div className="header-container">
          <div className="header-brand">
            <div className="brand-icon-box">
              <span className="material-symbols-outlined">all_inclusive</span>
            </div>
            <div className="brand-text-col">
              <div className="brand-title-row">
                <span className="brand-title">BEAST DOMINION</span>
                <span className="multiplier-pill">Multiplier ×{multiplier}</span>
              </div>
              <span className="brand-subtitle">
                {activeTab === 'sanctuary' && `Sanctuary Codex • Ch. ${currentChapter}`}
                {activeTab === 'codex' && 'Field Bestiary & Soul Lore'}
                {activeTab === 'dossier' && 'Pact Master Dossier'}
                {activeTab === 'realm' && 'Velerath Cartography • Sector 09'}
              </span>
            </div>
          </div>

          <div className="header-actions">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Light/Dark Theme"
              className="action-btn"
            >
              <span className="material-symbols-outlined">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Quick CMS Studio Link */}
            <Link
              href="/studio"
              target="_blank"
              title="Open Sanity Studio Editor"
              className="action-btn-studio"
            >
              <span className="material-symbols-outlined">edit_note</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main className="main-content">
        
        {/* STORY PROGRESS SYNCHRONIZATION HUD */}
        <section className="hud-card" aria-label="Story Progress Synchronization">
          <div className="hud-top-row">
            <div className="hud-left">
              <span className="material-symbols-outlined hud-icon">auto_stories</span>
              <div>
                <div className="hud-title-group">
                  <span className="hud-title">Story Progress Sync</span>
                  <span className="spoiler-badge">Anti-Spoiler Mode</span>
                </div>
                <div className="hud-status-text">
                  Viewing: <strong>Chapter {currentChapter}</strong> [
                  {phase === 1
                    ? 'Kendru Awakening'
                    : phase === 2
                    ? 'Academy Trials'
                    : phase === 3
                    ? 'Blood Bond & Fief Defense'
                    : 'Apex Sovereign'}
                  ]
                </div>
              </div>
            </div>
            <div className="phase-pill">
              Phase {phase} Active (×{multiplier})
            </div>
          </div>

          {/* Interactive Chapter Range Slider */}
          <div className="scrubber-group">
            <input
              type="range"
              min={1}
              max={150}
              value={currentChapter}
              onChange={(e) => setCurrentChapter(Number(e.target.value))}
              id="chapter-scrubber"
              aria-label="Chapter Scrubber"
            />
            <div className="chapter-ticks-row">
              <span>Ch. 1 (Awakening)</span>
              <span>Ch. 26 (Academy)</span>
              <span>Ch. 71 (Blood Bond)</span>
              <span>Ch. 120 (Sovereign)</span>
            </div>
          </div>

          {/* Phase Milestone Selector Grid */}
          <div className="phase-grid">
            <button
              onClick={() => setCurrentChapter(15)}
              className={`phase-btn ${phase === 1 ? 'active' : ''}`}
            >
              <div className="phase-btn-header">Phase I • Ch 1–25</div>
              <div className="phase-btn-sub">Kendru (×8)</div>
            </button>

            <button
              onClick={() => setCurrentChapter(50)}
              className={`phase-btn ${phase === 2 ? 'active' : ''}`}
            >
              <div className="phase-btn-header">Phase II • Ch 26–70</div>
              <div className="phase-btn-sub">Academy (×9)</div>
            </button>

            <button
              onClick={() => setCurrentChapter(109)}
              className={`phase-btn ${phase === 3 ? 'active' : ''}`}
            >
              <div className="phase-btn-header">Phase III • Ch 71–120</div>
              <div className="phase-btn-sub">Fief War (×10)</div>
            </button>

            <button
              onClick={() => setCurrentChapter(135)}
              className={`phase-btn ${phase === 4 ? 'active' : ''}`}
            >
              <div className="phase-btn-header">Phase IV • Ch 121+</div>
              <div className="phase-btn-sub">Sovereign (×11+)</div>
            </button>
          </div>
        </section>

        {/* TAB 1: DOMINION SANCTUARY */}
        {activeTab === 'sanctuary' && (
          <div className="tab-container">
            {/* Sovereign Dominion Identity Card (Leo) */}
            <section className="sovereign-card">
              <div className="sovereign-profile-row">
                {/* Sovereign Avatar */}
                <div className="sovereign-avatar-wrap">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhbJyCncrv7U9rwD_bzdBowfebOUEEVhtRlkVJs6XnJzHABIcsiotVj-74mpu8PQGMdvIVUpH-x25us6ClONL7hFLMihMvJ8l4NX7-lX3yHQ41F-9BEQrsDFqA-G05GSnqknRYY5pqf623mj8HzIIiMhs9f6QRqP74XMhqTbZbESpzjGpx2ROakrEvOBYIN1gH3d_3lNITriFEh8XEgqM6XHygBcaYPeMKB8m3RXzapRkRELZ_Jhc9"
                    alt="Leo - Commoner Prodigy"
                    className="sovereign-avatar-img"
                  />
                  <div className="avatar-badge-bottom">1st-Ranker</div>
                </div>

                <div className="sovereign-info">
                  <div className="sovereign-title-row">
                    <h2 className="sovereign-name">LEO</h2>
                    <span className="prodigy-badge">Commoner Prodigy</span>
                  </div>
                  <div className="sovereign-academy">
                    Aurelius Beast Academy • Outer Sector 09 Bastion
                  </div>
                  <div className="anomaly-pill">
                    Dual Soul Anomaly: Mortal [{mortalSoulRank}] + Primordial [Mythical 7]
                  </div>
                </div>
              </div>

              {/* 5 Canonical Parameters */}
              <div className="parameters-section">
                <div className="parameters-header">
                  <span>Canonical Parameters (Ch. {currentChapter})</span>
                  <span className="highlight">100% Stat Sharing (0 Mana Upkeep)</span>
                </div>
                <div className="params-grid-5">
                  <div className="param-card">
                    <div className="param-label">VIT</div>
                    <div className="param-value">{vit}</div>
                  </div>
                  <div className="param-card">
                    <div className="param-label">STR</div>
                    <div className="param-value">{str}</div>
                  </div>
                  <div className="param-card param-agi">
                    <div className="param-label">AGI</div>
                    <div className="param-value">{agi}</div>
                  </div>
                  <div className="param-card">
                    <div className="param-label">STA</div>
                    <div className="param-value">{sta}</div>
                  </div>
                  <div className="param-card param-int">
                    <div className="param-label">INT</div>
                    <div className="param-value">{intVal}</div>
                  </div>
                </div>
              </div>

              {/* Mana Gauge & Soft Cap Limiter */}
              <div className="gauges-grid">
                <div className="gauge-item">
                  <div className="gauge-label-row">
                    <span className="label">MAX MANA</span>
                    <span className="val-mana">
                      {maxMana.toLocaleString()}{' '}
                      <span className="gauge-sub">(INT {intVal}×10×{multiplier})</span>
                    </span>
                  </div>
                  <div className="gauge-track">
                    <div className="gauge-fill-mana" />
                  </div>
                </div>
                <div className="gauge-item">
                  <div className="gauge-label-row">
                    <span className="label">SOFT CAP LIMITER</span>
                    <span className="val-softcap">
                      {softCap} <span className="gauge-sub">(Mortal Soul Cap)</span>
                    </span>
                  </div>
                  <div className="gauge-track">
                    <div className="gauge-fill-softcap" style={{ width: softCap }} />
                  </div>
                </div>
              </div>
            </section>

            {/* Active Companion Beasts in Dominion Sanctuary */}
            <div className="companions-header-row">
              <div className="companions-title-group">
                <span className="material-symbols-outlined companions-icon">pets</span>
                <h3 className="companions-title">
                  Active Contracted Companions ({LOCAL_BEASTS.filter((b) => b.contractChapter <= currentChapter).length})
                </h3>
              </div>
              <span className="companions-hint">
                Tap card for Evolution Milestones
              </span>
            </div>

            <div className="companions-grid">
              {LOCAL_BEASTS.map((beast) => {
                const snapshot = getBeastSnapshotAtChapter(beast, currentChapter);
                const isUnlocked = snapshot.isUnlocked;
                const m = snapshot.currentMilestone;

                if (!isUnlocked) {
                  return (
                    <article key={beast.id} className="companion-card locked">
                      <div className="companion-top-row">
                        <div>
                          <h4 className="companion-name">🔒 Locked Companion</h4>
                          <span className="companion-species">Contracted in Chapter {beast.contractChapter}</span>
                        </div>
                        <span className="badge-tag">Locked</span>
                      </div>
                      <p className="codex-lore">
                        Advance chapter scrubber to Ch. {beast.contractChapter}+ to unlock this companion without spoilers.
                      </p>
                    </article>
                  );
                }

                return (
                  <article
                    key={beast.id}
                    onClick={() => setSelectedBeast(beast)}
                    className="companion-card"
                  >
                    <div className="companion-top-row">
                      <div>
                        <h4 className="companion-name">{beast.name}</h4>
                        <span className="companion-species">{beast.species}</span>
                      </div>
                      <span className="rank-badge">
                        ★ {m?.starRank} ({m?.subRank})
                      </span>
                    </div>

                    {/* Badge Strip */}
                    <div className="badge-strip">
                      <span className="badge-tag error">
                        {m?.bloodlineTier} ({m?.bloodlinePurity}%)
                      </span>
                      <span className="badge-tag tertiary">
                        {m?.cognitionStage} (IQ {m?.iq ?? '—'})
                      </span>
                      <span className="badge-tag secondary">
                        {m?.bondStage} bond ({m?.bondPercentage}%)
                      </span>
                    </div>

                    {/* Progress Bars */}
                    <div className="bond-progress-block">
                      <div className="bond-labels">
                        <span>Bond Synchronization:</span>
                        <strong>{m?.bondPercentage}%</strong>
                      </div>
                      <div className="bond-bar-track">
                        <div
                          className="bond-bar-fill"
                          style={{ width: `${m?.bondPercentage || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Unlocked Abilities */}
                    <div className="skills-strip">
                      <div className="skills-label">
                        Active Skills (Ch. {currentChapter}):
                      </div>
                      <div className="skill-pills-row">
                        {m?.unlockedSkillIds && m.unlockedSkillIds.length > 0 ? (
                          m.unlockedSkillIds.map((sk) => (
                            <span key={sk} className="skill-pill">
                              {sk.replace(/_/g, ' ')}
                            </span>
                          ))
                        ) : (
                          <span className="companion-species">None</span>
                        )}
                      </div>
                    </div>

                    {m?.sharedTraits && m.sharedTraits.length > 0 && (
                      <div className="trait-highlight">
                        ✨ Shared Trait: {m.sharedTraits[0].name}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: BEAST CODEX */}
        {activeTab === 'codex' && (
          <div className="tab-container">
            {/* Search Input */}
            <div className="search-wrapper">
              <span className="material-symbols-outlined search-icon">explore</span>
              <input
                type="text"
                placeholder="Search beast, bloodline tier, affinity, or trait..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Affinity Filter Chips */}
            <div className="chips-slider no-scrollbar">
              {['all', 'shadow', 'fire', 'water', 'earth', 'nature', 'wind', 'draconic'].map((aff) => (
                <button
                  key={aff}
                  onClick={() => setSelectedAffinity(aff)}
                  className={`affinity-chip ${selectedAffinity === aff ? 'active' : ''}`}
                >
                  {aff === 'all' ? 'All Beasts' : aff}
                </button>
              ))}
            </div>

            {/* Canon Bloodline Hierarchy Reference Banner */}
            <section className="reference-banner">
              <div className="ref-top-row">
                <div className="ref-title-group">
                  <span className="material-symbols-outlined ref-title">schema</span>
                  <span className="ref-title">Canon Bloodline Hierarchy Reference</span>
                </div>
                <span className="ref-sub">Ceiling Limits</span>
              </div>
              <div className="tiers-grid-6">
                <div className="tier-box">
                  <div className="tier-box-name">Ordinary</div>
                  <div className="tier-box-cap">Max 2★</div>
                </div>
                <div className="tier-box">
                  <div className="tier-box-name">Mortal</div>
                  <div className="tier-box-cap">Max 3–4★</div>
                </div>
                <div className="tier-box">
                  <div className="tier-box-name" style={{ color: 'var(--secondary)' }}>Super</div>
                  <div className="tier-box-cap" style={{ color: 'var(--secondary)' }}>Max 5–6★</div>
                </div>
                <div className="tier-box">
                  <div className="tier-box-name" style={{ color: 'var(--tertiary)' }}>Noble</div>
                  <div className="tier-box-cap" style={{ color: 'var(--tertiary)' }}>Max 7★</div>
                </div>
                <div className="tier-box">
                  <div className="tier-box-name" style={{ color: 'var(--primary)' }}>Royal</div>
                  <div className="tier-box-cap" style={{ color: 'var(--primary)' }}>Max 8★</div>
                </div>
                <div className="tier-box divine">
                  <div className="tier-box-name" style={{ color: 'var(--primary)' }}>Divine</div>
                  <div className="tier-box-cap" style={{ color: 'var(--primary)' }}>9–10★ God</div>
                </div>
              </div>
            </section>

            {/* Cognition & Soul Bond Stages Indicator */}
            <section className="cognition-card">
              <div className="ref-top-row">
                <div className="ref-title-group">
                  <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)' }}>psychology</span>
                  <span className="ref-title" style={{ color: 'var(--tertiary)' }}>Cognition & Soul Bond Stages</span>
                </div>
                <span className="ref-sub" style={{ color: 'var(--tertiary)' }}>Stage {phase} Active</span>
              </div>
              <div className="cognition-grid-5">
                <div className={`cognition-step ${phase === 1 ? 'active' : ''}`} style={{ opacity: phase >= 1 ? 1 : 0.4 }}>
                  <div className="cognition-step-title">1. Feral</div>
                  <div className="cognition-step-desc">Instinct</div>
                </div>
                <div className={`cognition-step ${phase === 2 ? 'active' : ''}`} style={{ opacity: phase >= 2 ? 1 : 0.4 }}>
                  <div className="cognition-step-title">2. Juvenile</div>
                  <div className="cognition-step-desc">No Skill Copy</div>
                </div>
                <div className={`cognition-step ${phase === 3 ? 'active' : ''}`} style={{ opacity: phase >= 3 ? 1 : 0.4 }}>
                  <div className="cognition-step-title" style={{ color: 'var(--primary)' }}>3. Adolescent</div>
                  <div className="cognition-step-desc" style={{ color: 'var(--primary)' }}>IQ 100+ Extract</div>
                </div>
                <div className={`cognition-step ${phase === 4 ? 'active' : ''}`} style={{ opacity: phase >= 4 ? 1 : 0.4 }}>
                  <div className="cognition-step-title">4. Mature</div>
                  <div className="cognition-step-desc">Language</div>
                </div>
                <div className="cognition-step" style={{ opacity: 0.4 }}>
                  <div className="cognition-step-title">5. Transcendent</div>
                  <div className="cognition-step-desc">Resonance</div>
                </div>
              </div>
            </section>

            {/* Filtered Beasts Grid */}
            <div className="companions-grid">
              {filteredBeasts.map((beast) => {
                const snapshot = getBeastSnapshotAtChapter(beast, currentChapter);
                const m = snapshot.currentMilestone;
                return (
                  <article
                    key={beast.id}
                    onClick={() => setSelectedBeast(beast)}
                    className="companion-card"
                  >
                    <div className="companion-top-row">
                      <div>
                        <h4 className="companion-name">{beast.name}</h4>
                        <span className="companion-species">{beast.species}</span>
                      </div>
                      <span className="rank-badge">
                        ★ {m?.starRank || 1} ({m?.subRank || 'low'})
                      </span>
                    </div>
                    <div className="badge-strip">
                      {beast.elementAffinity.map((el) => (
                        <span key={el} className="badge-tag secondary">
                          {el}
                        </span>
                      ))}
                    </div>
                    <p className="codex-lore">
                      {beast.lore || `${beast.name} is a canonical companion within the Dominion.`}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PACT MASTER DOSSIER */}
        {activeTab === 'dossier' && (
          <div className="tab-container">
            {/* Protagonist Selector Tabs */}
            <div className="ref-top-row">
              <div className="dossier-segmented-control">
                <button
                  onClick={() => setSelectedProtagonist('leo')}
                  className={`seg-btn ${selectedProtagonist === 'leo' ? 'active' : ''}`}
                >
                  Leo (Active Sovereign)
                </button>
                <button
                  onClick={() => setSelectedProtagonist('lily')}
                  className={`seg-btn ${selectedProtagonist === 'lily' ? 'active' : ''}`}
                >
                  Lily (Partner)
                </button>
              </div>
              <span className="sovereign-academy" style={{ color: 'var(--primary)', fontWeight: 800 }}>
                CANON DOSSIER
              </span>
            </div>

            {selectedProtagonist === 'leo' ? (
              <section className="dossier-hero-card">
                {/* Hero Backdrop Portrait */}
                <div className="dossier-banner-wrap">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhbJyCncrv7U9rwD_bzdBowfebOUEEVhtRlkVJs6XnJzHABIcsiotVj-74mpu8PQGMdvIVUpH-x25us6ClONL7hFLMihMvJ8l4NX7-lX3yHQ41F-9BEQrsDFqA-G05GSnqknRYY5pqf623mj8HzIIiMhs9f6QRqP74XMhqTbZbESpzjGpx2ROakrEvOBYIN1gH3d_3lNITriFEh8XEgqM6XHygBcaYPeMKB8m3RXzapRkRELZ_Jhc9"
                    alt="Leo Portrait"
                    className="dossier-banner-img"
                  />
                  <div className="dossier-banner-scrim" />
                  <div className="dossier-banner-content">
                    <div>
                      <h2 className="dossier-hero-name">LEO</h2>
                      <span className="dossier-hero-rank">
                        Pact Master • Aurelius 1st-Ranker
                      </span>
                    </div>
                    <div>
                      <div className="dossier-hero-mult">Multiplier ×{multiplier}</div>
                      <div className="sovereign-academy" style={{ color: 'var(--secondary)' }}>
                        Dual Soul Anomaly
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dual Soul Anomaly Breakdown */}
                <div className="dossier-body">
                  <h3 className="dossier-section-heading">Dual Soul Anomaly Core</h3>
                  <div className="anomaly-cards-grid">
                    <div className="anomaly-box">
                      <div className="anomaly-box-top">
                        <span style={{ color: 'var(--on-surface-variant)' }}>Mortal Soul</span>
                        <span style={{ color: 'var(--secondary)' }}>[{mortalSoulRank}]</span>
                      </div>
                      <div className="anomaly-box-val">Value {phase}</div>
                      <div className="anomaly-box-desc">Innate Core</div>
                    </div>
                    <div className="anomaly-box primordial">
                      <div className="anomaly-box-top">
                        <span style={{ color: 'var(--primary)' }}>Primordial Soul</span>
                        <span style={{ color: 'var(--primary)' }}>[Mythical]</span>
                      </div>
                      <div className="anomaly-box-val" style={{ color: 'var(--primary)' }}>Value 7</div>
                      <div className="anomaly-box-desc">Ancient Fusion</div>
                    </div>
                  </div>

                  {/* Innate Talents */}
                  <h3 className="dossier-section-heading">Innate Talents</h3>
                  <div className="talents-column">
                    <div className="talent-item">
                      <div className="talent-left">
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>pets</span>
                        <span className="talent-title">Primordial Beast Taming</span>
                      </div>
                      <span className="talent-rating">10★ Mythical</span>
                    </div>
                    <div className="talent-item unique">
                      <div className="talent-left">
                        <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>menu_book</span>
                        <span className="talent-title">Bestiary of Souls</span>
                      </div>
                      <span className="talent-rating">6★ Unique</span>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              /* Lily Dossier */
              <section className="sovereign-card">
                <h2 className="sovereign-name" style={{ color: 'var(--secondary)' }}>LILY AURELIUS</h2>
                <div className="sovereign-academy" style={{ marginBottom: '1rem' }}>
                  Scion of House Aurelius • Soulmate Bond Partner
                </div>
                <p className="codex-lore" style={{ color: 'var(--on-surface)' }}>
                  Possesses bidirectional soulmate mana transfer with Leo. Endowed with the Super Rare soul core and Radiant Light affinity.
                </p>
                <div className="badge-strip" style={{ marginTop: '1.25rem' }}>
                  <span className="badge-tag secondary">Affinity: Light / Life</span>
                  <span className="badge-tag tertiary">Soul Rank: Super Rare (Value 4)</span>
                </div>
              </section>
            )}
          </div>
        )}

        {/* TAB 4: REALM ARCHIVE */}
        {activeTab === 'realm' && (
          <div className="tab-container">
            {/* Secret Realm Gate (Chronos Dimensional Rift) */}
            <section className="realm-gate-card">
              <div className="gate-image-wrap">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQekvuB6d1tDk2z0B8lMealeK-i4dVX0a5BtqgtgzpMfV4mvyoFKJnz1SWtqIBd_yz5fSPo77dMVANW6hIlDLuuHVs_iKb6B5ZjVBQIASwJvM77A5WsVYEjbbZBJaZV-eWkWIx4nlsaIMFQjMQ4ggDUCHOdy1Il72cAzGl_yG13Xkz5ZTXPpYU2jig7wTPaEhT1S0FTXCrT7Z259BjaydIioPQiJdmkMDxFBBTbAR4RYQS_kKVBik7"
                  alt="Purple Spatial Vortex"
                  className="gate-img"
                />
                <div className="gate-scrim" />
                <div className="vortex-tag">🌀 Purple Spatial Vortex</div>
                <div className="gate-banner-bottom">
                  <div>
                    <div className="gate-eyebrow">Pocket Dimension Aperture</div>
                    <h3 className="gate-heading">Dimensional Rift of Chronos</h3>
                  </div>
                  <span className="gate-canon-pill">Canon: Ch 98–104</span>
                </div>
              </div>

              {/* Exact Mechanics Rule Box */}
              <div className="gate-body">
                <div className="temporal-rule-card">
                  <div className="temporal-header">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>timelapse</span>
                    <span>Exact Temporal Synchronization Rule</span>
                  </div>
                  <p className="temporal-desc">
                    The Secret Realm Gate <strong style={{ color: 'var(--primary)' }}>only opens when pocket dimension time flow synchronizes with the outside world</strong>. Spatial aperture stabilizes strictly at <strong style={{ color: 'var(--secondary)' }}>7:00 PM (19:00) Purple Spatial Vortex Alignment</strong>. Unsynchronized entry attempts trigger violent dimensional sheer and soul core collapse.
                  </p>
                </div>

                <div className="gate-meta-grid">
                  <div className="gate-meta-box">
                    <div className="gate-meta-label">Alignment Window</div>
                    <div className="gate-meta-val">19:00 - 21:00 CST Daily</div>
                  </div>
                  <div className="gate-meta-box">
                    <div className="gate-meta-label">Resonance Output</div>
                    <div className="gate-meta-val" style={{ color: 'var(--tertiary)' }}>High-Purple Chrono Stones</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hunter Guild Wild Danger Tiers */}
            <section className="danger-section">
              <div className="danger-header-row">
                <h3 className="danger-title">Hunter Guild Wild Danger Tiers (5 Classes)</h3>
                <span className="ref-sub">Codex Standard</span>
              </div>

              {/* Safe Zones */}
              <div className="danger-card safe">
                <div className="danger-card-top">
                  <strong className="danger-card-name">Safe Zones</strong>
                  <span className="danger-tag" style={{ color: '#38bdf8' }}>Zero Calamity</span>
                </div>
                <p className="danger-desc">
                  Fortified city perimeters, Imperial capital wards, and Academy main grounds protected by Imperial patrol knights and soul barrier spires.
                </p>
              </div>

              {/* Green Zones */}
              <div className="danger-card green">
                <div className="danger-card-top">
                  <strong className="danger-card-name">Green Zones</strong>
                  <span className="danger-tag" style={{ color: '#10b981' }}>Low 1★ to Mid 1★</span>
                </div>
                <p className="danger-desc">
                  Novice grounds and frontier outskirts. Docile to low-aggression beasts; ideal for fresh student sparring and juvenile herbivore taming expeditions.
                </p>
              </div>

              {/* Yellow Zones */}
              <div className="danger-card yellow">
                <div className="danger-card-top">
                  <strong className="danger-card-name">Yellow Zones</strong>
                  <span className="danger-tag" style={{ color: '#f59e0b' }}>High 1★ to Low 2★</span>
                </div>
                <p className="danger-desc">
                  Wild forest belts and mineral ridges. Packs of ravenous predators like shadow-panthers and direwolves.
                </p>
              </div>

              {/* Orange Zones */}
              <div className="danger-card orange">
                <div className="danger-card-top">
                  <strong className="danger-card-name">Orange Zones</strong>
                  <span className="danger-tag" style={{ color: '#f97316' }}>Mid 2★ to High 2★</span>
                </div>
                <p className="danger-desc">
                  Sub-calamity hazard regions. Elite beast packs with rudimentary bloodline awakenings. High mortality rate.
                </p>
              </div>

              {/* Red Calamity Zones */}
              <div className="danger-card red">
                <div className="danger-card-top">
                  <strong className="danger-card-name">Red Calamity Zones</strong>
                  <span className="danger-tag" style={{ color: '#ef4444' }}>Peak 2★ to 3★+ Apex</span>
                </div>
                <p className="danger-desc">
                  Sovereign forbidden ground. Ancient abyssal wyverns and primordial entity nests. Requires Grandmaster Tamer battalions.
                </p>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* 3. PERSISTENT BOTTOM TAB NAVIGATION BAR (MOBILE-FIRST) */}
      <nav className="bottom-nav pb-safe" aria-label="Bottom Navigation">
        <div className="bottom-nav-inner">
          <button
            onClick={() => setActiveTab('sanctuary')}
            className={`nav-item ${activeTab === 'sanctuary' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined">all_inclusive</span>
            <span>Sanctuary</span>
          </button>

          <button
            onClick={() => setActiveTab('codex')}
            className={`nav-item ${activeTab === 'codex' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined">menu_book</span>
            <span>Codex</span>
          </button>

          <button
            onClick={() => setActiveTab('dossier')}
            className={`nav-item ${activeTab === 'dossier' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined">shield_person</span>
            <span>Dossier</span>
          </button>

          <button
            onClick={() => setActiveTab('realm')}
            className={`nav-item ${activeTab === 'realm' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined">explore</span>
            <span>Realm</span>
          </button>
        </div>
      </nav>

      {/* 4. BEAST EVOLUTION MODAL */}
      {selectedBeast && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedBeast(null)}
          className="modal-overlay"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-sheet"
          >
            <div className="modal-header">
              <div>
                <h3 className="modal-title">{selectedBeast.name}</h3>
                <span className="modal-species">{selectedBeast.species}</span>
              </div>
              <button
                onClick={() => setSelectedBeast(null)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-meta-row">
              Contract Chapter: <strong>Chapter {selectedBeast.contractChapter}</strong> • Element:{' '}
              <strong>{selectedBeast.elementAffinity.join(', ')}</strong>
            </div>

            <h4 className="modal-section-title">
              Canonical Evolutionary Milestones ({selectedBeast.milestones.length} Stages)
            </h4>

            <div className="milestones-list">
              {selectedBeast.milestones.map((m, idx) => (
                <div key={idx} className="milestone-item">
                  <div className="milestone-top">
                    <span className="ch-range">
                      Chapters {m.minChapter} – {m.maxChapter ? m.maxChapter : 'Ongoing'}
                    </span>
                    <span className="star-rank">
                      ★ {m.starRank} ({m.subRank})
                    </span>
                  </div>
                  <div className="milestone-details">
                    Bloodline: <strong>{m.bloodlineTier} ({m.bloodlinePurity}%)</strong> • Cognition:{' '}
                    <strong>{m.cognitionStage}</strong> (IQ {m.iq ?? '—'})
                  </div>
                  <div className="milestone-bond-text">
                    Bond: {m.bondStage.toUpperCase()} ({m.bondPercentage}%)
                  </div>
                  {m.sharedTraits && m.sharedTraits.length > 0 && (
                    <div className="milestone-trait-text">
                      ✨ Shared Trait: {m.sharedTraits[0].name} — {m.sharedTraits[0].effect}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setSelectedBeast(null)}
                className="modal-primary-btn"
              >
                Close Codex Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
