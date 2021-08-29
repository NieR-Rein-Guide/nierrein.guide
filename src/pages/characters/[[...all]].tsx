import Meta from "@components/Meta";
import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { CostumeInfo, getCharacters, typedCharacters } from "@models/character";
import { useEffect, useState } from "react";
import React from "react";
import CharacterCostumes from "@components/characters/CharacterCostumes";
import CharacterRows from "@components/characters/CharacterRows";
import CostumeSelect from "@components/characters/CostumeSelect";
import { useRouter } from "next/router";
import slugify from "slugify";

export default function Page({ characters }): JSX.Element {
  const router = useRouter();

  const defaultCostume = typedCharacters.values().next()
    .value[0] as CostumeInfo;

  const query = router.query.all;
  useEffect(() => {
    let newCostume: CostumeInfo;
    try {
      if (query) {
        if (query.length >= 2) {
          newCostume = Array.from(typedCharacters.values())
            .find(
              (costumes) =>
                slugify(costumes[0].character) == (query[0] as string)
            )
            .find(
              (costume) => slugify(costume.name.en) == (query[1] as string)
            );
        } else {
          newCostume = Array.from(typedCharacters.values()).find(
            (costumes) => slugify(costumes[0].character) == (query[0] as string)
          )[0];
        }
      } else {
        newCostume = typedCharacters.values().next().value[0] as CostumeInfo;
      }
    } catch (e) {
      newCostume = typedCharacters.values().next().value[0] as CostumeInfo;
    }
    setCostumeInternal(newCostume);
    history.replaceState(null, "", `/characters`);
  }, [query]);

  const [currentCostume, setCostumeInternal] = useState(defaultCostume);

  const setCostume = (costume: CostumeInfo) => {
    setCostumeInternal(costume);
    history.replaceState(
      null,
      "",
      `/characters/${slugify(costume.character)}/${slugify(costume.name.en)}`
    );
  };

  return (
    <Layout>
      <Meta
        title="Characters"
        description="All the costumes of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-characters.jpg"
      />

      <CharacterRows {...{ setCostume, currentCostume }} />
      <span className="hidden md:inline">
        <CharacterCostumes {...{ setCostume, currentCostume }} />
      </span>
      <span className="inline md:hidden">
        <CostumeSelect {...{ setCostume, currentCostume }} />
      </span>

      <CostumeDetails costume={currentCostume}></CostumeDetails>
    </Layout>
  );
}

export async function getStaticProps() {
  const characters = await getCharacters();

  return {
    props: {
      characters,
    },
  };
}
export async function getStaticPaths() {
  const paths = Array.from(typedCharacters.values())
    .flat()
    .map((costume) => ({
      params: { all: [slugify(costume.character), slugify(costume.name.en)] },
    }));

  return {
    paths,
    fallback: true,
  };
}
