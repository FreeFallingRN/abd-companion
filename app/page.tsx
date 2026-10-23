'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LOCAL_BEASTS,
  LOCAL_CHARACTERS,
  LOCAL_ACADEMIES,
  LOCAL_DANGER_ZONES,
  getBeastSnapshotAtChapter,
  getCharacterSnapshotAtChapter,
  BeastRecord,
} from '@/sanity/lib/dataService';

export default function HomePage() {
  const [currentChapter, setCurrentChapter] = useState<number>(30);
  const [activeTab, setActiveTab] = useState<'sanctuary' | 'dossier' | 'realm'>('sanctuary');
  const [selectedBeast, setSelectedBeast] = useState<BeastRecord | null>(null);

  // Leo / Aurelius data
  const leo = LOCAL_CHARACTERS.find((c) => c.id === 'leo') || LOCAL_CHARACTERS[0];
  const leoSnapshot = getCharacterSnapshotAtChapter(leo, currentChapter);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Grimoire App Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="grimoire-icon">📖</div>
          <div className="brand-text">
            <h1>Absolute Beast Dominion</h1>
            <span>Codex & Sanctuary • Grimoire companion</span>
          </div>
        </div>

        <div className="header-actions">
          <Link href="/studio" className="btn-studio" id="studio-nav-btn" target="_blank">
            <span>⚡ Open Sanity Studio</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-content">
        {/* Author / Sanity Collaboration Banner */}
        <section className="sanity-banner" aria-label="CMS & Author Update Portal">
          <div className="sanity-banner-text">
            <strong>Author & Reader Update Frame:</strong> Powered by Sanity UI & Studio.
            Hooked up for 100% free Vercel deployment with 20 editor seats included!
          </div>
          <Link href="/studio" className="btn-studio" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
            Launch CMS Editor →
          </Link>
        </section>

        {/* Chapter-Locked Anti-Spoiler Scrubber */}
        <section className="scrubber-container" aria-label="Chapter Timeline Scrubber">
          <div className="scrubber-header">
            <div className="scrubber-title">
              <span>⏳ Active Reading Progress</span>
            </div>
            <div className="scrubber-badge" id="active-chapter-indicator">
              Chapter {currentChapter}
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={150}
            value={currentChapter}
            onChange={(e) => setCurrentChapter(Number(e.target.value))}
            className="slider-track"
            id="chapter-slider"
          />

          <div className="scrubber-ticks">
            <span>Ch. 1 (First Pact)</span>
            <span>Ch. 25 (Academy Arc)</span>
            <span>Ch. 70 (Blood Resonance)</span>
            <span>Ch. 120 (Obsidian Domain)</span>
            <span>Ch. 150 (Peak Breakthrough)</span>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="nav-tabs" aria-label="Section Navigation">
          <button
            id="tab-sanctuary"
            className={`tab-btn ${activeTab === 'sanctuary' ? 'active' : ''}`}
            onClick={() => setActiveTab('sanctuary')}
          >
            Dominion Sanctuary ({LOCAL_BEASTS.length} Beasts)
          </button>
          <button
            id="tab-dossier"
            className={`tab-btn ${activeTab === 'dossier' ? 'active' : ''}`}
            onClick={() => setActiveTab('dossier')}
          >
            Pact Master Dossier (Aurelius)
          </button>
          <button
            id="tab-realm"
            className={`tab-btn ${activeTab === 'realm' ? 'active' : ''}`}
            onClick={() => setActiveTab('realm')}
          >
            Realm & Danger Zones
          </button>
        </nav>

        {/* TAB 1: DOMINION SANCTUARY (BEAST CODEX) */}
        {activeTab === 'sanctuary' && (
          <section className="beast-grid" aria-label="Beast Sanctuary Grid">
            {LOCAL_BEASTS.map((beast) => {
              const snapshot = getBeastSnapshotAtChapter(beast, currentChapter);
              const isUnlocked = snapshot.isUnlocked;
              const milestone = snapshot.currentMilestone;

              if (!isUnlocked) {
                return (
                  <article key={beast.id} className="beast-card locked" id={`beast-card-${beast.id}`}>
                    <div className="card-top">
                      <div>
                        <h2 className="beast-name">🔒 Locked Entity</h2>
                        <span className="beast-species">Pact sealed until Chapter {beast.contractChapter}</span>
                      </div>
                      <div className="star-rank-badge" style={{ borderColor: 'var(--border-dim)', color: 'var(--text-muted)' }}>
                        ★ Locked
                      </div>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
                      Advance the chapter scrubber to Chapter {beast.contractChapter} or beyond to inspect this beast&apos;s
                      lineage, stats, and pact abilities without spoilers.
                    </p>
                  </article>
                );
              }

              return (
                <article
                  key={beast.id}
                  className="beast-card"
                  id={`beast-card-${beast.id}`}
                  onClick={() => setSelectedBeast(beast)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-top">
                    <div>
                      <h2 className="beast-name">{beast.name}</h2>
                      <span className="beast-species">{beast.species}</span>
                    </div>
                    <div className="star-rank-badge">
                      ★ {milestone?.starRank} ({milestone?.subRank})
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="badge-group">
                    <span className="badge-pill bloodline">
                      Tier: {milestone?.bloodlineTier}
                    </span>
                    <span className="badge-pill cognition">
                      IQ: {milestone?.cognitionStage} ({milestone?.iq ?? '—'})
                    </span>
                    <span className="badge-pill bond">
                      {milestone?.bondStage} bond
                    </span>
                  </div>

                  {/* Progress Meters */}
                  <div style={{ marginTop: '0.75rem' }}>
                    <div className="stat-row">
                      <span className="stat-label">Bloodline Purity:</span>
                      <span className="stat-value">{milestone?.bloodlinePurity}%</span>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar-fill crimson"
                        style={{ width: `${milestone?.bloodlinePurity || 0}%` }}
                      />
                    </div>

                    <div className="stat-row">
                      <span className="stat-label">Bond Sync Rate:</span>
                      <span className="stat-value">{milestone?.bondPercentage}%</span>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${milestone?.bondPercentage || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Active Skills at this chapter */}
                  <div className="skills-container">
                    <div className="skills-title">Unlocked Abilities (Ch. {currentChapter}):</div>
                    <div className="skill-tags">
                      {milestone?.unlockedSkillIds && milestone.unlockedSkillIds.length > 0 ? (
                        milestone.unlockedSkillIds.map((skillId) => (
                          <span key={skillId} className="skill-tag">
                            {skillId.replace(/_/g, ' ')}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>None unlocked</span>
                      )}
                    </div>
                  </div>

                  {/* Transferred Traits */}
                  {milestone?.sharedTraits && milestone.sharedTraits.length > 0 && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--gold-bright)' }}>
                      ✨ Shared Trait: {milestone.sharedTraits[0].name}
                    </div>
                  )}

                  <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '0.75rem', color: 'var(--purple-glow)' }}>
                    Click for Grimoire Evolution History →
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* TAB 2: PACT MASTER DOSSIER (AURELIUS / LEO) */}
        {activeTab === 'dossier' && (
          <section className="dossier-card" aria-label="Aurelius Character Dossier">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--gold-bright)' }}>{leo.name}</h2>
                <p style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginTop: '0.2rem' }}>{leo.title}</p>
              </div>
              <div className="star-rank-badge" style={{ fontSize: '0.85rem' }}>
                Soul Rank: {leoSnapshot.currentMilestone?.soulProfile?.mortalSoulRank.toUpperCase() ?? 'COMMON'} + PRIMORDIAL (8x Multiplier)
              </div>
            </div>

            <p style={{ color: 'var(--text-parchment)', margin: '1.25rem 0', fontSize: '0.92rem', lineHeight: 1.7 }}>
              Reincarnated Sovereign endowed with the <strong>Bestiary of Souls</strong>. Possesses dual soul cores
              allowing instantaneous beast diagnosis, resonance synthesis, and cross-species bloodline assimilation.
            </p>

            <div className="dossier-grid">
              <div className="dossier-stat-box">
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Tamer Level</div>
                <div className="dossier-stat-num">{leoSnapshot.currentMilestone?.level ?? 1}</div>
              </div>
              <div className="dossier-stat-box">
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Vitality</div>
                <div className="dossier-stat-num">{leoSnapshot.currentMilestone?.attributes?.vitality ?? '3.2'}</div>
              </div>
              <div className="dossier-stat-box">
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Strength</div>
                <div className="dossier-stat-num">{leoSnapshot.currentMilestone?.attributes?.strength ?? '2.8'}</div>
              </div>
              <div className="dossier-stat-box">
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Agility</div>
                <div className="dossier-stat-num">{leoSnapshot.currentMilestone?.attributes?.agility ?? '3.0'}</div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-bright)', marginBottom: '0.75rem' }}>
                Primordial Talents Unlocked
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {leo.talents?.map((talent) => {
                  const isTalentUnlocked = talent.unlockedChapter <= currentChapter;
                  return (
                    <div
                      key={talent.id}
                      style={{
                        background: 'rgba(6, 7, 10, 0.6)',
                        border: '1px solid var(--border-dim)',
                        borderRadius: '8px',
                        padding: '0.85rem 1.25rem',
                        opacity: isTalentUnlocked ? 1 : 0.45,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <strong style={{ color: isTalentUnlocked ? 'var(--gold-bright)' : 'var(--text-muted)' }}>
                          {talent.name}
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                          Ch. {talent.unlockedChapter}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.83rem', color: 'var(--text-dim)' }}>{talent.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: REALM & DANGER ZONES */}
        {activeTab === 'realm' && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} aria-label="World Lore and Realm Locations">
            <div className="dossier-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--gold-bright)', marginBottom: '1rem' }}>
                Academies & Power Factions
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {LOCAL_ACADEMIES && LOCAL_ACADEMIES.map((academy: { name?: string; description?: string; location?: string; foundedChapter?: number }, i: number) => (
                  <div key={i} style={{ background: 'rgba(6,7,10,0.5)', border: '1px solid var(--border-dim)', borderRadius: '8px', padding: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-parchment)', marginBottom: '0.25rem' }}>
                      {academy.name || `Academy ${i + 1}`}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                      {academy.description || academy.location || 'Prestigious beast taming institute.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="dossier-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--crimson-blood)', marginBottom: '1rem' }}>
                Forbidden Grounds & Danger Zones
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {LOCAL_DANGER_ZONES && LOCAL_DANGER_ZONES.map((zone: { name?: string; dangerLevel?: string; description?: string }, i: number) => (
                  <div key={i} style={{ background: 'rgba(6,7,10,0.5)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <h3 style={{ fontSize: '1rem', color: '#fca5a5' }}>{zone.name || `Forbidden Zone ${i + 1}`}</h3>
                      <span className="badge-pill bloodline">{zone.dangerLevel || 'Lethal'}</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>{zone.description || 'Hostile habitat inhabited by high-tier ferocious beasts.'}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* BEAST EVOLUTION MODAL */}
      {selectedBeast && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedBeast(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-deep)',
              border: '1px solid var(--border-glow)',
              borderRadius: '16px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--gold-bright)' }}>{selectedBeast.name}</h2>
                <p style={{ color: 'var(--text-dim)', fontStyle: 'italic', fontSize: '0.85rem' }}>{selectedBeast.species}</p>
              </div>
              <button
                onClick={() => setSelectedBeast(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontSize: '0.95rem', color: 'var(--purple-glow)', margin: '1rem 0 0.5rem 0' }}>
              Canonical Evolutionary Milestones ({selectedBeast.milestones.length} Stages)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedBeast.milestones.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(14, 18, 28, 0.75)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--gold-bright)' }}>
                      Chapters {m.minChapter} – {m.maxChapter ? m.maxChapter : 'Ongoing'}
                    </span>
                    <span className="star-rank-badge">
                      ★ {m.starRank} ({m.subRank})
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
                    Bloodline: <strong style={{ color: '#fff' }}>{m.bloodlineTier} ({m.bloodlinePurity}%)</strong> • Cognition: <strong style={{ color: '#fff' }}>{m.cognitionStage}</strong> (IQ {m.iq ?? '—'})
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                    Bond: <strong style={{ color: '#6ee7b7' }}>{m.bondStage.toUpperCase()} ({m.bondPercentage}%)</strong>
                  </div>
                  {m.sharedTraits && m.sharedTraits.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--gold-primary)' }}>
                      Shared Trait: {m.sharedTraits[0].name} — {m.sharedTraits[0].effect}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                onClick={() => setSelectedBeast(null)}
                className="tab-btn"
                style={{ borderColor: 'var(--border-glow)', color: 'var(--gold-bright)' }}
              >
                Close Grimoire Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
