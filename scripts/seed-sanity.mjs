import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Auto-load .env.local
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = val;
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

const dataDir = path.join(process.cwd(), 'data');

// Read local JSON files
const readJson = (relPath) => {
  const fullPath = path.join(dataDir, relPath);
  if (fs.existsSync(fullPath)) {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  }
  return null;
};

// Collect documents
const documents = [];

// 1. Beasts
const beastsDir = path.join(dataDir, 'beasts');
if (fs.existsSync(beastsDir)) {
  const beastFiles = fs.readdirSync(beastsDir).filter((f) => f.endsWith('.json'));
  for (const file of beastFiles) {
    const beast = JSON.parse(fs.readFileSync(path.join(beastsDir, file), 'utf8'));
    const milestones = (beast.milestones || []).map((m, mIdx) => {
      return {
        _key: m._key || `m_${m.minChapter || mIdx}_${beast.id}`,
        species: m.species || beast.species,
        portrait: m.portraitAssetId
          ? { _type: 'image', asset: { _type: 'reference', _ref: m.portraitAssetId } }
          : undefined,
        minChapter: m.minChapter,
        maxChapter: m.maxChapter ?? null,
        starRank: m.starRank,
        subRank: m.subRank,
        bloodlineTier: m.bloodlineTier,
        bloodlinePurity: m.bloodlinePurity,
        cognitionStage: m.cognitionStage,
        iq: m.iq,
        bondStage: m.bondStage,
        bondPercentage: m.bondPercentage,
        unlockedSkillIds: m.unlockedSkillIds || [],
        traits: (m.traits || []).map((t, tIdx) => {
          if (typeof t === 'string') {
            return {
              _key: `trait_${tIdx}_${t.toLowerCase().replace(/\s+/g, '_')}`,
              name: t,
              sharingStatus: 'locked',
              sharedPercent: 0,
            };
          }
          return {
            _key: t._key || `trait_${tIdx}_${t.name.toLowerCase().replace(/\s+/g, '_')}`,
            name: t.name,
            sharingStatus: t.sharingStatus || 'locked',
            sharedPercent: t.sharedPercent ?? 0,
            tamerEffect: t.tamerEffect || undefined,
          };
        }),
      };
    });

    documents.push({
      _id: `beast-${beast.id}`,
      _type: 'beast',
      name: beast.name,
      id: { _type: 'slug', current: beast.id },
      species: beast.species,
      contractChapter: beast.contractChapter,
      elementAffinity: beast.elementAffinity || [],
      lore: beast.lore || `${beast.name} is a canonical companion of Leo.`,
      milestones,
    });
  }
}

// 2. Characters
const charsDir = path.join(dataDir, 'characters');
if (fs.existsSync(charsDir)) {
  const charFiles = fs.readdirSync(charsDir).filter((f) => f.endsWith('.json'));
  for (const file of charFiles) {
    const char = JSON.parse(fs.readFileSync(path.join(charsDir, file), 'utf8'));
    const milestones = (char.milestones || []).map((m, mIdx) => ({
      _key: m._key || `char_m_${m.minChapter || mIdx}_${char.id}`,
      minChapter: m.minChapter,
      maxChapter: m.maxChapter ?? null,
      level: m.level || 1,
      attributes: m.attributes ? {
        vitality: m.attributes.vitality,
        strength: m.attributes.strength,
        agility: m.attributes.agility,
        stamina: m.attributes.stamina,
        intelligence: m.attributes.intelligence,
        maxMana: m.attributes.maxMana,
        unassignedPoints: m.attributes.unassignedPoints || 0,
      } : undefined,
      soulProfile: m.soulProfile ? {
        mortalSoulRank: m.soulProfile.mortalSoulRank,
        mortalSoulValue: m.soulProfile.mortalSoulValue,
        primordialSoulValue: m.soulProfile.primordialSoulValue,
        combinedMultiplier: m.soulProfile.combinedMultiplier,
        statSoftCapPercent: m.soulProfile.statSoftCapPercent,
        maxContractSlots: m.soulProfile.maxContractSlots,
        skillCapacity: m.soulProfile.skillCapacity,
      } : undefined,
      contractedBeastIds: m.contractedBeastIds || [],
      personalSkillIds: m.personalSkillIds || [],
      copiedSkillIds: m.copiedSkillIds || [],
    }));

    documents.push({
      _id: `character-${char.id}`,
      _type: 'character',
      name: char.name,
      slug: { _type: 'slug', current: char.id },
      title: char.title,
      role: char.role || (char.id === 'leo' ? 'protagonist' : char.id === 'lily' ? 'partner' : 'ally'),
      soulRank: char.soulRank || char.milestones?.[0]?.soulProfile?.mortalSoulRank || 'rare',
      primaryAffinity: char.primaryAffinity || 'Dual Soul Anomaly',
      biography: char.biography || `Pact Master of the Bestiary of Souls.`,
      talents: char.talents || [],
      milestones,
    });
  }
}

// 3. Skills
const skills = readJson('mechanics/skills.json');
if (Array.isArray(skills)) {
  for (const skill of skills) {
    documents.push({
      _id: `skill-${skill.id}`,
      _type: 'skill',
      id: skill.id,
      name: skill.name,
      element: skill.element || 'Universal',
      tier: skill.tier || 'basic',
      manaCost: skill.manaCost || 0,
      description: skill.description || 'Canonical skill technique.',
      unlockedChapter: skill.unlockedChapter || 1,
    });
  }
}

// 4. Traits & Specialties
const traits = readJson('mechanics/traits.json');
if (Array.isArray(traits)) {
  for (const trait of traits) {
    documents.push({
      _id: `trait-${trait.id}`,
      _type: 'trait',
      id: trait.id,
      name: trait.name,
      element: trait.element || 'neutral',
      description: trait.description || 'Beast passive specialty trait.',
      unlockedChapter: trait.unlockedChapter || 1,
    });
  }
}

// 5. Realm Locations & Danger Zones
const academies = readJson('world/academies.json');
if (Array.isArray(academies)) {
  for (let i = 0; i < academies.length; i++) {
    const a = academies[i];
    documents.push({
      _id: `realm-academy-${i}`,
      _type: 'realmLocation',
      name: a.name,
      type: 'academy',
      dangerRating: 'Protected Ground',
      firstChapter: a.foundedChapter || 26,
      description: a.description || 'Imperial Beast Tamer Academy.',
    });
  }
}

const dangerZones = readJson('world/danger_zones.json');
if (Array.isArray(dangerZones)) {
  for (let i = 0; i < dangerZones.length; i++) {
    const z = dangerZones[i];
    documents.push({
      _id: `realm-danger-${i}`,
      _type: 'realmLocation',
      name: z.name,
      type: 'danger_zone',
      dangerRating: z.dangerLevel || 'Lethal Hazard',
      firstChapter: 1,
      description: z.description || 'Hostile habitat inhabited by ferocious beasts.',
    });
  }
}

// Write NDJSON export for CLI / Web Import
const ndjsonContent = documents.map((doc) => JSON.stringify(doc)).join('\n');
const exportPath = path.join(process.cwd(), 'sanity-dataset-export.ndjson');
fs.writeFileSync(exportPath, ndjsonContent, 'utf8');
console.log(`\n✓ Generated ${documents.length} Sanity documents in sanity-dataset-export.ndjson!`);

// If token provided, seed directly to live Sanity Content Lake
if (token && projectId && projectId !== 'demo') {
  console.log(`\nConnecting to Sanity project: ${projectId} (dataset: ${dataset})...`);
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  });

  const forceOverwrite = process.argv.includes('--force');
  let createdCount = 0;
  let skippedCount = 0;

  for (const doc of documents) {
    try {
      const existing = await client.getDocument(doc._id);
      if (existing) {
        if (forceOverwrite) {
          const docToSave = { ...doc };
          if (existing.portrait && !docToSave.portrait) {
            docToSave.portrait = existing.portrait;
          }
          if (Array.isArray(existing.milestones) && Array.isArray(docToSave.milestones)) {
            docToSave.milestones = docToSave.milestones.map((m, mIdx) => {
              const exM = existing.milestones.find((em) => em._key === m._key) || existing.milestones[mIdx];
              if (exM && exM.portrait && !m.portrait) {
                return { ...m, portrait: exM.portrait };
              }
              return m;
            });
          }
          await client.createOrReplace(docToSave);
          createdCount++;
          process.stdout.write(`• Overwritten (kept portrait) ${doc._type}: ${doc.name || doc.id || doc._id}\n`);
        } else {
          skippedCount++;
        }
      } else {
        await client.create(doc);
        createdCount++;
        process.stdout.write(`• Created new ${doc._type}: ${doc.name || doc.id || doc._id}\n`);
      }
    } catch (err) {
      console.error(`Error seeding ${doc._id}:`, err.message);
    }
  }

  if (!forceOverwrite && skippedCount > 0) {
    console.log(`\n🛡️ Safe Mode: Skipped ${skippedCount} existing documents in Sanity to protect Studio edits and portraits.`);
    console.log(`  (To force-update while preserving portraits, run with: --force)`);
  }
  console.log(`\n✓ Seeding finished: ${createdCount} created, ${skippedCount} existing documents preserved.`);
} else {
  console.log(`\nNote: To seed directly via API, set SANITY_API_WRITE_TOKEN in .env.local.`);
  console.log(`Alternatively, you can import sanity-dataset-export.ndjson using:`);
  console.log(`npx sanity dataset import sanity-dataset-export.ndjson ${dataset}`);
}
