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

  console.log(costumes);

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

        <div className="wysiwyg">
          <table>
            <tr>
              <th>Thumbnail</th>
              {costumes.map((costume) => (
                <td key={costume.ids.costume}>
                  <CostumeThumbnail
                    src={`/character/thumbnails/${costume.ids.actor}_thumbnail.png`}
                    rarity={costume.costume.rarity}
                    weaponType={costume.costume.weaponType}
                    alt=""
                  />

                  {/* <td className="text-sm mt-2">
                    {costume?.costume?.name?.en?.includes("Reborn") && (
                      <span className="text-rarity-4">EX </span>
                    )}
                    {costume.character.en}
                  </td>
                  <td className="text-xs">{costume.costume.name.en}</td> */}
                </td>
              ))}
            </tr>
            <tr>
              <th>Character</th>

              {costumes.map((costume) => (
                <td key={costume.ids.costume}>
                  {costume?.costume?.name?.en?.includes("Reborn") && (
                    <span className="text-rarity-4">EX </span>
                  )}
                  {costume.character.en}
                </td>
              ))}
            </tr>
            <tr>
              <th>Costume</th>

              {costumes.map((costume) => (
                <td key={costume.ids.costume} className="text-xs">
                  {costume.costume.name.en}
                </td>
              ))}
            </tr>

            <RowsOfStats costumes={costumes} level={1} />
            <RowsOfStats costumes={costumes} level={70} />
            <RowsOfStats costumes={costumes} level={75} />
            <RowsOfStats costumes={costumes} level={80} />
            <RowsOfStats costumes={costumes} level={85} />
            <RowsOfStats costumes={costumes} level={90} />
          </table>
        </div>
      </section>
    </Layout>
  );
}

function RowsOfStats({
  costumes,
  level,
}: {
  costumes: Costume[];
  level: number;
}): JSX.Element {
  return (
    <>
      <tr>
        <th>Level {level} Base Stats</th>
      </tr>
      <tr>
        <th>Level {level} : HP</th>
        {costumes.map((costume) => (
          <td key={costume.ids.costume} className="text-s">
            {costume.costume.stats[level].base.hp}
          </td>
        ))}
      </tr>
      <tr>
        <th>Level {level} : Attack</th>
        {costumes.map((costume) => (
          <td key={costume.ids.costume} className="text-s">
            {costume.costume.stats[level].base.atk}
          </td>
        ))}
      </tr>
      <tr>
        <th>Level {level} : Defense</th>
        {costumes.map((costume) => (
          <td key={costume.ids.costume} className="text-s">
            {costume.costume.stats[level].base.def}
          </td>
        ))}
      </tr>
      <tr>
        <th>Level {level} : Agility</th>
        {costumes.map((costume) => (
          <td key={costume.ids.costume} className="text-s">
            {costume.costume.stats[level].base.agility}
          </td>
        ))}
      </tr>
      <tr>
        <th>Level {level} : Critical Rate</th>
        {costumes.map((costume) => (
          <td key={costume.ids.costume} className="text-s">
            {costume.costume.stats[level].base.cr}
          </td>
        ))}
      </tr>
      <tr>
        <th>Level {level} : Critical Damage</th>
        {costumes.map((costume) => (
          <td key={costume.ids.costume} className="text-s">
            {costume.costume.stats[level].base.cd}
          </td>
        ))}
      </tr>
    </>
  );
}

export async function getStaticProps(context) {
  const allCostumes = await getAllCostumes({
    allStats: true,
  });

  return {
    props: {
      allCostumes: JSON.stringify(allCostumes),
    },
  };
}
