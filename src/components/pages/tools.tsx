import { TOOLS } from "@config/constants";
import classNames from "classnames";
import Image from "next/legacy/image";
import Link from "next/link";

function ListingTools() {
  return (
    <>
      {TOOLS.map((tool) => (
        <ListingItem
          key={tool.label}
          href={tool.href}
          src={tool.src}
          label={tool.label}
          classes={tool.class}
        />
      ))}
    </>
  );
}

function ListingItem({ href, src, label, classes }) {
  return (
    (<Link
      href={href}
      className={classNames(
        "flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105",
        classes
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

export default ListingTools;
