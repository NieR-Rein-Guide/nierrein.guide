import SVG from "react-inlinesvg";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Corners from "@components/decorations/Corners";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { getAllGuides, getGuideBySlug } from "@models/guide";
import { Guide } from "@models/types";
import { marked } from "marked";
import { useRouter } from "next/router";

interface GuideProps {
  guide: Guide;
}

export default function SingleGuide({ guide }: GuideProps): JSX.Element {
  const router = useRouter();

  return (
    <Layout>
      {!router.isFallback && (
        <Meta
          title={`${guide.attributes.title} - Guide`}
          description={guide.attributes.description}
          cover={
            guide?.attributes.cover.data.attributes?.url ??
            "https://nierrein.guide/cover-guides.jpg"
          }
        />
      )}

      <nav className="mb-8">
        <Link href="/guides" passHref={true} className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Go back to all Guides</span>
        </Link>
      </nav>

      {(router.isFallback && <p>Loading...</p>) || (
        <>
          <div className="grid grid-cols-1 items-center mb-8">
            <h2 className="text-5xl md:text-7xl text-beige">
              {guide.attributes.title}
            </h2>

            <div className="flex flex-wrap justify-between gap-y-4 mt-4">
              <div className="flex items-center gap-x-4">
                <img
                  src="/ui/character/character001004_standard.png"
                  alt="Avatar"
                  className="rounded-full bg-beige h-10 w-10 md:h-12 md:w-12"
                  height="48"
                  width="48"
                />
                <p>
                  Written by{" "}
                  <span className="text-beige font-semibold">
                    {guide.attributes.author}
                  </span>
                </p>
              </div>

              <div className="md:text-right">
                {guide.attributes.updatedAt && (
                  <p>
                    Updated{" "}
                    {formatDistanceToNow(new Date(guide.attributes.updatedAt))}{" "}
                    ago
                  </p>
                )}
                <p>
                  Published{" "}
                  {new Date(guide.attributes.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <article className="relative p-4 py-8 md:p-8 bg-grey-lighter border border-opacity-40">
            <Corners />

            <div
              className="wysiwyg"
              dangerouslySetInnerHTML={{
                __html: marked(guide.attributes.content),
              }}
            ></div>
          </article>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const guide = await getGuideBySlug(context.params.slug);

  return {
    props: {
      guide,
    },
  };
}

export async function getStaticPaths() {
  const guides = await getAllGuides();

  const paths = guides.map((guide) => ({
    params: { slug: guide.attributes.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
