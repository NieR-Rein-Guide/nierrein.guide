import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Scrollbar } from "swiper";
import Link from "next/link";
import { useSettingsStore } from "@store/settings";
import slug from "slugg";
import { useMedia } from "react-use";
import WeaponArtwork from "./WeaponArtwork";
import { weapon } from "@prisma/client";
import Element from "./Element";
import { formatDistanceToNow } from "date-fns";
import SVG from "react-inlinesvg";

export default function NewWeapons({ weapons }: { weapons: weapon[] }) {
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  const isMobile = useMedia("(max-width: 1279px)", true);

  return (
    <div className="container py-16">
      <h2 className="text-center text-3xl md:text-left md:text-4xl mb-16">
        Newly added weapons
      </h2>
      <div className="relative">
        <Swiper
          modules={[Scrollbar, A11y]}
          slidesPerView={isMobile ? 1 : 2}
          spaceBetween={40}
          className="cursor-move"
        >
          {weapons
            .filter((weapon) => {
              if (typeof window === "undefined") return true;
              if (showUnreleasedContent) return true;
              return new Date() > new Date(weapon.release_time);
            })
            .map((weapon) => (
              <SwiperSlide key={weapon.weapon_id}>
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-x-2 text-xl mb-2">
                    <div className="flex gap-x-2 flex-1">
                      <div className="flex items-center gap-x-2">
                        <div className="w-8">
                          <Element type={weapon.attribute} />
                        </div>
                        <span className="uppercase px-2 text-black bg-beige">
                          {weapon.name}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-beige-text">
                      Added{" "}
                      {formatDistanceToNow(new Date(weapon.release_time), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <WeaponArtwork weapon={weapon} />
                  <Link
                    href={`/weapons/${slug(weapon.name)}`}
                    passHref
                    className="btn absolute z-50 -bottom-2 transform -translate-x-1/2 left-1/2">
                    
                      See weapon
                    
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 md:left-auto md:translate-x-0 mt-11">
        <Link href="/weapons" passHref className="btn">

          <span>See all weapons</span>
          <SVG src="/decorations/arrow-right.svg" className="h-6" />

        </Link>
      </div>
    </div>
  );
}
