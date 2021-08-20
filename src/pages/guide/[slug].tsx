import Head from "next/head";
import SVG from "react-inlinesvg";
import Layout from "@components/Layout";
import Corners from "@components/decorations/Corners";
import Link from "next/link";
import { Guide } from "../../types/models/guide";
import { formatDistanceToNow } from "date-fns";

interface GuideProps {
  guide: Guide;
}

export default function SingleGuide({ guide }: GuideProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Guides - NieR Re[in] Guide</title>
      </Head>

      <nav className="mb-8">
        <Link href="/guides" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/left.svg" className="text-beige h-6" />
            <span>Go back to all Guides</span>
          </a>
        </Link>
      </nav>

      <div className="grid grid-cols-1 items-center mb-8">
        <h2 className="text-5xl md:text-7xl text-beige">{guide.title}</h2>

        <div className="flex flex-wrap justify-between gap-y-4 mt-4">
          <div className="flex items-center gap-x-4">
            <img
              src={guide.avatarUrl}
              alt="Avatar"
              className="rounded-full bg-beige h-10 md:h-12"
            />
            <p>Written by {guide.author}</p>
          </div>

          <div>
            {guide.updatedAt && (
              <p>
                Updated {formatDistanceToNow(new Date(guide.updatedAt))} ago
              </p>
            )}
            <p>Published {new Date(guide.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <article className="relative py-8 border border-opacity-40 px-8">
        <Corners />

        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        ></div>
      </article>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { GUIDES } = await import("@models/guide");
  const guide = GUIDES.find((guide) => guide.slug === context.params.slug);

  return {
    props: {
      guide,
    },
  };
}

export async function getStaticPaths() {
  const { GUIDES } = await import("@models/guide");
  const paths = GUIDES.map((guide) => ({
    params: { slug: guide.slug },
  }));

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}
