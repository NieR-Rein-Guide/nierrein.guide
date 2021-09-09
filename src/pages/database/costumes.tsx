import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { Costume } from "@models/types";
import Link from "next/link";
import SVG from "react-inlinesvg";
import { getAllCostumes } from "@models/character";
import CostumeThumbnail from "@components/CostumeThumbnail";

interface DatabaseStoriesProps {
  allCostumes: string;
}

export default function DatabaseCostumes({
  allCostumes,
}: DatabaseStoriesProps): JSX.Element {
  const costumes: Costume[] = JSON.parse(allCostumes);

  return (
    <Layout>
      <Meta
        title="Costumes - Database"
        description="Index of costumes in the game."
        cover="https://nierrein.guide/cover-database.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/left.svg" className="h-6" />
            <span>Return to Database</span>
          </a>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">Costumes</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 place-items-center gap-y-12 gap-8 lg:gap-20">
          {costumes.map((costume) => (
            <div
              className="flex flex-col items-center justify-center"
              key={costume.ids.costume}
            >
              <CostumeThumbnail
                src={`/character/thumbnails/${costume.ids.actor}_thumbnail.png`}
                rarity={costume.costume.rarity}
                weaponType={costume.costume.weaponType}
                alt=""
              />
              <p className="text-sm mt-2">
                {costume?.costume?.name?.en?.includes("Reborn") && (
                  <span className="text-rarity-4">EX </span>
                )}
                {costume.character.en}
              </p>
              <p className="text-xs">{costume.costume.name.en}</p>
            </div>
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
