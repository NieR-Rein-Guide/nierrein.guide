import { RANK_THUMBNAILS } from "@utils/rankThumbnails";


export default function TierLogo({ tier }: { tier: string }) {
  if (RANK_THUMBNAILS[tier]) {
    return <img src={RANK_THUMBNAILS[tier]} alt={tier} />;
  }
  return <h2 className="text-2xl">{tier}</h2>;
}
