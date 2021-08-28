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

      <div className="mt-4">
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
