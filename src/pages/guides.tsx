import Meta from "@components/Meta";
import Layout from "@components/Layout";
import Article from "@components/Article";
import { getAllGuides } from "@models/guide";
import { Guide } from "@models/types";
import Link from "next/link";

import { RECOMMENDED_YOUTUBE_CHANNELS } from "@config/constants";
import classNames from "classnames";
import { RiYoutubeFill } from "react-icons/ri";

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

      <div className="grid items-start md:grid-cols-12" defaultValue="All">
        <div className="mt-12 md:mt-0 md:col-span-10">
          <section>
            <h2 className="overlap">Guides</h2>

            <div className="flex flex-col gap-y-14 xl:gap-y-24 mt-4 ml-16 sm:ml-16 lg:ml-36">
              <Link href="/faq" passHref className="inline-block">
                <div className="flex items-center">
                  <img src={`/mama.png`} alt="Mama" height="60" width="60" />
                  <span className="relative bordered text-xl ml-4 bg-grey-dark hover:bg-grey-lighter  p-8 transition-colors ease-out-cubic">
                    Read our FAQ
                  </span>
                </div>
              </Link>

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
        </div>

        <div className="md:col-span-2 md:sticky md:top-16">
          {RECOMMENDED_YOUTUBE_CHANNELS.map((channel) => (
            <div className="relative" key={channel.name}>
              {channel.isNotUpdated && (
                <span
                  className="absolute left-1/2 top-11 transform -translate-x-1/2 z-10 font-mono font-bold
                "
                >
                  Not active
                </span>
              )}
              <div
                className={classNames(
                  "relative p-4 bg-grey-dark border border-beige border-opacity-30 transition hover:border-opacity-80 flex flex-col items-center",
                  channel.isNotUpdated ? "filter brightness-30" : ""
                )}
              >
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={channel.avatarUrl}
                    alt={channel.name}
                  />
                  <RiYoutubeFill
                    className="absolute -right-2 -top-2 text-red-600"
                    size="32"
                  />
                </div>
                <h3 className="text-2xl">{channel.name}</h3>
                <div className="flex justify-center flex-wrap gap-2 mt-4">
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
            </div>
          ))}
        </div>
      </div>
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
