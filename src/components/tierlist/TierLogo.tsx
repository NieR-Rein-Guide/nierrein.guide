import { RANK_THUMBNAILS } from "@utils/rankThumbnails";
import Image from "next/legacy/image";

export default function TierLogo({ tier }: { tier: string }) {
  if (RANK_THUMBNAILS[tier]) {
    return <Image src={RANK_THUMBNAILS[tier]} alt={tier} />;
  }
  return <h2 className="text-2xl">{tier}</h2>;
}
