import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isDemoMode } from '../env';

export const client = isDemoMode
  ? null
  : createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
      stega: {
        enabled: true,
        studioUrl: '/studio',
      },
    });

