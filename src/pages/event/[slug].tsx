import SVG from "react-inlinesvg";
import Image from "next/legacy/image";
import Link from "next/link";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Corners from "@components/decorations/Corners";
import { marked } from "marked";
import { useRouter } from "next/router";
import { Event } from "@models/types";
import { getAllEvents, getEventBySlug } from "@models/event";
import Lines from "@components/decorations/Lines";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import prisma from "@libs/prisma";
import { character, costume } from "@prisma/client";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { AiOutlinePushpin } from "react-icons/ai";
import classNames from "classnames";
import { CDN_URL } from "@config/constants";
import Checkbox from "@components/form/Checkbox";
import { usePanelStore } from "@store/panels";
import { useInventoryStore } from "@store/inventory";

interface eventProps {
  event: Event;
  costumes: (costume & {
    character: character;
  })[];
}

export default function SingleEvent({
  event,
  costumes,
}: eventProps): JSX.Element {
  const router = useRouter();
  const addCostumePanel = usePanelStore((state) => state.addCostume);
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const toggleFromInventory = useInventoryStore((state) => state.toggleCostume);

  return (
    <Layout>
      {!router.isFallback && (
        <Meta
          title={`${event.attributes.title} - Event`}
          description={`Read this event to learn more about : ${event.attributes.title}`}
          cover={
            event?.attributes.image.data.attributes.formats.medium?.url ??
            "https://nierrein.event/cover-events.jpg"
          }
        />
      )}

      <nav className="mb-8">
        <Link href="/events" passHref={true} className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Go back</span>
        </Link>
      </nav>

      {(router.isFallback && <p>Loading...</p>) || (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center mb-8">
            <div>
              <h2 className="text-5xl md:text-7xl text-beige mb-8">
                {event.attributes.title}
              </h2>
            </div>

            <Image
              layout="responsive"
              src={
                event.attributes.image.data.attributes?.formats?.large?.url ??
                event.attributes.image.data.attributes?.formats?.medium?.url ??
                event.attributes.image.data.attributes?.formats?.small?.url
              }
              alt={`${event.attributes.title} thumbnail`}
              height={
                event.attributes.image.data.attributes?.formats?.large
                  ?.height ??
                event.attributes.image.data.attributes?.formats?.medium
                  ?.height ??
                event.attributes.image.data.attributes?.formats?.small?.height
              }
              width={
                event.attributes.image.data.attributes?.formats?.large?.width ??
                event.attributes.image.data.attributes?.formats?.medium
                  ?.width ??
                event.attributes.image.data.attributes?.formats?.small?.width
              }
            />
          </div>

          <div className="my-8">
            <Lines containerClass="flex-col items-center justify-center">
              {Date.now() <=
                new Date(event.attributes.start_date).getTime() && (
                <h3 className="text-3xl text-beige-active">
                  Event starts{" "}
                  {formatDistanceToNow(new Date(event.attributes.start_date), {
                    addSuffix: true,
                  })}
                </h3>
              )}

              {(Date.now() >= new Date(event.attributes.end_date).getTime() && (
                <h3 className="text-2xl text-beige">
                  Event ended the{" "}
                  {new Date(event.attributes.end_date).toLocaleDateString()}
                </h3>
              )) || (
                <h3 className="text-2xl text-beige">
                  Event ends{" "}
                  {formatDistanceToNow(new Date(event.attributes.end_date), {
                    addSuffix: true,
                  })}
                </h3>
              )}

              <span className="text-beige-inactive">
                Event period:{" "}
                {differenceInDays(
                  new Date(event.attributes.end_date),
                  new Date(event.attributes.start_date)
                )}{" "}
                days
              </span>
            </Lines>
          </div>

          {costumes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-display">Obtainable costumes</h2>

              <div className="grid grid-cols-2 xs:grid-cols-3 place-items-center md:grid-cols-4 lg:grid-cols-6 gap-8 pt-8">
                {costumes.map((cost) => (
                  <div
                    className={classNames("group relative")}
                    key={cost.costume_id}
                  >
                    <div className="relative flex flex-col items-center justify-center gap-y-2 font-mono mb-2">
                      <p className="text-center text-sm mb-0 leading-none">
                        {cost.is_ex_costume && (
                          <span className="text-rarity-4">EX </span>
                        )}
                        {cost.character.name}
                      </p>
                      <span className="text-xs text-center text-beige line-clamp-1 leading-none transition-opacity ease-out-cubic group-hover:opacity-0 -mt-1 pb-2">
                        {cost.title}
                      </span>
                      <button
                        onClick={() => addCostumePanel(cost.costume_id)}
                        className="absolute bottom-1 flex gap-x-1 rounded-full bg-brown px-2 py-1 transition hover:bg-opacity-80 ease-out-cubic translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 umami--click--pin-costume-button"
                      >
                        <AiOutlinePushpin />
                        <span className="text-xs">PIN</span>
                      </button>
                    </div>
                    <CostumeThumbnail
                      src={`${CDN_URL}${cost.image_path_base}portrait.png`}
                      alt={cost.title}
                      weaponType={cost.weapon_type}
                      rarity={cost.rarity}
                      isLarge
                      isDark={cost.is_ex_costume}
                      className="group"
                      imgClasses="transform transition-transform ease-out-cubic group-hover:scale-110"
                    >
                      <Link
                        href={`/characters/${cost.character.slug}/${cost.slug}`}
                        passHref
                        className="absolute inset-0 z-10"
                      >
                        <span className="sr-only">
                          See more about {cost.title}
                        </span>
                      </Link>
                    </CostumeThumbnail>
                    <div className="bg-grey-dark border border-beige border-opacity-50 h-12 flex items-center pt-2 justify-center">
                      <Checkbox
                        label={
                          ownedCostumes.includes(cost.costume_id)
                            ? "Owned"
                            : "Owned?"
                        }
                        isChecked={ownedCostumes.includes(cost.costume_id)}
                        setState={() => toggleFromInventory(cost.costume_id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <article className="relative py-8 px-4 lg:p-8 border border-opacity-40">
            <Corners />

            <div
              className="wysiwyg"
              dangerouslySetInnerHTML={{
                __html: marked(
                  event.attributes.content
                    ? event.attributes.content
                    : "## No content yet."
                ),
              }}
            ></div>
          </article>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const event = await getEventBySlug(context.params.slug);

  const linked = await prisma.nrg.costumes_link.findMany({
    where: {
      events: {
        array_contains: [Number(event.id)],
      },
    },
  });

  const costumes = await prisma.dump.costume.findMany({
    where: {
      costume_id: {
        in: linked.map((link) => link.costume_id),
      },
    },
    include: {
      character: true,
    },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        event,
        costumes,
      })
    ),
    revalidate: 30, // Revalidate every 30s
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents({});

  const paths = events.map((event) => ({
    params: { slug: event.attributes.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
