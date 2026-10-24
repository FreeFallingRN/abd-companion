import { createDataAttribute } from 'next-sanity';
import { projectId, dataset } from '../env';

export function getSanityAttr(id: string, type: string, path = 'name'): string {
  try {
    const da = createDataAttribute({
      projectId: projectId || 'qrfgv7bt',
      dataset: dataset || 'production',
      baseUrl: '/studio',
      id,
      type,
    });
    return da(path);
  } catch {
    return `id=${id};type=${type};path=${path};base=%2Fstudio`;
  }
}

