import { CDN_URL } from "@config/constants";

type EmblemAssetType = 'emblem' | 'background' | 'window_pattern';

export default function getEmblemPath(emblem_id: string, type: EmblemAssetType) {
  return `${CDN_URL}timeline/costume_emblem/common/texture/costume_emblem_${emblem_id.padStart(3, '0')}/${type}.png`;
}