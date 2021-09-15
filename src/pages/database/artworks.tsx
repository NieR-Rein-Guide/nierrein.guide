import { readdir } from "fs/promises";
import { resolve } from "path";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import Image from "next/image";

interface DatabaseStoriesProps {
  characters: string[];
  thumbnails: string[];
}

export default function DatabaseStories({
  characters,
  thumbnails,
}: DatabaseStoriesProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Artworks - Database"
        description="Index of stories in the game."
        cover="https://nierrein.guide/cover-database.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Database</span>
          </a>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">Assets Artworks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-8 lg:gap-20">
          {thumbnails.map((thumbnail, index) => (
            <div className="h-96 w-auto relative" key={thumbnail}>
              <Link href={`/character/${characters[index]}`} passHref={true}>
                <a>
                  <Image
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    src={`/character_thumbnails/${thumbnail}`}
                    alt={`${thumbnail}`}
                  />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const charactersFolder = resolve(process.cwd(), "public", "character");
  const thumbnailsCharactersFolder = resolve(
    process.cwd(),
    "public",
    "character_thumbnails"
  );

  const [characters, thumbnails] = await Promise.all([
    readdir(charactersFolder),
    readdir(thumbnailsCharactersFolder),
  ]);

  const filteredCharacters = characters.filter(
    (file) => file.endsWith(".png") || file.endsWith(".jpg")
  );

  const filteredThumbnails = thumbnails.filter(
    (file) => file.endsWith(".png") || file.endsWith(".jpg")
  );

  return {
    props: {
      characters: filteredCharacters,
      thumbnails: filteredThumbnails,
    },
  };
}
