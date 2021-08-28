import { Guide } from "@models/types";
import Article from "@components/Article";
import Link from "next/link";

// import defaultCover from "../../public/cover-guides.jpg";

export default function FeaturedGuides({
  guides = [],
}: {
  guides: Guide[];
}): JSX.Element {
  return (
    <section>
      <h2 className="overlap">Featured Guides</h2>

      <div className="flex flex-col gap-y-14 xl:gap-y-24 mt-4 ml-0 sm:ml-16 lg:ml-36">
        {guides.map((guide) => (
          <Article
            key={guide.slug}
            title={guide.title}
            author={guide.author}
            date={guide.updated_at}
            excerpt={
              "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without"
            }
            slug={guide.slug}
            image={guide.cover.formats}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Link href="/guides" passHref={true}>
          <a className="btn">Show More</a>
        </Link>
      </div>
    </section>
  );
}
