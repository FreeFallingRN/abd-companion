import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Load .env.local
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === 'demo') {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function pullFromSanity() {
  console.log(`Connecting to Sanity (${projectId}/${dataset}) to pull live content...`);

  // 1. Pull Beasts
  const beasts = await client.fetch('*[_type == "beast"]');
  console.log(`Fetched ${beasts.length} beasts from Sanity.`);
  const beastsDir = path.join(process.cwd(), 'data', 'beasts');
  if (!fs.existsSync(beastsDir)) fs.mkdirSync(beastsDir, { recursive: true });

  for (const b of beasts) {
    const beastId = b.id?.current || b.id || b._id.replace('beast-', '');
    const beastFilePath = path.join(beastsDir, `${beastId}.json`);

    // Clean Sanity internal fields for local git tracking
    const cleanedBeast = {
      $schema: '../schemas/beast.schema.json',
      id: beastId,
      name: b.name,
      species: b.species,
      contractChapter: b.contractChapter,
      elementAffinity: b.elementAffinity || [],
      lore: b.lore || undefined,
      portraitAssetId: b.portrait?.asset?._ref || undefined,
      milestones: (b.milestones || []).map((m) => {
        const { _key, _type, portrait, sharedTraits, unlockedTraitIds, ...rest } = m;
        return {
          species: m.species || undefined,
          portraitAssetId: m.portrait?.asset?._ref || undefined,
          ...rest,
          traits: (m.traits || []).map((t) => {
            if (typeof t === 'string') return t;
            const { _key: tKey, _type: tType, ...tRest } = t;
            return tRest;
          }),
          _key,
        };
      }),
    };

    fs.writeFileSync(beastFilePath, JSON.stringify(cleanedBeast, null, 2), 'utf8');
    console.log(`  ✓ Synced data/beasts/${beastId}.json`);
  }

  // 2. Pull Characters
  const characters = await client.fetch('*[_type == "character"]');
  console.log(`\nFetched ${characters.length} characters from Sanity.`);
  const charsDir = path.join(process.cwd(), 'data', 'characters');
  if (!fs.existsSync(charsDir)) fs.mkdirSync(charsDir, { recursive: true });

  for (const c of characters) {
    const charId = c.slug?.current || c.id || c._id.replace('character-', '');
    const charFilePath = path.join(charsDir, `${charId}.json`);

    const cleanedChar = {
      $schema: '../schemas/character.schema.json',
      id: charId,
      name: c.name,
      title: c.title,
      soulRank: c.soulRank,
      primaryAffinity: c.primaryAffinity,
      biography: c.biography,
      portraitAssetId: c.portrait?.asset?._ref || undefined,
      milestones: (c.milestones || []).map((m) => {
        const { _key, _type, ...rest } = m;
        return { ...rest, _key };
      }),
    };

    fs.writeFileSync(charFilePath, JSON.stringify(cleanedChar, null, 2), 'utf8');
    console.log(`  ✓ Synced data/characters/${charId}.json`);
  }

  // 3. Pull Traits
  const traits = await client.fetch('*[_type == "trait"] | order(name asc)');
  if (traits && traits.length > 0) {
    console.log(`\nFetched ${traits.length} traits from Sanity.`);
    const traitsPath = path.join(process.cwd(), 'data', 'mechanics', 'traits.json');
    const cleanedTraits = traits.map((t) => ({
      id: t.id,
      name: t.name,
      element: t.element || 'neutral',
      description: t.description,
      unlockedChapter: t.unlockedChapter || 1,
    }));
    fs.writeFileSync(traitsPath, JSON.stringify(cleanedTraits, null, 2), 'utf8');
    console.log(`  ✓ Synced data/mechanics/traits.json`);
  }

  console.log('\n✓ Pull from Sanity complete! All Studio edits are now saved into local data/ files.');
}

pullFromSanity().catch(console.error);
