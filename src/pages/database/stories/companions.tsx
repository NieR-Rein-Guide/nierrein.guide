import Layout from "@components/Layout";
import Meta from "@components/Meta";
import prisma from "@libs/prisma";
import { companion } from "@prisma/client";
import CompanionThumbnail from "@components/CompanionThumbnail";
import StoriesLayout from "@components/Layout/StoriesLayout";

interface DatabaseStoriesCompanionsProps {
  allCompanions: companion[];
}

export default function DatabaseStoriesCompanions({
  allCompanions,
}: DatabaseStoriesCompanionsProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Companions Stories - Database"
        description="Companions stories."
        cover="https://nierrein.guide/cover-stories.jpg"
      />

      <StoriesLayout>
        <div>
          {allCompanions
            .map((companion) => (
              <div
                key={companion.companion_id}
                className="lg:col-start-3 lg:col-span-8 flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4"
              >
                <div className="ml-auto mr-auto mb-4 md:mb-0 md:ml-0 md:mr-0">
                  <CompanionThumbnail companion={companion} small />
                </div>
                <div>
                  <h3 className="font-labor text-center md:text-left md:text-lg text-beige mb-1">
                    {companion.name}
                  </h3>
                  <div
                    className="text-beige-text whitespace-pre-wrap text-base mt-2 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: companion.story.replaceAll("\\n", "<br>"),
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </StoriesLayout>
    </Layout>
  );
}

export async function getStaticProps() {
  const allCompanions = await prisma.dump.companion.findMany();

  return {
    props: JSON.parse(
      JSON.stringify({
        allCompanions,
      })
    ),
  };
}
