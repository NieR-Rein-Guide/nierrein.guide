import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Scrollbar } from "swiper";
import Link from "next/link";
import { useSettingsStore } from "@store/settings";
import CostumeArtwork from "./CostumeArtwork";
import slug from "slugg";
import classNames from "classnames";
import { useMedia } from "react-use";
import SVG from "react-inlinesvg";
import Image from "next/image";
import weaponsIcons from "@utils/weaponsIcons";
import { formatDistanceToNow } from "date-fns";

export default function NewCostumes({ costumes }) {
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  const isMobile = useMedia("(max-width: 1279px)");

  return (
    <div className="container py-16">
      <h2 className="text-center text-3xl md:text-left md:text-4xl mb-16">
        Newly added costumes
      </h2>
      <div className="relative">
        <Swiper
          modules={[A11y, Scrollbar]}
          slidesPerView={isMobile ? 1 : 2}
          spaceBetween={40}
          className="cursor-move"
        >
          {costumes
            .filter((costume) => {
              if (showUnreleasedContent) return true;
              return new Date() > new Date(costume.release_time);
            })
            .map((costume, index, costumes) => (
              <SwiperSlide key={costume.costume_id}>
                <div
                  className={classNames(
                    "relative",
                    costumes.length - 1 === index ? "col-span-2" : ""
                  )}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-x-2 text-xl mb-2">
                    <div className="flex gap-x-2 flex-1">
                      <div className="flex items-center gap-x-2">
                        <div className="w-8">
                          <Image
                            layout="responsive"
                            src={weaponsIcons[costume.weapon_type]}
                            alt={costume.weapon_type}
                          />
                        </div>
                        <span className="uppercase px-2 text-black bg-beige">
                          {costume.character.name}
                        </span>
                      </div>
                      <span className="uppercase text-beige">
                        {costume.title}
                      </span>
                    </div>
                    <span className="text-sm text-beige-text">
                      Added{" "}
                      {formatDistanceToNow(new Date(costume.release_time), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <CostumeArtwork costume={costume} />
                  <Link
                    href={`/characters/${slug(costume.character.name)}/${slug(
                      costume.title
                    )}`}
                    passHref
                  >
                    <a className="btn absolute z-50 -bottom-2 transform -translate-x-1/2 left-1/2">
                      See costume
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 md:left-auto md:translate-x-0 mt-11">
        <Link href="/characters" passHref>
          <a className="btn">
            <span>See all costumes</span>
            <SVG src="/decorations/arrow-right.svg" className="h-6" />
          </a>
        </Link>
      </div>
    </div>
  );
}
