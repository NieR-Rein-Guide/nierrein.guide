import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import Image from "next/legacy/image";

export default function DatabaseStories(): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Artworks - Database"
        description="Index of stories in the game."
        cover="https://nierrein.guide/cover-database.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true} className="btn">

          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Return to Database</span>

        </Link>
      </nav>

      <div className="bg-grey-dark text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center rounded-lg">
        <img
          className="inline-block"
          src="/decorations/fio-confused.png"
          alt="Fio confused"
        />
        <p className="mt-4">Sorry, this page is being reworked.</p>
        <div className="flex justify-center mt-4">
          <Link href="/characters" passHref className="btn">
            Go to characters page to see artworks
          </Link>
        </div>
      </div>
    </Layout>
  );
}
