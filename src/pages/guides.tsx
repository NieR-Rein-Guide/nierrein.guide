import Head from "next/head";
import Layout from "@components/Layout";
import SVG from "react-inlinesvg";
import { GUIDES } from "@models/guide";
import { getAllGuides } from "@libs/api";
import { Guide } from "../types/models/guide";

interface GuidesProps {
  topics: Guide[];
}

export default function Guides({ topics }: GuidesProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Guides - NieR Re[in] Guide</title>
      </Head>

      <nav className="sidenav max-w-lg">
        <ul>
          <li className="text-2xl font-medium">Guide topics</li>
          {topics.map((topic) => (
            <a key={topic.title} href={`/guide/${topic.slug}`}>
              <li className="flex flex-wrap justify-between items-center gap-x-4">
                <span>{topic.title}</span>
                <SVG src="/decorations/right.svg" className="text-beige h-4" />
              </li>
            </a>
          ))}
        </ul>
      </nav>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const topics = (await getAllGuides()).map((guide) => ({
    slug: guide.slug,
    title: guide.title,
  }));

  return {
    props: {
      topics,
    },
  };
}
