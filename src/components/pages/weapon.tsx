/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import React, { useState } from "react";
import { CDN_URL } from "@config/constants";
import WeaponInfo from "@components/WeaponInfo";
import Link from "next/link";
import SVG from "react-inlinesvg";
import {
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
  weapon_story,
  weapon_story_link,
} from "@prisma/client";
import Radio from "@components/form/Radio";
import Slider from "rc-slider";
import { Event } from "../../models/types";

interface CharactersPageProps {
  weapon: (weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
    weapon_story_link: (weapon_story_link & {
      weapon_story: weapon_story;
    })[];
  })[];
  events: Event[];
}

export default function WeaponPage({
  weapon,
  events,
}: CharactersPageProps): JSX.Element {
  const lastStageWeapon = weapon[weapon.length - 1];
  const [skillLevel, setSkillLevel] = useState(15);
  const [evolutionStage, setEvolutionStage] = useState(weapon.length - 1);

  return (
    <Layout>
      <Meta
        title={`${lastStageWeapon.name}`}
        description={lastStageWeapon.weapon_story_link[0].weapon_story.story}
        cover={`${CDN_URL}${lastStageWeapon.image_path}full.png`}
      />

      <nav className="flex flex-col md:flex-row items-center justify-between gap-2 mb-4">
        <Link href="/weapons" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Weapons</span>
          </a>
        </Link>

        <div className="flex items-center flex-wrap justify-around gap-4 bg-grey-dark px-4 py-6 mb-6 bordered relative">
          <div className="hidden md:block mr-4 w-32">
            <p className="text-beige">Skill Lv. {skillLevel}</p>
            <Slider
              value={skillLevel}
              className="mt-2 xl:mt-0 max-w-lg"
              min={1}
              max={15}
              onChange={(value) => setSkillLevel(value)}
            />
          </div>

          {(weapon[0].is_ex_weapon && (
            <>
              <Radio
                name="Stage 1"
                value={0}
                isChecked={evolutionStage === 0}
                setState={setEvolutionStage}
              />

              <Radio
                name="Stage 5"
                value={4}
                isChecked={evolutionStage === 4}
                setState={setEvolutionStage}
              />

              <Radio
                name="Stage 8"
                value={7}
                isChecked={evolutionStage === 7}
                setState={setEvolutionStage}
              />

              <Radio
                name="Final Stage"
                value={10}
                isChecked={evolutionStage === 10}
                setState={setEvolutionStage}
              />
            </>
          )) || (
            <>
              <Radio
                name="Non evolved"
                value={0}
                isChecked={evolutionStage === 0}
                setState={setEvolutionStage}
              />

              <Radio
                name="Evolved"
                value={1}
                isChecked={evolutionStage === 1}
                setState={setEvolutionStage}
              />
            </>
          )}
        </div>
      </nav>

      <WeaponInfo
        weapons={weapon}
        evolutionStage={evolutionStage}
        abilityLevel={skillLevel}
        skillLevel={skillLevel}
        events={events}
      />
    </Layout>
  );
}
