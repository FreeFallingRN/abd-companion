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
    documents.push({
      _id: `beast-${beast.id}`,
      _type: 'beast',
      name: beast.name,
      id: { _type: 'slug', current: beast.id },
      species: beast.species,
      contractChapter: beast.contractChapter,
      elementAffinity: beast.elementAffinity || [],
      lore: beast.lore || `${beast.name} is a canonical companion of Leo.`,
      milestones: beast.milestones || [],
    });
  }
}

// 2. Characters
const charsDir = path.join(dataDir, 'characters');
if (fs.existsSync(charsDir)) {
  const charFiles = fs.readdirSync(charsDir).filter((f) => f.endsWith('.json'));
  for (const file of charFiles) {
    const char = JSON.parse(fs.readFileSync(path.join(charsDir, file), 'utf8'));
    documents.push({
      _id: `character-${char.id}`,
      _type: 'character',
      name: char.name,
      slug: { _type: 'slug', current: char.id },
      title: char.title,
      soulRank: char.soulProfile?.mortalSoulRank || 'rare',
      primaryAffinity: 'Dual Soul Anomaly',
      biography: `Pact Master of the Bestiary of Souls.`,
      milestones: char.milestones || [],
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

// 4. Realm Locations & Danger Zones
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

  let count = 0;
  for (const doc of documents) {
    try {
      await client.createOrReplace(doc);
      count++;
      process.stdout.write(`• Seeded ${doc._type}: ${doc.name || doc.id || doc._id}\n`);
    } catch (err) {
      console.error(`Error seeding ${doc._id}:`, err.message);
    }
  }
  console.log(`\n✓ Successfully seeded ${count}/${documents.length} documents into Sanity dataset '${dataset}'!`);
} else {
  console.log(`\nNote: To seed directly via API, set SANITY_API_WRITE_TOKEN in .env.local.`);
  console.log(`Alternatively, you can import sanity-dataset-export.ndjson using:`);
  console.log(`npx sanity dataset import sanity-dataset-export.ndjson ${dataset}`);
}
