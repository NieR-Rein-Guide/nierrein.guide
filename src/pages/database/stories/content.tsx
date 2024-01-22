import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { getAllStories } from "@models/stories";
import { Story } from "@models/types";
import Link from "next/link";
import Image from "next/legacy/image";
import coverStory from "../../../../public/cover-story.jpg";
import { StoriesNavbar } from "./index";

interface DatabaseStoriesProps {
  stories: Story[];
}

export default function DatabaseStories({
  stories,
}: DatabaseStoriesProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Stories - Database"
        description="CMS Content."
        cover="https://nierrein.guide/cover-database.jpg"
      />

      <section>
        <h2 className="overlap">Stories</h2>

        <StoriesNavbar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-8 lg:gap-20">
          {stories.map((story) => (
            <Link
              href={`/database/story/${story.attributes.slug}`}
              key={story.attributes.slug}
              className="transform transition-transform ease-out-cubic hover:scale-105"
            >
              <Image
                objectFit="cover"
                objectPosition="center"
                src={
                  story.attributes.cover?.data.attributes.formats?.medium
                    ?.url ??
                  story.attributes.cover?.data.attributes.formats?.small?.url ??
                  story.attributes.cover?.data.attributes.formats?.thumbnail
                    ?.url ??
                  coverStory
                }
                alt="Cover"
                height={1000}
                width={600}
              />
              <h3 className="text-2xl lg:text-3xl mt-2 text-beige">
                {story.attributes.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const stories = await getAllStories();

  return {
    props: {
      stories,
    },
  };
}
