import { client } from './client';
import { isDemoMode } from '../env';
import { urlForImage } from './image';
import { stegaClean } from 'next-sanity';

// Import local JSON datasets as guaranteed offline fallback
import shyraData from '@/data/beasts/shyra.json';
import kazzData from '@/data/beasts/kazz.json';
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
import traitsData from '@/data/mechanics/traits.json';

import academiesData from '@/data/world/academies.json';
import dangerZonesData from '@/data/world/danger_zones.json';
import chaptersData from '@/data/chapters.json';

export interface MilestoneTrait {
  name: string;
  sharingStatus?: 'locked' | 'partial' | 'full';
  sharedPercent?: number;
  tamerEffect?: string;
}

export interface Milestone {
  _key?: string;
  species?: string;
  size?: string;
  portrait?: any;
  portraitAssetId?: string;
  imageUrl?: string;
  minChapter: number;
  starRank: number;
  subRank: string;
  bloodlineTier: string;
  bloodlinePurity: number;
  cognitionStage: string;
  iq?: number;
  bondStage: string;
  bondPercentage: number;
  unlockedSkillIds: string[];
  traits?: Array<string | MilestoneTrait>;
}

export interface BeastTamerRef {
  _id?: string;
  name?: string;
  slug?: string;
}

export interface BeastRecord {
  _id?: string;
  id: string;
  name: string;
  species: string;
  size?: string;
  contractChapter: number;
  elementAffinity: string[];
  lore?: string;
  portrait?: any;
  imageUrl?: string;
  tamer?: BeastTamerRef;
  tamerId?: string;
  milestones: Milestone[];
}

export interface CharacterMilestone {
  _key?: string;
  minChapter?: number;
  chapter?: number;
  level?: number;
  attributes?: {
    vitality: number;
    strength: number;
    agility: number;
    stamina?: number;
    intelligence?: number;
    maxMana?: number;
    unassignedPoints?: number;
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
  kazzData as unknown as BeastRecord,
];

export const LOCAL_CHARACTERS: CharacterRecord[] = [
  leoData as unknown as CharacterRecord,
  lilyData as unknown as CharacterRecord,
  mihoData as unknown as CharacterRecord,
];

export const LOCAL_CHAPTERS = chaptersData;
export const LOCAL_SKILLS = skillsData;
export const LOCAL_TRAITS = traitsData;
export const LOCAL_SOUL_RANKS = soulRanksData;
export const LOCAL_BLOODLINES = bloodlinesData;
export const LOCAL_ACADEMIES = academiesData;
export const LOCAL_DANGER_ZONES = dangerZonesData;

export interface TraitRecord {
  id: string;
  name: string;
  element?: string;
  description: string;
  unlockedChapter?: number;
}

export function getTraitByName(nameOrId: string): TraitRecord | undefined {
  if (!nameOrId) return undefined;
  const search = nameOrId.trim().toLowerCase();
  return (LOCAL_TRAITS as TraitRecord[]).find(
    (t) => t.name.toLowerCase() === search || t.id.toLowerCase() === search.replace(/\s+/g, '_')
  );
}

export function getTraitById(traitId: string): TraitRecord | undefined {
  return getTraitByName(traitId);
}

export interface ProcessedTrait {
  id: string;
  name: string;
  effect: string;
  sharingStatus: 'locked' | 'partial' | 'full';
  sharedPercent?: number;
  tamerEffect?: string;
  isSharedWithTamer: boolean;
}

export function getMilestoneTraits(milestone?: Milestone | null): ProcessedTrait[] {
  if (!milestone || !milestone.traits || milestone.traits.length === 0) return [];

  return milestone.traits.map((t) => {
    const rawName = typeof t === 'string' ? t : t.name;
    const found = getTraitByName(rawName);
    const traitObj = typeof t === 'object' && t !== null ? t : undefined;

    const sharingStatus = traitObj?.sharingStatus || 'locked';
    const isShared = sharingStatus === 'full' || sharingStatus === 'partial';

    return {
      id: found?.id || rawName.toLowerCase().replace(/\s+/g, '_'),
      name: found?.name || rawName,
      effect: found?.description || 'Specialty trait.',
      sharingStatus,
      sharedPercent: traitObj?.sharedPercent,
      tamerEffect: traitObj?.tamerEffect,
      isSharedWithTamer: isShared,
    };
  });
}

export function getBeastImageUrl(beast: BeastRecord, milestone?: Milestone | null): string | undefined {
  if (milestone) {
    if (milestone.portrait) {
      const url = urlForImage(milestone.portrait);
      if (url) return url;
    }
    if (milestone.portraitAssetId) {
      const url = urlForImage(milestone.portraitAssetId);
      if (url) return url;
    }
    if (milestone.imageUrl) return milestone.imageUrl;
  }
  if (beast.portrait) {
    const url = urlForImage(beast.portrait);
    if (url) return url;
  }
  if ((beast as any).portraitAssetId) {
    const url = urlForImage((beast as any).portraitAssetId);
    if (url) return url;
  }
  return beast.imageUrl;
}

/**
 * Progression & Anti-Spoiler filter for a beast given a selected chapter
 */
export function getBeastSnapshotAtChapter(beast: BeastRecord, chapter: number) {
  const tamerId = beast.tamerId || beast.tamer?.slug || (beast.tamer?._id ? beast.tamer._id.replace('character-', '') : 'leo');

  // If beast contracted in a later chapter, it is locked/undiscovered
  if (beast.contractChapter > chapter) {
    return {
      isUnlocked: false,
      contractChapter: beast.contractChapter,
      name: 'Undiscovered Beast',
      species: beast.species || 'Unknown Domain Creature',
      currentMilestone: null,
      size: beast.size,
      tamerId,
      tamer: beast.tamer,
      portrait: null,
      imageUrl: undefined,
    };
  }

  // Find milestone active at this chapter:
  // Growth milestones supercede one another automatically:
  // Only the milestone starting chapter matters; higher chapters take priority!
  const milestones = beast.milestones || [];
  const reached = milestones.filter((m) => {
    const startCh = (m as any).chapter ?? m.minChapter ?? 0;
    return startCh <= chapter;
  });
  reached.sort((a, b) => {
    const chA = (a as any).chapter ?? a.minChapter ?? 0;
    const chB = (b as any).chapter ?? b.minChapter ?? 0;
    return chB - chA;
  });
  const matchingMilestone = reached[0] || milestones[0] || null;

  return {
    isUnlocked: true,
    contractChapter: beast.contractChapter,
    name: beast.name,
    species: matchingMilestone?.species || beast.species,
    size: matchingMilestone?.size || beast.size,
    tamerId,
    tamer: beast.tamer,
    currentMilestone: matchingMilestone,
    portrait: matchingMilestone?.portrait || matchingMilestone?.portraitAssetId || beast.portrait || (beast as any).portraitAssetId,
    imageUrl: getBeastImageUrl(beast, matchingMilestone),
  };
}

/**
 * Progression & Anti-Spoiler filter for character at chapter
 * Growth milestones automatically supercede one another:
 * Only the milestone starting chapter matters; higher chapters take priority!
 */
export function getCharacterSnapshotAtChapter(character: CharacterRecord, chapter: number) {
  const milestones = character.milestones || [];
  const reached = milestones.filter((m) => {
    const startCh = m.chapter ?? m.minChapter ?? 1;
    return startCh <= chapter;
  });
  reached.sort((a, b) => {
    const chA = a.chapter ?? a.minChapter ?? 1;
    const chB = b.chapter ?? b.minChapter ?? 1;
    return chB - chA;
  });
  const matchingMilestone = reached[0] || milestones[0] || null;

  return {
    character,
    currentMilestone: matchingMilestone,
  };
}

/**
 * Data fetcher: Attempts to read from live Sanity, otherwise provides the canonical novel data
 */
export async function fetchAllBeasts(): Promise<BeastRecord[]> {
  if (!isDemoMode && client) {
    try {
      const sanityBeasts = await client.fetch<any[]>(`
        *[_type == "beast"] {
          ...,
          "tamer": tamer->{
            _id,
            name,
            "slug": coalesce(slug.current, id)
          }
        } | order(contractChapter asc)
      `);
      if (sanityBeasts && sanityBeasts.length > 0) {
        return sanityBeasts.map((b) => {
          const tamerSlug =
            b.tamer?.slug ||
            (b.tamer?._id ? b.tamer._id.replace('character-', '') : undefined) ||
            b.tamerId ||
            'leo';
          return {
            ...b,
            id: stegaClean(b.id?.current || b.id || b._id),
            tamerId: stegaClean(tamerSlug),
            tamer: b.tamer,
            milestones: b.milestones || [],
            elementAffinity: (b.elementAffinity || []).map((e: string) => stegaClean(e)),
          };
        });
      }
    } catch (err) {
      console.warn('Falling back to local beasts due to Sanity fetch issue:', err);
    }
  }
  return LOCAL_BEASTS.map((b) => ({
    ...b,
    tamerId: b.tamerId || 'leo',
  }));
}

export async function fetchAllCharacters(): Promise<CharacterRecord[]> {
  if (!isDemoMode && client) {
    try {
      const sanityChars = await client.fetch<any[]>(`
        *[_type == "character"] {
          ...,
          "contractedBeasts": contractedBeasts[]->{
            _id,
            "id": coalesce(id.current, id, _id),
            name,
            species,
            contractChapter
          }
        }
      `);
      if (sanityChars && sanityChars.length > 0) {
        return sanityChars.map((c) => ({
          ...c,
          id: stegaClean(c.slug?.current || c.id || c._id),
          milestones: c.milestones || [],
        }));
      }
    } catch (err) {
      console.warn('Falling back to local characters due to Sanity fetch issue:', err);
    }
  }
  return LOCAL_CHARACTERS;
}
