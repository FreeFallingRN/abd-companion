'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LOCAL_BEASTS,
  LOCAL_CHARACTERS,
  LOCAL_ACADEMIES,
  LOCAL_DANGER_ZONES,
  LOCAL_SKILLS,
  LOCAL_CHAPTERS,
  getBeastSnapshotAtChapter,
  BeastRecord,
  CharacterRecord,
  fetchAllBeasts,
  fetchAllCharacters,
} from '@/sanity/lib/dataService';
import { urlForImage } from '@/sanity/lib/image';

export default function HomePage() {
  // Start strictly from Chapter 1 as requested
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'sanctuary' | 'codex' | 'dossier' | 'realm'>('sanctuary');
  const [selectedProtagonist, setSelectedProtagonist] = useState<'leo' | 'lily'>('leo');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAffinity, setSelectedAffinity] = useState<string>('all');
  const [selectedBeast, setSelectedBeast] = useState<BeastRecord | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  // Live Sanity datasets (with local fallback)
  const [beastsList, setBeastsList] = useState<BeastRecord[]>(LOCAL_BEASTS);
  const [charactersList, setCharactersList] = useState<CharacterRecord[]>(LOCAL_CHARACTERS);

  // Sync live Sanity dataset (enables Sanity Studio image uploads & edits to appear live)
  useEffect(() => {
    fetchAllBeasts().then((data) => {
      if (data && data.length > 0) setBeastsList(data);
    });
    fetchAllCharacters().then((data) => {
      if (data && data.length > 0) setCharactersList(data);
    });
  }, []);

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

  // Chapter title lookup and cleaning
  const currentChapterTitle =
    (LOCAL_CHAPTERS as Record<string, string>)[currentChapter] || `Chapter ${currentChapter}`;
  const cleanChapterTitle = (raw: string) => {
    return raw.replace(/^CH\.\d+\s*[-:]?\s*/i, '').trim();
  };

  // Canonical Mortal Soul rank progression
  const getMortalSoulInfo = (ch: number) => {
    if (ch < 40) return { name: 'Common', rank: 1 };
    if (ch < 105) return { name: 'Uncommon', rank: 2 };
    if (ch < 385) return { name: 'Rare', rank: 3 };
    return { name: 'Super Rare', rank: 4 };
  };

  const mortalSoul = getMortalSoulInfo(currentChapter);
  const primordialSoul = { name: 'Mythical', rank: 7 };
  const totalSoulRank = mortalSoul.rank + primordialSoul.rank;

  // Dynamic attributes for Leo according to novel canon
  const getLeoStats = (ch: number) => {
    if (ch < 8) {
      // Kendru Awakening (before contracting Shyra)
      return { vit: 2.5, str: 3.0, agi: 3.0, sta: 4.0, intVal: 1.0 };
    }
    if (ch < 40) {
      // Kendru Frontline with Shyra (100% stat sharing)
      return { vit: 3.0, str: 5.1, agi: 10.6, sta: 4.0, intVal: 1.0 };
    }
    if (ch < 105) {
      // Academy Trials & Spiritual Island (Uncommon Soul 2)
      return { vit: 15, str: 18, agi: 22, sta: 16, intVal: 10 };
    }
    if (ch < 385) {
      // Storm Advancement to Rare Soul (Ch 105: Int ~191) through Fief War
      return { vit: 38, str: 42, agi: 45, sta: 40, intVal: 25 };
    }
    if (ch < 535) {
      // Elasian Bloom Mastery (Ch 167/385 updates)
      return { vit: 758, str: 758, agi: 623, sta: 759, intVal: 1086 };
    }
    // Secret Realm Wyvern & Beyond
    return { vit: 1170, str: 1170, agi: 960, sta: 1150, intVal: 1850 };
  };

  const { vit, str, agi, sta, intVal } = getLeoStats(currentChapter);
  // Canonical Mana Formula: INT × Total Soul Rank × 10
  const maxMana = Math.round(intVal * totalSoulRank * 10);

  // Character portraits from Sanity (with fallback artwork)
  const leoChar = charactersList.find((c) => c.id === 'leo');
  const lilyChar = charactersList.find((c) => c.id === 'lily');
  const leoAvatarUrl = (leoChar?.portrait && urlForImage(leoChar.portrait)) || "https://lh3.googleusercontent.com/aida-public/AB6AXuBhbJyCncrv7U9rwD_bzdBowfebOUEEVhtRlkVJs6XnJzHABIcsiotVj-74mpu8PQGMdvIVUpH-x25us6ClONL7hFLMihMvJ8l4NX7-lX3yHQ41F-9BEQrsDFqA-G05GSnqknRYY5pqf623mj8HzIIiMhs9f6QRqP74XMhqTbZbESpzjGpx2ROakrEvOBYIN1gH3d_3lNITriFEh8XEgqM6XHygBcaYPeMKB8m3RXzapRkRELZ_Jhc9";
  const lilyAvatarUrl = (lilyChar?.portrait && urlForImage(lilyChar.portrait)) || null;

  // Filter beasts for Codex view
  const filteredBeasts = beastsList.filter((b) => {
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

  const activeContractedBeasts = beastsList.filter((b) => b.contractChapter <= currentChapter);

  return (
    <div className="app-shell">
      {/* 1. FIXED TOP APP HEADER */}
      <header className="app-header pt-safe">
        <div className="header-container">
          <div className="header-brand">
            <div className="brand-logo-frame">
              <img
                src="/shyra-logo.png"
                alt="Shyra - Beast Dominion"
                className="brand-logo-img"
              />
            </div>
            <div className="brand-text-col">
              <div className="brand-title-row">
                <span className="brand-title">BEAST DOMINION</span>
              </div>
              <span className="brand-subtitle">
                {activeTab === 'sanctuary' && `Dominion Sanctuary • Ch. ${currentChapter}`}
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
        
        {/* CHAPTER NAVIGATOR */}
        <section className="chapter-nav-card" aria-label="Chapter Navigator">
          <div className="chapter-nav-top">
            <div className="chapter-info-col">
              <span className="chapter-badge">Current Chapter</span>
              <h2 className="chapter-title-display">
                Chapter {currentChapter}:{' '}
                <span className="chapter-subtitle-text">
                  {cleanChapterTitle(currentChapterTitle)}
                </span>
              </h2>
            </div>

            <div className="chapter-quick-inputs">
              <button
                type="button"
                className="chapter-step-btn"
                onClick={() => setCurrentChapter((prev) => Math.max(1, prev - 10))}
                title="Jump back 10 chapters"
              >
                -10
              </button>
              <button
                type="button"
                className="chapter-step-btn"
                onClick={() => setCurrentChapter((prev) => Math.max(1, prev - 1))}
                title="Previous chapter"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              <div className="chapter-input-wrap">
                <input
                  id="chapter-direct-input"
                  type="number"
                  min={1}
                  max={727}
                  value={currentChapter}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      setCurrentChapter(Math.min(727, Math.max(1, val)));
                    }
                  }}
                  className="chapter-number-input"
                  aria-label="Chapter number input"
                />
                <span className="chapter-total-label">/ 727</span>
              </div>

              <button
                type="button"
                className="chapter-step-btn"
                onClick={() => setCurrentChapter((prev) => Math.min(727, prev + 1))}
                title="Next chapter"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              <button
                type="button"
                className="chapter-step-btn"
                onClick={() => setCurrentChapter((prev) => Math.min(727, prev + 10))}
                title="Jump forward 10 chapters"
              >
                +10
              </button>
            </div>
          </div>

          {/* Interactive Chapter Range Slider */}
          <div className="scrubber-group">
            <input
              type="range"
              min={1}
              max={727}
              value={currentChapter}
              onChange={(e) => setCurrentChapter(Number(e.target.value))}
              id="chapter-scrubber"
              aria-label="Chapter Scrubber"
              className="chapter-range-slider"
            />
          </div>
        </section>

        {/* TAB 1: DOMINION SANCTUARY */}
        {activeTab === 'sanctuary' && (
          <div className="tab-container">
            {/* Sovereign Dominion Identity Card (Leo) */}
            <section className="sovereign-card">
              <div className="sovereign-profile-row">
                {/* Sovereign Avatar with Full-View Lightbox Click */}
                <div
                  className="sovereign-avatar-wrap"
                  onClick={() =>
                    setSelectedImage({
                      url: leoAvatarUrl,
                      title: 'Leonel (Leo)',
                      subtitle: `${currentChapter < 26 ? 'Kendru Frontline' : 'Aurelius Beast Academy'} • Commoner Prodigy`,
                    })
                  }
                  title="Click to view full image"
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={leoAvatarUrl}
                    alt="Leo - Commoner Prodigy"
                    className="sovereign-avatar-img"
                  />
                  <span className="avatar-zoom-hint material-symbols-outlined">zoom_in</span>
                  <div className="avatar-badge-bottom">1st-Ranker</div>
                </div>

                <div className="sovereign-info">
                  <div className="sovereign-title-row">
                    <h2 className="sovereign-name">LEO</h2>
                    <span className="prodigy-badge">Commoner Prodigy</span>
                  </div>
                  <div className="sovereign-academy">
                    {currentChapter < 26
                      ? 'Kendru Outskirts Frontline • Soldier Transmigration'
                      : 'Aurelius Beast Academy • Outer Sector 09 Bastion'}
                  </div>
                  <div className="anomaly-pill">
                    Dual Soul Anomaly: Mortal [{mortalSoul.name} {mortalSoul.rank}] + Primordial [Mythical 7] • Combined Soul Rank {totalSoulRank}
                  </div>
                </div>
              </div>

              {/* 5 Canonical Parameters */}
              <div className="parameters-section">
                <div className="parameters-header">
                  <span>Canonical Parameters (Ch. {currentChapter})</span>
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

              {/* Canonical Mana Capacity Gauge */}
              <div className="gauges-grid">
                <div className="gauge-item" style={{ gridColumn: '1 / -1' }}>
                  <div className="gauge-label-row">
                    <span className="label">MAX MANA</span>
                    <span className="val-mana">
                      {maxMana.toLocaleString()}{' '}
                      <span className="gauge-sub">
                        (INT {intVal} × Soul Rank {totalSoulRank} × 10)
                      </span>
                    </span>
                  </div>
                  <div className="gauge-track">
                    <div className="gauge-fill-mana" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </section>

            {/* Active Companion Beasts in Dominion Sanctuary */}
            <div className="companions-header-row">
              <div className="companions-title-group">
                <span className="material-symbols-outlined companions-icon">pets</span>
                <h3 className="companions-title">
                  Active Contracted Companions ({activeContractedBeasts.length})
                </h3>
              </div>
              <span className="companions-hint">
                Tap card for Evolution Milestones
              </span>
            </div>

            {/* Chapter 1 Awakening State: When 0 beasts are contracted yet */}
            {activeContractedBeasts.length === 0 && (
              <div style={{ background: 'var(--surface-container-low)', border: '1px dashed var(--outline-variant)', borderRadius: '14px', padding: '1.5rem', textAlign: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--primary)', marginBottom: '8px' }}>explore</span>
                <h4 className="font-cinzel" style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: 800 }}>Kendru Outskirts — Chapter 1 Awakening</h4>
                <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)', marginTop: '4px', maxWidth: '520px', margin: '4px auto 0 auto', lineHeight: 1.6 }}>
                  Leonel has just awakened in the frontline trench after transmigrating from Earth. He has received Beast God Sanguor's Primordial Soul, but has not yet contracted any beasts.
                </p>
                <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--secondary)', fontWeight: 700 }}>
                  ⏩ Advance the chapter scrubber to Chapter 8 to discover and contract his first companion, Shyra the Obsidian Panther!
                </div>
              </div>
            )}

            <div className="companions-grid">
              {beastsList.map((beast) => {
                const snapshot = getBeastSnapshotAtChapter(beast, currentChapter);
                const isUnlocked = snapshot.isUnlocked;
                const m = snapshot.currentMilestone;
                const beastImg = (beast.portrait && urlForImage(beast.portrait)) || beast.imageUrl;

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
                        Contracted in Chapter {beast.contractChapter}. Advance chapter to {beast.contractChapter} to reveal details.
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {beastImg && (
                          <div
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              border: '1.5px solid var(--primary)',
                              flexShrink: 0,
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage({
                                url: beastImg,
                                title: beast.name,
                                subtitle: `${beast.species} • Contract Ch. ${beast.contractChapter}`,
                              });
                            }}
                            title="Click to view full image"
                          >
                            <img
                              src={beastImg}
                              alt={beast.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="companion-name">{beast.name}</h4>
                          <span className="companion-species">{beast.species}</span>
                        </div>
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
              {['all', 'shadow', 'darkness', 'fire', 'water', 'earth', 'nature', 'life', 'draconic'].map((aff) => (
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

            {/* Cognition & Soul Bond Stages Reference Banner */}
            <section className="cognition-card">
              <div className="ref-top-row">
                <div className="ref-title-group">
                  <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)' }}>psychology</span>
                  <span className="ref-title" style={{ color: 'var(--tertiary)' }}>Cognition & Intelligence Hierarchy</span>
                </div>
                <span className="ref-sub" style={{ color: 'var(--tertiary)' }}>Canon Progression</span>
              </div>
              <div className="cognition-grid-5">
                <div className="cognition-step active">
                  <div className="cognition-step-title">1. Feral</div>
                  <div className="cognition-step-desc">Instinct</div>
                </div>
                <div className="cognition-step active">
                  <div className="cognition-step-title">2. Juvenile</div>
                  <div className="cognition-step-desc">No Skill Copy</div>
                </div>
                <div className="cognition-step active">
                  <div className="cognition-step-title" style={{ color: 'var(--primary)' }}>3. Adolescent</div>
                  <div className="cognition-step-desc" style={{ color: 'var(--primary)' }}>IQ 100+ Extract</div>
                </div>
                <div className="cognition-step active">
                  <div className="cognition-step-title">4. Mature</div>
                  <div className="cognition-step-desc">Language</div>
                </div>
                <div className="cognition-step active">
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
                const beastImg = (beast.portrait && urlForImage(beast.portrait)) || beast.imageUrl;
                return (
                  <article
                    key={beast.id}
                    onClick={() => setSelectedBeast(beast)}
                    className="companion-card"
                  >
                    <div className="companion-top-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {beastImg && (
                          <div
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              border: '1.5px solid var(--primary)',
                              flexShrink: 0,
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage({
                                url: beastImg,
                                title: beast.name,
                                subtitle: `${beast.species} • Contract Ch. ${beast.contractChapter}`,
                              });
                            }}
                            title="Click to view full image"
                          >
                            <img
                              src={beastImg}
                              alt={beast.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="companion-name">{beast.name}</h4>
                          <span className="companion-species">{beast.species}</span>
                        </div>
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
                {/* Hero Backdrop Portrait (Supports Sanity Studio uploaded image) */}
                <div
                  className="dossier-banner-wrap"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setSelectedImage({
                      url: leoAvatarUrl,
                      title: 'Leonel (Leo)',
                      subtitle: 'Dual Soul Tamer • Aurelius 1st-Ranker',
                    })
                  }
                  title="Click to view full image"
                >
                  <img
                    src={leoAvatarUrl}
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
                      <div className="dossier-hero-mult">Total Soul Rank {totalSoulRank}</div>
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
                        <span style={{ color: 'var(--secondary)' }}>[{mortalSoul.name} {mortalSoul.rank}]</span>
                      </div>
                      <div className="anomaly-box-val">Value {mortalSoul.rank}</div>
                      <div className="anomaly-box-desc">Innate Core</div>
                    </div>
                    <div className="anomaly-box primordial">
                      <div className="anomaly-box-top">
                        <span style={{ color: 'var(--primary)' }}>Primordial Soul</span>
                        <span style={{ color: 'var(--primary)' }}>[Mythical]</span>
                      </div>
                      <div className="anomaly-box-val" style={{ color: 'var(--primary)' }}>Value 7</div>
                      <div className="anomaly-box-desc">Ancient Fusion (Sanguor)</div>
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
                      <span className="talent-rating">
                        {currentChapter >= 385
                          ? '8★ Unique'
                          : currentChapter >= 105
                          ? '7★ Unique'
                          : currentChapter >= 40
                          ? '6★ Unique'
                          : '5★ Unique'}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              /* Lily Dossier */
              <section className="sovereign-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1rem' }}>
                  {lilyAvatarUrl && (
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: '2px solid var(--secondary)',
                        flexShrink: 0,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                      onClick={() =>
                        setSelectedImage({
                          url: lilyAvatarUrl,
                          title: 'Lily Aurelius',
                          subtitle: 'Soulmate Bond Partner • Spirit Caller',
                        })
                      }
                      title="Click to view full image"
                    >
                      <img src={lilyAvatarUrl} alt="Lily Aurelius" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div>
                    <h2 className="sovereign-name" style={{ color: 'var(--secondary)' }}>LILY AURELIUS</h2>
                    <div className="sovereign-academy">
                      Scion of House Aurelius • Soulmate Bond Partner
                    </div>
                  </div>
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

            {/* Beast Artwork in Modal (Supports Sanity Studio uploaded images) */}
            {((selectedBeast.portrait && urlForImage(selectedBeast.portrait)) || selectedBeast.imageUrl) && (
              <div
                style={{
                  width: '100%',
                  height: '240px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  marginBottom: '1.25rem',
                  border: '1.5px solid var(--primary)',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                }}
                onClick={() => {
                  const imgUrl = (selectedBeast.portrait && urlForImage(selectedBeast.portrait)) || selectedBeast.imageUrl;
                  if (imgUrl) {
                    setSelectedImage({
                      url: imgUrl,
                      title: selectedBeast.name,
                      subtitle: `${selectedBeast.species} • Contract Chapter ${selectedBeast.contractChapter}`,
                    });
                  }
                }}
                title="Click to view full image"
              >
                <img
                  src={(selectedBeast.portrait && urlForImage(selectedBeast.portrait)) || selectedBeast.imageUrl}
                  alt={selectedBeast.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="avatar-zoom-hint material-symbols-outlined">zoom_in</span>
              </div>
            )}

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

      {/* Lightbox Modal for Full Image Viewing */}
      {selectedImage && (
        <div
          className="lightbox-backdrop"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-img-wrap">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="lightbox-img"
              />
            </div>
            <div className="lightbox-footer">
              <div className="lightbox-title-wrap">
                <h3 className="lightbox-title">{selectedImage.title}</h3>
                {selectedImage.subtitle && (
                  <span className="lightbox-sub">{selectedImage.subtitle}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="lightbox-close-btn"
                aria-label="Close image preview"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
