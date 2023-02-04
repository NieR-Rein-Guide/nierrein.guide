import { readdir } from "fs/promises";
import { resolve } from "path";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import Image from "next/image";

interface DatabaseStoriesProps {
  uiFolders: string[];
  uiFiles: string[];
}

export default function DatabaseStories({
  uiFolders,
  uiFiles,
}: DatabaseStoriesProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Assets - Database"
        description="List of assets"
        cover="https://nierrein.guide/cover-assets.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true} className="btn">

          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Return to Database</span>

        </Link>
      </nav>

      <section>
        <h2 className="overlap">Assets</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-8 lg:gap-20">
          {uiFolders.map((folder, index) => (
            (<Link
              href={`/database/assets/${folder}`}
              key={folder}
              className="bg-grey-foreground px-6 py-6 transform transition-transform ease-out-cubic hover:scale-105">

              <Image
                objectFit="cover"
                objectPosition="center"
                src={`/ui/${folder}/${uiFiles[index][0]}`}
                alt={`${folder} preview`}
                height={64}
                width={64}
              />
              <h3 className="text-2xl lg:text-3xl mt-2 text-beige">
                {`${folder.charAt(0).toUpperCase()}${folder.slice(
                  1
                )}`.replaceAll("_", " ")}
              </h3>

            </Link>)
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const uiFolder = resolve(process.cwd(), "public", "ui");

  const uiFolders = await readdir(uiFolder);

  const uiFilesFetches = uiFolders.map((folder) =>
    readdir(resolve(uiFolder, folder))
  );
  const uiFiles = await Promise.all(uiFilesFetches);

  const filteredFiles = uiFiles.map((folder) =>
    folder.filter((file) => file.endsWith(".png") || file.endsWith(".jpg"))
  );

  return {
    props: {
      uiFolders,
      uiFiles: filteredFiles,
    },
  };
}
