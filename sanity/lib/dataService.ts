import { client } from './client';
import { isDemoMode } from '../env';

// Import local JSON datasets as guaranteed offline fallback
import shyraData from '@/data/beasts/shyra.json';
import krikData from '@/data/beasts/krik.json';
import dryadData from '@/data/beasts/dryad.json';
import agnivarData from '@/data/beasts/agnivar.json';
import ashiraData from '@/data/beasts/ashira.json';
import nyxaData from '@/data/beasts/nyxa.json';
import howlData from '@/data/beasts/howl.json';
import zelutData from '@/data/beasts/zelut.json';

import leoData from '@/data/characters/leo.json';
import lilyData from '@/data/characters/lily.json';
import mihoData from '@/data/characters/miho.json';

import skillsData from '@/data/mechanics/skills.json';
import soulRanksData from '@/data/mechanics/soul_ranks.json';
import bloodlinesData from '@/data/mechanics/bloodlines.json';

import academiesData from '@/data/world/academies.json';
import dangerZonesData from '@/data/world/danger_zones.json';
import chaptersData from '@/data/chapters.json';

export interface Milestone {
  minChapter: number;
  maxChapter: number | null;
  starRank: number;
  subRank: string;
  bloodlineTier: string;
  bloodlinePurity: number;
  cognitionStage: string;
  iq?: number;
  bondStage: string;
  bondPercentage: number;
  unlockedSkillIds: string[];
  sharedTraits?: Array<{
    traitId?: string;
    name: string;
    effect: string;
    transferredToTamer?: boolean;
    unlockedChapter?: number;
  }>;
}

export interface BeastRecord {
  _id?: string;
  id: string;
  name: string;
  species: string;
  contractChapter: number;
  elementAffinity: string[];
  lore?: string;
  portrait?: any;
  imageUrl?: string;
  milestones: Milestone[];
}

export interface CharacterMilestone {
  minChapter?: number;
  maxChapter?: number | null;
  chapter?: number;
  level?: number;
  attributes?: {
    vitality: number;
    strength: number;
    agility: number;
    stamina?: number;
    intelligence?: number;
    maxMana?: number;
  };
  soulProfile?: {
    mortalSoulRank: string;
    mortalSoulValue: number;
    primordialSoulValue: number;
    combinedMultiplier: number;
    statSoftCapPercent: number;
    maxContractSlots: number;
    skillCapacity: number;
  };
  contractedBeastIds?: string[];
  personalSkillIds?: string[];
  copiedSkillIds?: string[];
  keyBreakthroughs?: string[];
}

export interface CharacterRecord {
  _id?: string;
  id: string;
  name: string;
  title: string;
  role: string;
  portrait?: any;
  talents?: Array<{
    id: string;
    name: string;
    starRank: number;
    description: string;
    unlockedChapter: number;
  }>;
  milestones: CharacterMilestone[];
}

export const LOCAL_BEASTS: BeastRecord[] = [
  shyraData as unknown as BeastRecord,
  dryadData as unknown as BeastRecord,
  nyxaData as unknown as BeastRecord,
  howlData as unknown as BeastRecord,
  zelutData as unknown as BeastRecord,
  agnivarData as unknown as BeastRecord,
  ashiraData as unknown as BeastRecord,
  krikData as unknown as BeastRecord,
];

export const LOCAL_CHARACTERS: CharacterRecord[] = [
  leoData as unknown as CharacterRecord,
  lilyData as unknown as CharacterRecord,
  mihoData as unknown as CharacterRecord,
];

export const LOCAL_CHAPTERS = chaptersData;
export const LOCAL_SKILLS = skillsData;
export const LOCAL_SOUL_RANKS = soulRanksData;
export const LOCAL_BLOODLINES = bloodlinesData;
export const LOCAL_ACADEMIES = academiesData;
export const LOCAL_DANGER_ZONES = dangerZonesData;

/**
 * Progression & Anti-Spoiler filter for a beast given a selected chapter
 */
export function getBeastSnapshotAtChapter(beast: BeastRecord, chapter: number) {
  // If beast contracted in a later chapter, it is locked/undiscovered
  if (beast.contractChapter > chapter) {
    return {
      isUnlocked: false,
      contractChapter: beast.contractChapter,
      name: 'Undiscovered Beast',
      species: 'Unknown Domain Creature',
      currentMilestone: null,
    };
  }

  // Find milestone active at this chapter
  const matchingMilestone = beast.milestones.find((m) => {
    const minOk = m.minChapter <= chapter;
    const maxOk = m.maxChapter === null || m.maxChapter === undefined || m.maxChapter >= chapter;
    return minOk && maxOk;
  }) || beast.milestones[0];

  return {
    isUnlocked: true,
    contractChapter: beast.contractChapter,
    name: beast.name,
    species: beast.species,
    currentMilestone: matchingMilestone,
  };
}

/**
 * Progression & Anti-Spoiler filter for character at chapter
 */
export function getCharacterSnapshotAtChapter(character: CharacterRecord, chapter: number) {
  const milestone = character.milestones.find((m) => {
    const minCh = m.minChapter ?? m.chapter ?? 1;
    const maxCh = m.maxChapter;
    const minOk = minCh <= chapter;
    const maxOk = maxCh === null || maxCh === undefined || maxCh >= chapter;
    return minOk && maxOk;
  }) || character.milestones[0];

  return {
    character,
    currentMilestone: milestone,
  };
}

/**
 * Data fetcher: Attempts to read from live Sanity, otherwise provides the canonical novel data
 */
export async function fetchAllBeasts(): Promise<BeastRecord[]> {
  if (!isDemoMode && client) {
    try {
      const sanityBeasts = await client.fetch<any[]>(`*[_type == "beast"] | order(contractChapter asc)`);
      if (sanityBeasts && sanityBeasts.length > 0) {
        return sanityBeasts.map((b) => ({
          ...b,
          id: b.id?.current || b.id || b._id,
          milestones: b.milestones || [],
          elementAffinity: b.elementAffinity || [],
        }));
      }
    } catch (err) {
      console.warn('Falling back to local beasts due to Sanity fetch issue:', err);
    }
  }
  return LOCAL_BEASTS;
}

export async function fetchAllCharacters(): Promise<CharacterRecord[]> {
  if (!isDemoMode && client) {
    try {
      const sanityChars = await client.fetch<any[]>(`*[_type == "character"]`);
      if (sanityChars && sanityChars.length > 0) {
        return sanityChars.map((c) => ({
          ...c,
          id: c.slug?.current || c.id || c._id,
          milestones: c.milestones || [],
        }));
      }
    } catch (err) {
      console.warn('Falling back to local characters due to Sanity fetch issue:', err);
    }
  }
  return LOCAL_CHARACTERS;
}
