import { readdir } from "fs/promises";
import { resolve } from "path";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import Image from "next/image";

interface DatabaseStoriesProps {
  files: string[];
  folder: string;
}

export default function DatabaseStories({
  files,
  folder,
}: DatabaseStoriesProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title={`${folder} - Database`}
        description={`${folder} assets`}
        cover="https://nierrein.guide/cover-assets.jpg"
      />

      <nav className="mb-16">
        <Link href="/database/assets" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Assets</span>
          </a>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">Assets {folder}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-8 lg:gap-20">
          {files.map((file) => (
            <div className="h-40 w-auto relative" key={file}>
              <Image
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                src={`/ui/${folder}/${file}`}
                alt={`${file}`}
              />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const uiFolder = resolve(
    process.cwd(),
    "public",
    "ui",
    context.params.folder
  );

  const files = await readdir(uiFolder);

  const filteredFiles = files.filter(
    (file) => file.endsWith(".png") || file.endsWith(".jpg")
  );

  return {
    props: {
      files: filteredFiles,
      folder: context.params.folder,
    },
  };
}

export async function getStaticPaths() {
  const uiFolder = resolve(process.cwd(), "public", "ui");

  const folders = await readdir(uiFolder);

  const paths = folders.map((folder) => ({
    params: {
      folder,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
