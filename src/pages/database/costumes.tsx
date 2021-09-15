import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { Costume, WeaponType } from "@models/types";
import Link from "next/link";
import Image from "next/image";
import SVG from "react-inlinesvg";
import { getAllCostumes } from "@models/character";
import { CostumeRarity } from "@models/types";
import CostumeThumbnail from "@components/CostumeThumbnail";
import Checkbox from "@components/form/Checkbox";
import Star from "@components/decorations/Star";
import weaponTypes from "@utils/weaponTypes";
import slugify from "slugify";
import { useEffect, useState } from "react";
import weaponsIcons from "@utils/weaponsIcons";
import RARITY from "@utils/rarity";

interface DatabaseStoriesProps {
  allCostumes: string;
}

export default function DatabaseCostumes({
  allCostumes,
}: DatabaseStoriesProps): JSX.Element {
  const costumes: Costume[] = JSON.parse(allCostumes);

  const [filteredCostumes, setFilteredCostumes] = useState(costumes);
  const [costumeRarity, setCostumeRarity] = useState<CostumeRarity[]>([]);
  const [weaponType, setWeaponType] = useState<WeaponType[]>([]);

  useEffect(() => {
    if (costumeRarity.length === 0) {
      setFilteredCostumes(costumes);
    } else {
      const filteredCostumes = filterCostumes();
      setFilteredCostumes(filteredCostumes);
    }
  }, [costumeRarity]);

  useEffect(() => {
    if (weaponType.length === 0) {
      setFilteredCostumes(costumes);
    } else {
      const filteredCostumes = filterCostumes();
      setFilteredCostumes(filteredCostumes);
    }
  }, [weaponType]);

  function filterCostumes() {
    const filteredCostumes = costumes.filter((costume) => {
      let isMatch = false;

      if (weaponType.length > 0 && costumeRarity.length > 0) {
        if (
          costumeRarity.includes(costume.costume.rarity) &&
          weaponType.includes(costume.costume.weaponType)
        ) {
          isMatch = true;
        }
      } else {
        if (
          costumeRarity.includes(costume.costume.rarity) ||
          weaponType.includes(costume.costume.weaponType)
        ) {
          isMatch = true;
        }
      }

      return isMatch;
    });

    return filteredCostumes;
  }

  function handleRarityCheckbox(value) {
    if (costumeRarity.includes(value)) {
      setCostumeRarity(costumeRarity.filter((rarity) => rarity !== value));
    } else {
      setCostumeRarity([...costumeRarity, value]);
    }
  }

  function handleWeaponTypeCheckbox(value) {
    if (weaponType.includes(value)) {
      setWeaponType(weaponType.filter((type) => type !== value));
    } else {
      setWeaponType([...weaponType, value]);
    }
  }

  return (
    <Layout>
      <Meta
        title="Costumes - Database"
        description="Search through all costumes in the game."
        cover="https://nierrein.guide/database/costumes.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Database</span>
          </a>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">Costumes</h2>

        <form className="flex flex-col lg:flex-row gap-8 mb-8 lg:h-32">
          {/* Costume Rarity Filter */}
          <div className="flex flex-col flex-wrap items-start gap-4">
            <div className="flex items-center gap-x-4">
              <Checkbox
                isChecked={costumeRarity.includes("RARE")}
                setState={() => handleRarityCheckbox("RARE")}
              >
                {Array.from({ length: RARITY["RARE"] }).map((_, index) => (
                  <div className="w-8 h-8" key={index}>
                    <Star rarity={RARITY["RARE"]} />
                  </div>
                ))}
              </Checkbox>
            </div>
            <div className="flex items-center gap-x-4">
              <Checkbox
                isChecked={costumeRarity.includes("S_RARE")}
                setState={() => handleRarityCheckbox("S_RARE")}
              >
                {Array.from({ length: RARITY["S_RARE"] }).map((_, index) => (
                  <div className="w-8 h-8" key={index}>
                    <Star rarity={RARITY["S_RARE"]} />
                  </div>
                ))}
              </Checkbox>
            </div>
            <div className="flex items-center gap-x-4">
              <Checkbox
                isChecked={costumeRarity.includes("SS_RARE")}
                setState={() => handleRarityCheckbox("SS_RARE")}
              >
                {Array.from({ length: RARITY["SS_RARE"] }).map((_, index) => (
                  <div className="w-8 h-8" key={index}>
                    <Star rarity={RARITY["SS_RARE"]} />
                  </div>
                ))}
              </Checkbox>
            </div>
          </div>

          {/* Weapon Type Filter */}
          <div className="flex flex-col flex-wrap gap-4">
            {weaponTypes.map((type) => (
              <div key={type} className="flex gap-x-4">
                <Checkbox
                  isChecked={weaponType.includes(type)}
                  setState={() => handleWeaponTypeCheckbox(type)}
                >
                  <div className="h-8 w-8 relative">
                    <Image
                      layout="responsive"
                      src={weaponsIcons[type]}
                      alt={type}
                    />
                  </div>
                </Checkbox>
              </div>
            ))}
          </div>
        </form>

        <p className="mb-4 text-beige">
          {filteredCostumes.length} costumes found.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-8 lg:gap-20">
          {filteredCostumes.map((costume) => (
            <Link
              key={costume.ids.costume}
              href={`/characters/${slugify(costume.character.en, {
                lower: true,
              })}/${slugify(costume.costume.name.en, {
                lower: true,
              })}`}
              passHref
            >
              <a className="group flex flex-col items-center focus:border border-beige-active">
                <CostumeThumbnail
                  className="transform group-hover:scale-105 ease-out-cubic transition-transform"
                  src={`/character/thumbnails/${costume.ids.actor}_thumbnail.png`}
                  rarity={costume.costume.rarity}
                  weaponType={costume.costume.weaponType}
                  alt={`${costume.costume.name.en} thumbnail`}
                />
                <p className="text-sm mt-2">
                  {costume?.costume?.name?.en?.includes("Reborn") && (
                    <span className="text-rarity-4">EX </span>
                  )}
                  {costume.character.en}
                </p>
                <p className="text-center text-xs">{costume.costume.name.en}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const allCostumes = await getAllCostumes({
    allStats: false,
  });

  return {
    props: {
      allCostumes: JSON.stringify(allCostumes),
    },
  };
}
