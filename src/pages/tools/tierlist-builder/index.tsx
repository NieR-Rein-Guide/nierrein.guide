import Meta from "@components/Meta";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/Layout";
import classNames from "classnames";

export default function TierlistBuilderChoices(): JSX.Element {
  return (
    <Layout className="justify-center">
      <Meta
        title="What kind of Tier list do you want to create?"
        description="Create a tierlist."
        cover="https://nierrein.guide/cover-tierlists.jpg"
      />

      <h2 className="font-display text-4xl text-beige mb-8 text-center">
        What kind of tierlist do you want to create?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ListingItem
          href="/tools/tierlist-builder/costumes"
          src="/tools/tierlist-costumes.jpg"
          label="Costumes"
        />
        <ListingItem
          href="/tools/tierlist-builder/weapons"
          src="/tools/tierlist-weapons.jpg"
          label="weapons"
        />
      </div>
    </Layout>
  );
}

function ListingItem({ href, src, label }) {
  return (
    (<Link
      href={href}
      className={classNames(
        "flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105"
      )}>

      <Image
        height={350}
        width={200}
        layout="fill"
        objectFit="cover"
        className="-z-1 filter brightness-50"
        src={src}
        alt={label}
      />
      <h3 className="text-2xl md:text-5xl font-bold tracking-wider text-beige text-shadow text-center px-16">
        {label}
      </h3>

    </Link>)
  );
}
