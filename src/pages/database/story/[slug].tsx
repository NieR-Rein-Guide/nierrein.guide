import SVG from "react-inlinesvg";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Corners from "@components/decorations/Corners";
import Link from "next/link";
import { Story } from "@models/types";
import marked from "marked";
import { useRouter } from "next/router";
import { getAllStories, getStory } from "@models/stories";

interface StoryProps {
  story: Story;
}

export default function SingleGuide({ story }: StoryProps): JSX.Element {
  const router = useRouter();

  return (
    <Layout>
      {!router.isFallback && (
        <Meta
          title={`${story.title} - story`}
          description={`Read this story to learn more about : ${story.title}`}
          cover={
            story?.cover?.formats.medium.url ??
            "https://nierrein.guide/cover-story.jpg"
          }
        />
      )}

      <nav className="mb-8">
        <Link href="/database/stories" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/left.svg" className="h-6" />
            <span>Go back to all Stories</span>
          </a>
        </Link>
      </nav>

      {(router.isFallback && <p>Loading...</p>) || (
        <>
          <div className="grid grid-cols-1 items-center mb-8">
            <h2 className="text-5xl md:text-7xl text-beige">{story.title}</h2>
          </div>

          <article className="relative p-4 py-8 md:p-8 bg-grey-lighter border border-opacity-40">
            <Corners />

            <div
              className="wysiwyg"
              dangerouslySetInnerHTML={{ __html: marked(story.content) }}
            ></div>
          </article>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const story = await getStory(context.params.slug);

  return {
    props: {
      story,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const stories = await getAllStories();

  const paths = stories.map((story) => ({
    params: { slug: story.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
