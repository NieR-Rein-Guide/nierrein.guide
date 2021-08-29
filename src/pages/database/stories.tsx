import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { getAllStories } from "@models/stories";
import { Story } from "@models/types";
import Link from "next/link";
import SVG from "react-inlinesvg";
import Image from "next/image";
import coverStory from "../../../public/cover-story.jpg";

interface DatabaseStoriesProps {
  stories: Story[];
}

export default function DatabaseStories({
  stories,
}: DatabaseStoriesProps): JSX.Element {
  console.log(stories);

  return (
    <Layout>
      <Meta
        title="Stories - Database"
        description="Index of stories in the game."
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
        <h2 className="overlap">Stories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-8 lg:gap-20">
          {stories.map((story) => (
            <Link href={`/database/story/${story.slug}`} key={story.slug}>
              <a className="transform transition-transform ease-out-cubic hover:scale-105">
                <Image
                  objectFit="cover"
                  objectPosition="center"
                  src={
                    story.cover?.formats?.medium?.url ??
                    story.cover?.formats?.small?.url ??
                    story.cover?.formats?.thumbnail?.url ??
                    coverStory
                  }
                  alt="Cover"
                  height={1000}
                  width={600}
                />
                <h3 className="text-2xl lg:text-3xl mt-2 text-beige">
                  {story.title}
                </h3>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const stories = await getAllStories();

  return {
    props: {
      stories,
    },
    revalidate: 60,
  };
}
