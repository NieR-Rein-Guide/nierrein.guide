import Meta from "@components/Meta";
import Layout from "@components/Layout";
import Article from "@components/Article";
import { getAllGuides } from "@models/guide";
import { Guide } from "@models/types";
import Link from "next/link";
import Image from "next/image";
import SVG from "react-inlinesvg";

interface GuidesProps {
  guides: Guide[];
}

export default function Guides({ guides }: GuidesProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Guides"
        description="Learn several aspects of the game by reading our guides."
        cover="https://nierrein.guide/cover-guides.jpg"
      />

      <Link href="/faq" passHref>
        <a className="inline-block mx-auto">
          <div className="mb-20 flex items-center">
            <Image src={`/mama.png`} alt="Mama" height="60" width="60" />
            <span className="relative bordered text-xl ml-4 bg-grey-lighter hover:bg-grey-dark p-8 transition-colors ease-out-cubic">
              Read our FAQ
            </span>
          </div>
        </a>
      </Link>

      <section>
        <h2 className="overlap">Guides</h2>

        <div className="flex flex-col gap-y-14 xl:gap-y-24 mt-4 ml-16 sm:ml-16 lg:ml-36">
          {guides.map((guide) => (
            <Article
              key={guide.slug}
              title={guide.title}
              author={guide.author}
              date={guide.updated_at}
              excerpt={guide.description}
              slug={guide.slug}
              image={guide?.thumbnail?.formats}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link href="/guides" passHref={true}>
            <a className="btn">Show More</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const guides = await getAllGuides();

  return {
    props: {
      guides,
    },
    revalidate: 60,
  };
}
