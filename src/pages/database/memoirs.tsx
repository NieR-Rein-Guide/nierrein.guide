import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { getAllMemoirs } from "@models/memoir";
import Link from "next/link";
import Image from "next/image";
import SVG from "react-inlinesvg";

interface DatabaseMemoirsProps {
  allMemoirs: string;
}

export default function Databaseweapons({
  allMemoirs,
}: DatabaseMemoirsProps): JSX.Element {
  const memoirs = JSON.parse(allMemoirs);

  return (
    <Layout>
      <Meta
        title="Memoirs - Database"
        description="All memoirs in the game."
        cover="https://nierrein.guide/database/memoirs.jpg"
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
        <h2 className="overlap">Memoirs</h2>

        {memoirs.map((memoir) => (
          <div className="mb-8" key={memoir.MemoirSeriesId}>
            <h3 className="text-beige text-3xl">
              {memoir.abilities[1].description}
            </h3>
            <span className="text-sm text-beige-text">
              Small set: {memoir.abilities[0].description}
            </span>

            <div className="flex flex-wrap gap-x-16 mt-4">
              {spliceIntoChunks(memoir.memoirs, 3).map((set) => (
                <div className="flex gap-x-2 mt-2" key={set[0].MemoirId}>
                  {set.map((memoir) => (
                    <div key={memoir.MemoirId}>
                      <Image
                        width={96}
                        height={96}
                        src={`/ui/memory/memory${String(
                          memoir.MemoirId
                        ).padStart(3, "0")}_full.png`}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}

function spliceIntoChunks(arr, chunkSize) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}

export async function getStaticProps() {
  const { series } = await getAllMemoirs();

  return {
    props: {
      allMemoirs: JSON.stringify(series),
    },
  };
}
