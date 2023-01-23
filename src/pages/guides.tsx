import Meta from "@components/Meta";
import Layout from "@components/Layout";
import Article from "@components/Article";
import { getAllGuides } from "@models/guide";
import { Guide } from "@models/types";
import Link from "next/link";
import Image from "next/image";
import { RECOMMENDED_YOUTUBE_CHANNELS } from "@config/constants";

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

      <section className="mb-24">
        <h2 className="overlap">Recommended YouTube channels</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {RECOMMENDED_YOUTUBE_CHANNELS.map((channel) => (
            <div
              className="relative p-4 bg-grey-dark border border-beige border-opacity-30 transition hover:border-opacity-80"
              key={channel.name}
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  className="h-16 w-16 rounded-full"
                  src={channel.avatarUrl}
                  alt={channel.name}
                />
                <h3 className="text-2xl">{channel.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {channel.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-brown rounded-2xl py-1 px-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                className="absolute inset-0"
                title={`Visit ${channel.name} channel`}
                href={channel.url}
              ></a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="overlap">Guides</h2>

        <div className="flex flex-col gap-y-14 xl:gap-y-24 mt-4 ml-16 sm:ml-16 lg:ml-36">
          {guides.map((guide) => (
            <Article
              key={guide.attributes.slug}
              title={guide.attributes.title}
              author={guide.attributes.author}
              date={guide.attributes.updatedAt}
              excerpt={guide.attributes.description}
              slug={guide.attributes.slug}
              image={guide.attributes?.thumbnail.data.attributes?.formats}
            />
          ))}
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
  };
}
