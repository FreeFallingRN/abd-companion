import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset } from './sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Absolute Beast Dominion Codex Studio',
  basePath: '/studio',

  projectId: projectId || 'demo',
  dataset: dataset || 'production',

  plugins: [
    structureTool({
      title: 'Grimoire Codex',
    }),
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
