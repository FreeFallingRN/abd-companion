import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId, isDemoMode } from '../env';

const imageBuilder = isDemoMode
  ? null
  : createImageUrlBuilder({
      projectId: projectId || '',
      dataset: dataset || '',
    });

export const urlForImage = (source: Image | string | any) => {
  if (!source) return undefined;
  if (typeof source === 'string') {
    if (source.startsWith('image-') && imageBuilder) {
      return imageBuilder.image(source).auto('format').fit('max').url();
    }
    return source;
  }
  if (!imageBuilder) return undefined;
  if (source.asset?._ref) {
    return imageBuilder.image(source).auto('format').fit('max').url();
  }
  if (source.portraitAssetId) {
    return imageBuilder.image(source.portraitAssetId).auto('format').fit('max').url();
  }
  return undefined;
};
