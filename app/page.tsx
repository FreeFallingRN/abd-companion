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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      {/* 1. FIXED TOP APP HEADER */}
      <header className="app-header pt-safe">
        <div style={{ height: '64px', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1 }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(217, 119, 7, 0.2)',
                border: '1px solid rgba(255, 183, 125, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                flexShrink: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>all_inclusive</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="font-cinzel" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.04em' }}>
                  BEAST DOMINION
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(217, 119, 7, 0.25)',
                    color: 'var(--primary-fixed)',
                    border: '1px solid rgba(255, 183, 125, 0.3)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Multiplier ×{multiplier}
                </span>
              </div>
              <span style={{ fontSize: '10px', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {activeTab === 'sanctuary' && 'Sanctuary Codex • Ch. ' + currentChapter}
                {activeTab === 'codex' && 'Field Bestiary & Soul Lore'}
                {activeTab === 'dossier' && 'Pact Master Dossier'}
                {activeTab === 'realm' && 'Velerath Cartography • Sector 09'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Light/Dark Theme"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--surface-container-high)',
                border: '1px solid var(--outline-variant)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '19px' }}>
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Quick CMS Studio Link (Unobtrusive) */}
            <Link
              href="/studio"
              target="_blank"
              title="Open Sanity Studio Editor"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(221, 183, 255, 0.15)',
                border: '1px solid rgba(221, 183, 255, 0.3)',
                color: 'var(--tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit_note</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', paddingTop: '76px', paddingBottom: '96px', paddingLeft: '1rem', paddingRight: '1rem' }}>
        
        {/* STORY PROGRESS SYNCHRONIZATION HUD */}
        <section
          style={{
            background: 'var(--surface-container-low)',
            border: '1px solid var(--outline-variant)',
            borderRadius: '12px',
            padding: '0.85rem 1rem',
            marginBottom: '1rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          }}
          aria-label="Story Progress Synchronization"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>auto_stories</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="font-cinzel" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.04em' }}>
                    Story Progress Sync
                  </span>
                  <span style={{ fontSize: '9px', background: 'rgba(217,119,7,0.2)', color: 'var(--primary)', border: '1px solid rgba(255,183,125,0.3)', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>
                    Anti-Spoiler Mode
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>
                  Viewing: <strong>Chapter {currentChapter}</strong> [{phase === 1 ? 'Kendru Awakening' : phase === 2 ? 'Academy Trials' : phase === 3 ? 'Blood Bond & Fief Defense' : 'Apex Sovereign'}]
                </div>
              </div>
            </div>
            <div style={{ fontSize: '10px', background: 'rgba(0,166,224,0.15)', color: 'var(--secondary)', border: '1px solid rgba(123,208,255,0.3)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
              Phase {phase} Active (×{multiplier})
            </div>
          </div>

          {/* Interactive Chapter Range Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '0.5rem 0' }}>
            <input
              type="range"
              min={1}
              max={150}
              value={currentChapter}
              onChange={(e) => setCurrentChapter(Number(e.target.value))}
              style={{ width: '100%' }}
              id="chapter-scrubber"
              aria-label="Chapter Scrubber"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--on-surface-variant)', fontWeight: 600 }}>
              <span>Ch. 1 (Awakening)</span>
              <span>Ch. 26 (Academy)</span>
              <span>Ch. 71 (Blood Bond)</span>
              <span>Ch. 120 (Sovereign)</span>
            </div>
          </div>

          {/* Phase Milestone Selector Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px', paddingTop: '4px' }}>
            <button
              onClick={() => setCurrentChapter(15)}
              style={{
                padding: '6px 8px',
                borderRadius: '6px',
                textAlign: 'left',
                background: phase === 1 ? 'rgba(217, 119, 7, 0.25)' : 'var(--surface-container-lowest)',
                border: phase === 1 ? '1px solid var(--primary)' : '1px solid var(--outline-variant)',
                color: phase === 1 ? 'var(--primary)' : 'var(--on-surface)',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Phase I • Ch 1–25</div>
              <div style={{ fontSize: '10px', color: 'var(--on-surface-variant)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Kendru (×8)</div>
            </button>

            <button
              onClick={() => setCurrentChapter(50)}
              style={{
                padding: '6px 8px',
                borderRadius: '6px',
                textAlign: 'left',
                background: phase === 2 ? 'rgba(217, 119, 7, 0.25)' : 'var(--surface-container-lowest)',
                border: phase === 2 ? '1px solid var(--primary)' : '1px solid var(--outline-variant)',
                color: phase === 2 ? 'var(--primary)' : 'var(--on-surface)',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Phase II • Ch 26–70</div>
              <div style={{ fontSize: '10px', color: 'var(--on-surface-variant)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Academy (×9)</div>
            </button>

            <button
              onClick={() => setCurrentChapter(109)}
              style={{
                padding: '6px 8px',
                borderRadius: '6px',
                textAlign: 'left',
                background: phase === 3 ? 'rgba(217, 119, 7, 0.25)' : 'var(--surface-container-lowest)',
                border: phase === 3 ? '1px solid var(--primary)' : '1px solid var(--outline-variant)',
                color: phase === 3 ? 'var(--primary)' : 'var(--on-surface)',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Phase III • Ch 71–120</div>
              <div style={{ fontSize: '10px', color: 'var(--on-surface-variant)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Fief War (×10)</div>
            </button>

            <button
              onClick={() => setCurrentChapter(135)}
              style={{
                padding: '6px 8px',
                borderRadius: '6px',
                textAlign: 'left',
                background: phase === 4 ? 'rgba(217, 119, 7, 0.25)' : 'var(--surface-container-lowest)',
                border: phase === 4 ? '1px solid var(--primary)' : '1px solid var(--outline-variant)',
                color: phase === 4 ? 'var(--primary)' : 'var(--on-surface)',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Phase IV • Ch 121+</div>
              <div style={{ fontSize: '10px', color: 'var(--on-surface-variant)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Sovereign (×11+)</div>
            </button>
          </div>
        </section>

        {/* TAB 1: DOMINION SANCTUARY */}
        {activeTab === 'sanctuary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Sovereign Dominion Identity Card (Leo) */}
            <section
              style={{
                background: 'var(--surface-container-low)',
                border: '1px solid var(--primary)',
                borderRadius: '14px',
                padding: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                {/* Sovereign Avatar */}
                <div style={{ position: 'relative', width: '72px', height: '72px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--primary)', background: 'var(--surface-container)' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhbJyCncrv7U9rwD_bzdBowfebOUEEVhtRlkVJs6XnJzHABIcsiotVj-74mpu8PQGMdvIVUpH-x25us6ClONL7hFLMihMvJ8l4NX7-lX3yHQ41F-9BEQrsDFqA-G05GSnqknRYY5pqf623mj8HzIIiMhs9f6QRqP74XMhqTbZbESpzjGpx2ROakrEvOBYIN1gH3d_3lNITriFEh8XEgqM6XHygBcaYPeMKB8m3RXzapRkRELZ_Jhc9"
                    alt="Leo - Commoner Prodigy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'rgba(0,0,0,0.7)', fontSize: '8px', color: 'var(--primary)', textAlign: 'center', padding: '1px 0', fontWeight: 700 }}>
                    1st-Ranker
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 className="font-cinzel" style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: 800 }}>LEO</h2>
                    <span style={{ fontSize: '10px', background: 'rgba(0,166,224,0.15)', color: 'var(--secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      Commoner Prodigy
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
                    Aurelius Beast Academy • Outer Sector 09 Bastion
                  </div>
                  <div style={{ marginTop: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', background: 'rgba(221,183,255,0.15)', color: 'var(--tertiary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(221,183,255,0.3)' }}>
                    Dual Soul Anomaly: Mortal [{mortalSoulRank}] + Primordial [Mythical 7]
                  </div>
                </div>
              </div>

              {/* 5 Canonical Parameters */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Canonical Parameters (Ch. {currentChapter})</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>100% Stat Sharing (0 Mana Upkeep)</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', textAlign: 'center' }}>
                  <div style={{ background: 'var(--surface-container)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
                    <div style={{ fontSize: '9px', color: 'var(--on-surface-variant)', fontWeight: 700 }}>VIT</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--on-surface)' }}>{vit}</div>
                  </div>
                  <div style={{ background: 'var(--surface-container)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
                    <div style={{ fontSize: '9px', color: 'var(--on-surface-variant)', fontWeight: 700 }}>STR</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--on-surface)' }}>{str}</div>
                  </div>
                  <div style={{ background: 'var(--surface-container)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
                    <div style={{ fontSize: '9px', color: 'var(--secondary)', fontWeight: 700 }}>AGI</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--secondary)' }}>{agi}</div>
                  </div>
                  <div style={{ background: 'var(--surface-container)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
                    <div style={{ fontSize: '9px', color: 'var(--on-surface-variant)', fontWeight: 700 }}>STA</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--on-surface)' }}>{sta}</div>
                  </div>
                  <div style={{ background: 'rgba(217,119,7,0.2)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--primary)' }}>
                    <div style={{ fontSize: '9px', color: 'var(--primary)', fontWeight: 800 }}>INT</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>{intVal}</div>
                  </div>
                </div>
              </div>

              {/* Mana Gauge & Soft Cap Limiter */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginTop: '0.85rem', background: 'var(--surface-container-lowest)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--outline-variant)' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                    <span style={{ color: 'var(--on-surface-variant)' }}>MAX MANA</span>
                    <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>
                      {maxMana.toLocaleString()} <span style={{ fontSize: '9px', fontWeight: 400, color: 'var(--on-surface-variant)' }}>(INT {intVal}×10×{multiplier})</span>
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-container-high)', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--secondary)' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                    <span style={{ color: 'var(--on-surface-variant)' }}>SOFT CAP LIMITER</span>
                    <span style={{ color: 'var(--error)', fontWeight: 700 }}>
                      {softCap} <span style={{ fontSize: '9px', fontWeight: 400, color: 'var(--on-surface-variant)' }}>(Mortal Soul Cap)</span>
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-container-high)', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' }}>
                    <div style={{ width: softCap, height: '100%', background: 'var(--error)' }} />
                  </div>
                </div>
              </div>
            </section>

            {/* Active Companion Beasts in Dominion Sanctuary */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>pets</span>
                <h3 className="font-cinzel" style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: 700 }}>
                  Active Contracted Companions ({LOCAL_BEASTS.filter((b) => b.contractChapter <= currentChapter).length})
                </h3>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>
                Tap card for Evolution Milestones
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {LOCAL_BEASTS.map((beast) => {
                const snapshot = getBeastSnapshotAtChapter(beast, currentChapter);
                const isUnlocked = snapshot.isUnlocked;
                const m = snapshot.currentMilestone;

                if (!isUnlocked) {
                  return (
                    <article
                      key={beast.id}
                      style={{
                        background: 'var(--surface-container-low)',
                        border: '1px dashed var(--outline-variant)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        opacity: 0.5,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>🔒 Locked Companion</h4>
                          <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>Contracted in Chapter {beast.contractChapter}</span>
                        </div>
                        <span style={{ fontSize: '10px', background: 'var(--surface-container)', padding: '2px 6px', borderRadius: '4px' }}>
                          Locked
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '0.75rem' }}>
                        Advance chapter scrubber to Ch. {beast.contractChapter}+ to unlock this companion without spoilers.
                      </p>
                    </article>
                  );
                }

                return (
                  <article
                    key={beast.id}
                    onClick={() => setSelectedBeast(beast)}
                    style={{
                      background: 'var(--surface-container-low)',
                      border: '1px solid var(--outline-variant)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 className="font-cinzel" style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: 700 }}>{beast.name}</h4>
                        <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)', fontStyle: 'italic' }}>{beast.species}</span>
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          background: 'rgba(217, 119, 7, 0.2)',
                          border: '1px solid var(--primary)',
                          color: 'var(--primary)',
                          fontWeight: 700,
                          fontFamily: 'var(--font-cinzel)',
                        }}
                      >
                        ★ {m?.starRank} ({m?.subRank})
                      </span>
                    </div>

                    {/* Badge Strip */}
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', margin: '0.65rem 0' }}>
                      <span style={{ fontSize: '10px', background: 'rgba(255, 180, 171, 0.15)', color: 'var(--error)', border: '1px solid rgba(255, 180, 171, 0.3)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        {m?.bloodlineTier} ({m?.bloodlinePurity}%)
                      </span>
                      <span style={{ fontSize: '10px', background: 'rgba(221, 183, 255, 0.15)', color: 'var(--tertiary)', border: '1px solid rgba(221, 183, 255, 0.3)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        {m?.cognitionStage} (IQ {m?.iq ?? '—'})
                      </span>
                      <span style={{ fontSize: '10px', background: 'rgba(123, 208, 255, 0.15)', color: 'var(--secondary)', border: '1px solid rgba(123, 208, 255, 0.3)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        {m?.bondStage} bond ({m?.bondPercentage}%)
                      </span>
                    </div>

                    {/* Progress Bars */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '0.5rem 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--on-surface-variant)' }}>
                        <span>Bond Synchronization:</span>
                        <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>{m?.bondPercentage}%</span>
                      </div>
                      <div style={{ width: '100%', height: '5px', background: 'var(--surface-container-high)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${m?.bondPercentage || 0}%`, height: '100%', background: 'var(--secondary)' }} />
                      </div>
                    </div>

                    {/* Unlocked Abilities */}
                    <div style={{ marginTop: '0.65rem', paddingTop: '0.65rem', borderTop: '1px solid var(--outline-variant)' }}>
                      <div style={{ fontSize: '10px', color: 'var(--on-surface-variant)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Active Skills (Ch. {currentChapter}):
                      </div>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {m?.unlockedSkillIds && m.unlockedSkillIds.length > 0 ? (
                          m.unlockedSkillIds.map((sk) => (
                            <span key={sk} style={{ fontSize: '10px', background: 'var(--surface-container-highest)', color: 'var(--on-surface)', padding: '1px 6px', borderRadius: '4px', border: '1px solid var(--outline-variant)' }}>
                              {sk.replace(/_/g, ' ')}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: '10px', color: 'var(--on-surface-variant)' }}>None</span>
                        )}
                      </div>
                    </div>

                    {m?.sharedTraits && m.sharedTraits.length > 0 && (
                      <div style={{ marginTop: '0.65rem', fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                placeholder="Search beast, bloodline tier, affinity, or trait..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: '10px',
                  background: 'var(--surface-container-low)',
                  border: '1px solid var(--outline-variant)',
                  color: 'var(--on-surface)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', fontSize: '20px' }}>
                explore
              </span>
            </div>

            {/* Affinity Filter Chips */}
            <div className="no-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              {['all', 'shadow', 'fire', 'water', 'earth', 'nature', 'wind', 'draconic'].map((aff) => (
                <button
                  key={aff}
                  onClick={() => setSelectedAffinity(aff)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    whiteSpace: 'nowrap',
                    background: selectedAffinity === aff ? 'var(--primary)' : 'var(--surface-container-low)',
                    color: selectedAffinity === aff ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                    border: '1px solid var(--outline-variant)',
                    cursor: 'pointer',
                  }}
                >
                  {aff === 'all' ? 'All Beasts' : aff}
                </button>
              ))}
            </div>

            {/* Canon Bloodline Hierarchy Reference Banner */}
            <section
              style={{
                background: 'linear-gradient(90deg, var(--surface-container-lowest), var(--surface-container), var(--surface-container-lowest))',
                border: '1px solid var(--outline-variant)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>schema</span>
                  <span className="font-cinzel" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700 }}>
                    Canon Bloodline Hierarchy Reference
                  </span>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--on-surface-variant)' }}>Ceiling Limits</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px', textAlign: 'center' }}>
                <div style={{ background: 'var(--surface-container-low)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700 }}>Ordinary</div>
                  <div style={{ fontSize: '9px', color: 'var(--on-surface-variant)' }}>Max 2★</div>
                </div>
                <div style={{ background: 'var(--surface-container-low)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700 }}>Mortal</div>
                  <div style={{ fontSize: '9px', color: 'var(--on-surface-variant)' }}>Max 3–4★</div>
                </div>
                <div style={{ background: 'var(--surface-container-low)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--secondary)' }}>Super</div>
                  <div style={{ fontSize: '9px', color: 'var(--secondary)' }}>Max 5–6★</div>
                </div>
                <div style={{ background: 'var(--surface-container-low)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--tertiary)' }}>Noble</div>
                  <div style={{ fontSize: '9px', color: 'var(--tertiary)' }}>Max 7★</div>
                </div>
                <div style={{ background: 'var(--surface-container-low)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary)' }}>Royal</div>
                  <div style={{ fontSize: '9px', color: 'var(--primary)' }}>Max 8★</div>
                </div>
                <div style={{ background: 'rgba(217, 119, 7, 0.2)', padding: '6px 2px', borderRadius: '6px', border: '1px solid var(--primary)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--primary)' }}>Divine</div>
                  <div style={{ fontSize: '9px', color: 'var(--primary)', fontWeight: 700 }}>9–10★ God</div>
                </div>
              </div>
            </section>

            {/* Cognition & Soul Bond Stages Indicator */}
            <section
              style={{
                background: 'var(--surface-container-low)',
                border: '1px solid var(--outline-variant)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)', fontSize: '18px' }}>psychology</span>
                  <span className="font-cinzel" style={{ fontSize: '12px', color: 'var(--tertiary)', fontWeight: 700 }}>
                    Cognition & Soul Bond Stages
                  </span>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--tertiary)', fontWeight: 600 }}>Stage {phase} Active</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', textAlign: 'center' }}>
                <div style={{ opacity: phase >= 1 ? 1 : 0.4, background: phase === 1 ? 'rgba(221,183,255,0.2)' : 'var(--surface-container)', padding: '4px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700 }}>1. Feral</div>
                  <div style={{ fontSize: '8px', color: 'var(--on-surface-variant)' }}>Instinct</div>
                </div>
                <div style={{ opacity: phase >= 2 ? 1 : 0.4, background: phase === 2 ? 'rgba(221,183,255,0.2)' : 'var(--surface-container)', padding: '4px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700 }}>2. Juvenile</div>
                  <div style={{ fontSize: '8px', color: 'var(--on-surface-variant)' }}>No Skill Copy</div>
                </div>
                <div style={{ opacity: phase >= 3 ? 1 : 0.4, background: phase === 3 ? 'rgba(221,183,255,0.2)' : 'var(--surface-container)', padding: '4px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary)' }}>3. Adolescent</div>
                  <div style={{ fontSize: '8px', color: 'var(--primary)' }}>IQ 100+ Extract</div>
                </div>
                <div style={{ opacity: phase >= 4 ? 1 : 0.4, background: phase === 4 ? 'rgba(221,183,255,0.2)' : 'var(--surface-container)', padding: '4px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700 }}>4. Mature</div>
                  <div style={{ fontSize: '8px', color: 'var(--on-surface-variant)' }}>Language</div>
                </div>
                <div style={{ opacity: phase >= 5 ? 1 : 0.4, background: 'var(--surface-container)', padding: '4px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700 }}>5. Transcendent</div>
                  <div style={{ fontSize: '8px', color: 'var(--on-surface-variant)' }}>Resonance</div>
                </div>
              </div>
            </section>

            {/* Filtered Beasts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {filteredBeasts.map((beast) => {
                const snapshot = getBeastSnapshotAtChapter(beast, currentChapter);
                const m = snapshot.currentMilestone;
                return (
                  <article
                    key={beast.id}
                    onClick={() => setSelectedBeast(beast)}
                    style={{
                      background: 'var(--surface-container-low)',
                      border: '1px solid var(--outline-variant)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <h4 className="font-cinzel" style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: 700 }}>{beast.name}</h4>
                        <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)', fontStyle: 'italic' }}>{beast.species}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                        ★ {m?.starRank || 1} ({m?.subRank || 'low'})
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                      {beast.elementAffinity.map((el) => (
                        <span key={el} style={{ fontSize: '9px', background: 'var(--surface-container)', color: 'var(--secondary)', padding: '2px 6px', borderRadius: '4px', textTransform: 'capitalize' }}>
                          {el}
                        </span>
                      ))}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)', marginTop: '8px', lineHeight: 1.5 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Protagonist Selector Tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', background: 'var(--surface-container-low)', padding: '4px', borderRadius: '30px', border: '1px solid var(--outline-variant)' }}>
                <button
                  onClick={() => setSelectedProtagonist('leo')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: 'none',
                    background: selectedProtagonist === 'leo' ? 'var(--primary-container)' : 'transparent',
                    color: selectedProtagonist === 'leo' ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Leo (Active Sovereign)
                </button>
                <button
                  onClick={() => setSelectedProtagonist('lily')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: 'none',
                    background: selectedProtagonist === 'lily' ? 'var(--primary-container)' : 'transparent',
                    color: selectedProtagonist === 'lily' ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Lily (Partner)
                </button>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                CANON DOSSIER
              </span>
            </div>

            {selectedProtagonist === 'leo' ? (
              <section
                style={{
                  background: 'var(--surface-container-low)',
                  border: '1px solid var(--outline-variant)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                {/* Hero Backdrop Portrait */}
                <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhbJyCncrv7U9rwD_bzdBowfebOUEEVhtRlkVJs6XnJzHABIcsiotVj-74mpu8PQGMdvIVUpH-x25us6ClONL7hFLMihMvJ8l4NX7-lX3yHQ41F-9BEQrsDFqA-G05GSnqknRYY5pqf623mj8HzIIiMhs9f6QRqP74XMhqTbZbESpzjGpx2ROakrEvOBYIN1gH3d_3lNITriFEh8XEgqM6XHygBcaYPeMKB8m3RXzapRkRELZ_Jhc9"
                    alt="Leo Portrait"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface-container-low), transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <h2 className="font-cinzel" style={{ fontSize: '24px', color: 'var(--primary)', fontWeight: 900 }}>LEO</h2>
                      <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Pact Master • Aurelius 1st-Ranker
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="font-cinzel" style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: 800 }}>Multiplier ×{multiplier}</div>
                      <div style={{ fontSize: '10px', color: 'var(--secondary)' }}>Dual Soul Anomaly</div>
                    </div>
                  </div>
                </div>

                {/* Dual Soul Anomaly Breakdown */}
                <div style={{ padding: '1.25rem' }}>
                  <h3 className="font-cinzel" style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '8px' }}>
                    Dual Soul Anomaly Core
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginBottom: '1rem' }}>
                    <div style={{ background: 'var(--surface-container-lowest)', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline-variant)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: 'var(--on-surface-variant)' }}>Mortal Soul</span>
                        <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>[{mortalSoulRank}]</span>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '4px' }}>Value {phase}</div>
                      <div style={{ fontSize: '10px', color: 'var(--on-surface-variant)' }}>Innate Core</div>
                    </div>
                    <div style={{ background: 'var(--surface-container-lowest)', padding: '10px', borderRadius: '8px', border: '1px solid var(--primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: 'var(--primary)' }}>Primordial Soul</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>[Mythical]</span>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>Value 7</div>
                      <div style={{ fontSize: '10px', color: 'var(--primary-fixed)' }}>Ancient Fusion</div>
                    </div>
                  </div>

                  {/* Innate Talents */}
                  <h3 className="font-cinzel" style={{ fontSize: '13px', color: 'var(--on-surface-variant)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Innate Talents
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-container)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--primary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>pets</span>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>Primordial Beast Taming</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700 }}>10★ Mythical</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-container)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--secondary)', fontSize: '20px' }}>menu_book</span>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>Bestiary of Souls</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: 700 }}>6★ Unique</span>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              /* Lily Dossier */
              <section
                style={{
                  background: 'var(--surface-container-low)',
                  border: '1px solid var(--outline-variant)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                }}
              >
                <h2 className="font-cinzel" style={{ fontSize: '20px', color: 'var(--secondary)', fontWeight: 800 }}>LILY AURELIUS</h2>
                <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>
                  Scion of House Aurelius • Soulmate Bond Partner
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--on-surface)' }}>
                  Possesses bidirectional soulmate mana transfer with Leo. Endowed with the Super Rare soul core and Radiant Light affinity.
                </p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', background: 'rgba(123,208,255,0.15)', color: 'var(--secondary)', padding: '4px 10px', borderRadius: '6px' }}>
                    Affinity: Light / Life
                  </span>
                  <span style={{ fontSize: '11px', background: 'rgba(221,183,255,0.15)', color: 'var(--tertiary)', padding: '4px 10px', borderRadius: '6px' }}>
                    Soul Rank: Super Rare (Value 4)
                  </span>
                </div>
              </section>
            )}
          </div>
        )}

        {/* TAB 4: REALM ARCHIVE */}
        {activeTab === 'realm' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Secret Realm Gate (Chronos Dimensional Rift) */}
            <section
              style={{
                background: 'var(--surface-container-low)',
                border: '1px solid var(--outline-variant)',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQekvuB6d1tDk2z0B8lMealeK-i4dVX0a5BtqgtgzpMfV4mvyoFKJnz1SWtqIBd_yz5fSPo77dMVANW6hIlDLuuHVs_iKb6B5ZjVBQIASwJvM77A5WsVYEjbbZBJaZV-eWkWIx4nlsaIMFQjMQ4ggDUCHOdy1Il72cAzGl_yG13Xkz5ZTXPpYU2jig7wTPaEhT1S0FTXCrT7Z259BjaydIioPQiJdmkMDxFBBTbAR4RYQS_kKVBik7"
                  alt="Purple Spatial Vortex"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface-container-low), transparent 70%)' }} />
                <div style={{ position: 'absolute', top: '10px', left: '12px' }}>
                  <span style={{ fontSize: '10px', background: 'rgba(73,0,128,0.8)', color: 'var(--tertiary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid var(--tertiary)' }}>
                    🌀 Purple Spatial Vortex
                  </span>
                </div>
                <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pocket Dimension Aperture</div>
                    <h3 className="font-cinzel" style={{ fontSize: '18px', color: 'var(--on-surface)', fontWeight: 800 }}>Dimensional Rift of Chronos</h3>
                  </div>
                  <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.7)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--primary)' }}>
                    Canon: Ch 98–104
                  </span>
                </div>
              </div>

              {/* Exact Mechanics Rule Box */}
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ background: 'var(--surface-container-lowest)', padding: '10px', borderRadius: '8px', border: '1px solid var(--tertiary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--tertiary)', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>timelapse</span>
                    <span>Exact Temporal Synchronization Rule</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--on-surface)', lineHeight: 1.5 }}>
                    The Secret Realm Gate <strong style={{ color: 'var(--primary)' }}>only opens when pocket dimension time flow synchronizes with the outside world</strong>. Spatial aperture stabilizes strictly at <strong style={{ color: 'var(--secondary)' }}>7:00 PM (19:00) Purple Spatial Vortex Alignment</strong>. Unsynchronized entry attempts trigger violent dimensional sheer and soul core collapse.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ background: 'var(--surface-container)', padding: '8px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '9px', color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>Alignment Window</div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>19:00 - 21:00 CST Daily</div>
                  </div>
                  <div style={{ background: 'var(--surface-container)', padding: '8px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '9px', color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>Resonance Output</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--tertiary)' }}>High-Purple Chrono Stones</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hunter Guild Wild Danger Tiers */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="font-cinzel" style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 700 }}>
                  Hunter Guild Wild Danger Tiers (5 Classes)
                </h3>
                <span style={{ fontSize: '10px', color: 'var(--on-surface-variant)' }}>Codex Standard</span>
              </div>

              {/* Safe Zones */}
              <div style={{ background: 'var(--surface-container-low)', borderLeft: '4px solid #38bdf8', padding: '10px 14px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13px', color: '#38bdf8' }}>Safe Zones</strong>
                  <span style={{ fontSize: '9px', background: 'var(--surface-container)', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8', fontWeight: 700 }}>Zero Calamity</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
                  Fortified city perimeters, Imperial capital wards, and Academy main grounds protected by Imperial patrol knights and soul barrier spires.
                </p>
              </div>

              {/* Green Zones */}
              <div style={{ background: 'var(--surface-container-low)', borderLeft: '4px solid #10b981', padding: '10px 14px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13px', color: '#10b981' }}>Green Zones</strong>
                  <span style={{ fontSize: '9px', background: 'var(--surface-container)', padding: '2px 6px', borderRadius: '4px', color: '#10b981', fontWeight: 700 }}>Low 1★ to Mid 1★</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
                  Novice grounds and frontier outskirts. Docile to low-aggression beasts; ideal for fresh student sparring and juvenile herbivore taming expeditions.
                </p>
              </div>

              {/* Yellow Zones */}
              <div style={{ background: 'var(--surface-container-low)', borderLeft: '4px solid #f59e0b', padding: '10px 14px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13px', color: '#f59e0b' }}>Yellow Zones</strong>
                  <span style={{ fontSize: '9px', background: 'var(--surface-container)', padding: '2px 6px', borderRadius: '4px', color: '#f59e0b', fontWeight: 700 }}>High 1★ to Low 2★</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
                  Wild forest belts and mineral ridges. Packs of ravenous predators like shadow-panthers and direwolves.
                </p>
              </div>

              {/* Orange Zones */}
              <div style={{ background: 'var(--surface-container-low)', borderLeft: '4px solid #f97316', padding: '10px 14px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13px', color: '#f97316' }}>Orange Zones</strong>
                  <span style={{ fontSize: '9px', background: 'var(--surface-container)', padding: '2px 6px', borderRadius: '4px', color: '#f97316', fontWeight: 700 }}>Mid 2★ to High 2★</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
                  Sub-calamity hazard regions. Elite beast packs with rudimentary bloodline awakenings. High mortality rate.
                </p>
              </div>

              {/* Red Calamity Zones */}
              <div style={{ background: 'var(--surface-container-low)', borderLeft: '4px solid #ef4444', padding: '10px 14px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13px', color: '#ef4444' }}>Red Calamity Zones</strong>
                  <span style={{ fontSize: '9px', background: 'var(--surface-container)', padding: '2px 6px', borderRadius: '4px', color: '#ef4444', fontWeight: 700 }}>Peak 2★ to 3★+ Apex</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
                  Sovereign forbidden ground. Ancient abyssal wyverns and primordial entity nests. Requires Grandmaster Tamer battalions.
                </p>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* 3. PERSISTENT BOTTOM TAB NAVIGATION BAR (MOBILE-FIRST) */}
      <nav className="bottom-nav pb-safe" aria-label="Bottom Navigation">
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '56px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <button
            onClick={() => setActiveTab('sanctuary')}
            className={`nav-item ${activeTab === 'sanctuary' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>all_inclusive</span>
            <span>Sanctuary</span>
          </button>

          <button
            onClick={() => setActiveTab('codex')}
            className={`nav-item ${activeTab === 'codex' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>menu_book</span>
            <span>Codex</span>
          </button>

          <button
            onClick={() => setActiveTab('dossier')}
            className={`nav-item ${activeTab === 'dossier' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>shield_person</span>
            <span>Dossier</span>
          </button>

          <button
            onClick={() => setActiveTab('realm')}
            className={`nav-item ${activeTab === 'realm' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>explore</span>
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
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--surface-container-low)',
              border: '1px solid var(--primary)',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '1.5rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.7)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 className="font-cinzel" style={{ fontSize: '20px', color: 'var(--primary)', fontWeight: 800 }}>{selectedBeast.name}</h3>
                <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)', fontStyle: 'italic' }}>{selectedBeast.species}</span>
              </div>
              <button
                onClick={() => setSelectedBeast(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--on-surface-variant)',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>
              Contract Chapter: <strong>Chapter {selectedBeast.contractChapter}</strong> • Element: <strong>{selectedBeast.elementAffinity.join(', ')}</strong>
            </div>

            <h4 className="font-cinzel" style={{ fontSize: '13px', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Canonical Evolutionary Milestones ({selectedBeast.milestones.length} Stages)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedBeast.milestones.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface-container-lowest)',
                    border: '1px solid var(--outline-variant)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                      Chapters {m.minChapter} – {m.maxChapter ? m.maxChapter : 'Ongoing'}
                    </span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                      ★ {m.starRank} ({m.subRank})
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>
                    Bloodline: <strong style={{ color: 'var(--on-surface)' }}>{m.bloodlineTier} ({m.bloodlinePurity}%)</strong> • Cognition: <strong style={{ color: 'var(--on-surface)' }}>{m.cognitionStage}</strong> (IQ {m.iq ?? '—'})
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--secondary)', marginTop: '2px' }}>
                    Bond: <strong>{m.bondStage.toUpperCase()} ({m.bondPercentage}%)</strong>
                  </div>
                  {m.sharedTraits && m.sharedTraits.length > 0 && (
                    <div style={{ fontSize: '11px', color: 'var(--primary)', marginTop: '4px' }}>
                      ✨ Shared Trait: {m.sharedTraits[0].name} — {m.sharedTraits[0].effect}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <button
                onClick={() => setSelectedBeast(null)}
                style={{
                  background: 'var(--primary-container)',
                  color: 'var(--on-primary)',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
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
