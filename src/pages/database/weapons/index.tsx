import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { CostumeRarity, ElementTypes, Weapon, WeaponType } from "@models/types";
import Link from "next/link";
import Image from "next/image";
import SVG from "react-inlinesvg";
import Checkbox from "@components/form/Checkbox";
import urlSlug from "url-slug";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import weaponTypes from "@utils/weaponTypes";
import weaponsIcons from "@utils/weaponsIcons";
import RARITY from "@utils/rarity";
import ATTRIBUTES from "@utils/attributes";
import { getAllWeapons } from "@models/weapon";
import WeaponThumbnail from "@components/WeaponThumbnail";
import Star from "@components/decorations/Star";
import Element from "@components/Element";

interface DatabaseStoriesProps {
  allWeapons: string;
}

export default function Databaseweapons({
  allWeapons,
}: DatabaseStoriesProps): JSX.Element {
  const weapons: Weapon[] = JSON.parse(allWeapons).reverse();

  const [filteredWeapons, setFilteredWeapons] = useState(weapons);
  const [weaponRarity, setWeaponRarity] = useState(new Set<CostumeRarity>());
  const [weaponType, setWeaponType] = useState(new Set<WeaponType>());
  const [weaponAttribute, setWeaponAttribute] = useState(
    new Set<ElementTypes>()
  );

  useEffect(() => {
    setFilteredWeapons(
      weapons.filter((weapon) => {
        return (
          (weaponRarity.size == 0 || weaponRarity.has(weapon.rarity)) &&
          (weaponType.size == 0 || weaponType.has(weapon.type)) &&
          (weaponAttribute.size == 0 || weaponAttribute.has(weapon.attribute))
        );
      })
    );
  }, [weaponRarity, weaponType, weaponAttribute]);

  function handleFor<T>(setter: Dispatch<SetStateAction<Set<T>>>, set: Set<T>) {
    return (value: T) => {
      // faster than has, then delete or add
      if (!set.delete(value)) {
        set.add(value);
      }
      setter(new Set(set));
    };
  }
  const handleRarityCheckbox = handleFor(setWeaponRarity, weaponRarity);
  const handleWeaponTypeCheckbox = handleFor(setWeaponType, weaponType);
  const handleWeaponAttributeCheckbox = handleFor(
    setWeaponAttribute,
    weaponAttribute
  );

  return (
    <Layout>
      <Meta
        title="Weapons - Database"
        description="All weapons in the game."
        cover="https://nierrein.guide/database/weapons.jpg"
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
        <h2 className="overlap">Weapons</h2>

        <form className="flex flex-col lg:flex-row gap-8 mb-8 lg:h-32">
          {/* Costume Rarity Filter */}
          <div className="flex flex-col flex-wrap items-start gap-4">
            <div className="flex items-center gap-x-4">
              <Checkbox
                isChecked={weaponRarity.has("RARE")}
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
                isChecked={weaponRarity.has("S_RARE")}
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
                isChecked={weaponRarity.has("SS_RARE")}
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

          <div className="flex flex-col gap-y-6">
            {/* Weapon Type Filter */}
            <div className="flex flex-wrap gap-4">
              {weaponTypes.map((type) => (
                <div key={type} className="flex gap-x-4">
                  <Checkbox
                    isChecked={weaponType.has(type)}
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

            {/* Weapon Attribute Filter */}
            <div className="flex flex-wrap gap-4">
              {ATTRIBUTES.map((attribute) => (
                <div key={attribute} className="flex gap-x-4">
                  <Checkbox
                    isChecked={weaponAttribute.has(attribute)}
                    setState={() => handleWeaponAttributeCheckbox(attribute)}
                  >
                    <div className="h-8 w-8 relative">
                      <Element type={attribute} />
                    </div>
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
        </form>

        <p className="mb-4 text-beige">
          {filteredWeapons.length} weapons found.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-8 lg:gap-20 px-2 md:px-8">
          {filteredWeapons.map((weapon) => (
            <Link
              href={`/database/weapons/${
                weapon.name.en ? urlSlug(weapon.name.en) : "unnamed"
              }/${weapon.ids.base}`}
              passHref
              key={weapon.ids.base}
            >
              <a className="flex flex-col justify-start items-center transform  ease-out-cubic transition-transform hover:scale-105">
                <WeaponThumbnail
                  id={weapon.ids.asset}
                  element={weapon.attribute}
                  rarity={weapon.rarity}
                  isDark={weapon.isDark}
                  type={weapon.type}
                  isLarge
                />
                <p className="text-center text-sm mt-2">
                  {weapon.isDark && (
                    <span className="block text-rarity-4">EX</span>
                  )}
                  {weapon.name.en ? weapon.name.en : "**Missing data**"}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allWeapons = await getAllWeapons();

  return {
    props: {
      allWeapons: JSON.stringify(allWeapons),
    },
  };
}
