import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId, isDemoMode } from '../env';

const imageBuilder = isDemoMode
  ? null
  : createImageUrlBuilder({
      projectId: projectId || '',
      dataset: dataset || '',
    });

export const urlForImage = (source: Image | string) => {
  if (typeof source === 'string') {
    return source;
  }
  if (!imageBuilder || !source?.asset?._ref) {
    return undefined;
  }
  return imageBuilder?.image(source).auto('format').fit('max').url();
};
