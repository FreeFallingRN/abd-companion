import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import crypto from 'crypto';

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

console.log('Project ID:', projectId);
console.log('Dataset:', dataset);
console.log('Token present:', !!token);

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

function generateKey(prefix = 'k') {
  return `${prefix}_${crypto.randomBytes(6).toString('hex')}`;
}

async function run() {
  try {
    // 1. Fetch all beast documents
    const beasts = await client.fetch('*[_type == "beast"]');
    console.log(`Fetched ${beasts.length} beast documents from Sanity`);

    for (const beast of beasts) {
      console.log(`\nInspecting Beast: ${beast.name} (${beast._id})`);
      console.log(`  - Has portrait:`, !!beast.portrait);
      console.log(`  - Milestones count:`, beast.milestones ? beast.milestones.length : 0);

      let needsUpdate = false;
      const updatedMilestones = (beast.milestones || []).map((m, mIdx) => {
        const milestoneKey = m._key || generateKey(`m${m.minChapter || mIdx}`);
        if (!m._key) {
          needsUpdate = true;
          console.log(`    -> Missing _key on milestone minChapter=${m.minChapter}. Assigning ${milestoneKey}`);
        }

        const { sharedTraits, unlockedTraitIds, ...restMilestone } = m;
        return {
          ...restMilestone,
          _key: milestoneKey,
          traits: m.traits || [],
        };
      });

      if (needsUpdate) {
        console.log(`  Updating ${beast._id} with properly keyed milestones...`);
        await client
          .patch(beast._id)
          .set({ milestones: updatedMilestones })
          .commit();
        console.log(`  ✓ Updated ${beast._id} successfully!`);
      } else {
        console.log(`  ✓ All milestones and traits already have _key.`);
      }
    }

    // 2. Fetch all character documents
    const characters = await client.fetch('*[_type == "character"]');
    console.log(`\nFetched ${characters.length} character documents from Sanity`);

    for (const char of characters) {
      console.log(`\nInspecting Character: ${char.name} (${char._id})`);
      let needsUpdate = false;
      const updatedMilestones = (char.milestones || []).map((m, mIdx) => {
        const milestoneKey = m._key || generateKey(`char_m${m.minChapter || mIdx}`);
        if (!m._key) {
          needsUpdate = true;
          console.log(`    -> Missing _key on char milestone minChapter=${m.minChapter}. Assigning ${milestoneKey}`);
        }
        return {
          ...m,
          _key: milestoneKey,
        };
      });

      if (needsUpdate) {
        console.log(`  Updating ${char._id} with properly keyed milestones...`);
        await client
          .patch(char._id)
          .set({ milestones: updatedMilestones })
          .commit();
        console.log(`  ✓ Updated ${char._id} successfully!`);
      } else {
        console.log(`  ✓ All character milestones already have _key.`);
      }
    }

    // 3. Test asset upload permission
    console.log('\nTesting image asset upload permission using write token...');
    // Create a 1x1 transparent PNG buffer
    const testPngBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      'base64'
    );
    try {
      const asset = await client.assets.upload('image', testPngBuffer, {
        filename: 'test-ping.png',
      });
      console.log('✓ Successfully uploaded test asset! Asset ID:', asset._id);
      // Clean up test asset
      await client.delete(asset._id);
      console.log('✓ Cleaned up test asset.');
    } catch (uploadErr) {
      console.error('✗ Asset upload failed with error:', uploadErr.message);
    }

    console.log('\nAll checks and fixes completed.');
  } catch (err) {
    console.error('Fatal error:', err);
  }
}

run();
