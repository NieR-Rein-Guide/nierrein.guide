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
          title={`${story.attributes.title} - story`}
          description={`Read this story to learn more about : ${story.attributes.title}`}
          cover={
            story?.attributes.cover?.data.attributes?.formats.medium?.url
              ? story?.attributes.cover?.data.attributes.formats?.medium?.url
              : "https://nierrein.guide/cover-story.jpg"
          }
        />
      )}

      <nav className="mb-8">
        <Link href="/database/stories" passHref={true} className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Go back to all Stories</span>
        </Link>
      </nav>

      {(router.isFallback && <p>Loading...</p>) || (
        <>
          <div className="grid grid-cols-1 items-center mb-8">
            <h2 className="text-5xl md:text-7xl text-beige">
              {story.attributes.title}
            </h2>
          </div>

          <article className="relative p-4 py-8 md:p-8 bg-grey-lighter border border-opacity-40">
            <Corners />

            <div
              className="wysiwyg"
              dangerouslySetInnerHTML={{
                __html: marked(story.attributes.content ?? "## No content"),
              }}
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
    revalidate: 86400,
  };
}

export async function getStaticPaths() {
  const stories = await getAllStories();

  const paths = stories.map((story) => ({
    params: { slug: story.attributes.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
