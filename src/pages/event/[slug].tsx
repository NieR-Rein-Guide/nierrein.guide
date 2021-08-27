import SVG from "react-inlinesvg";
import Image from "next/image";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Corners from "@components/decorations/Corners";
import { formatDistanceToNow } from "date-fns";
import marked from "marked";
import { useRouter } from "next/router";
import { Event } from "@models/types";
import { getAllEvents, getEvent } from "@models/event";

interface eventProps {
  event: Event;
}

export default function SingleEvent({ event }: eventProps): JSX.Element {
  const router = useRouter();

  return (
    <Layout>
      {!router.isFallback && (
        <Meta
          title={`${event.title} - event`}
          description={`Read this event to learn more about : ${event.title}`}
          cover={
            event?.image.formats.medium?.url ??
            "https://nierrein.event/cover-events.jpg"
          }
        />
      )}

      <nav className="mb-8">
        <button onClick={router.back} className="btn">
          <SVG src="/decorations/left.svg" className="h-6" />
          <span>Go back</span>
        </button>
      </nav>

      {(router.isFallback && <p>Loading...</p>) || (
        <>
          <div className="grid grid-cols-1 items-center mb-8">
            <h2 className="text-5xl md:text-7xl text-beige mb-8">
              {event.title}
            </h2>
            <Image
              layout="responsive"
              src={
                event.image?.formats?.large?.url ??
                event.image?.formats?.medium?.url ??
                event.image?.formats?.small?.url
              }
              alt={`${event.title} thumbnail`}
              height={
                event.image?.formats?.large?.height ??
                event.image?.formats?.medium?.height ??
                event.image?.formats?.small?.height
              }
              width={
                event.image?.formats?.large?.width ??
                event.image?.formats?.medium?.width ??
                event.image?.formats?.small?.width
              }
            />
          </div>

          <article className="relative py-8 border border-opacity-40 px-8">
            <Corners />

            <div
              className="wysiwyg"
              dangerouslySetInnerHTML={{
                __html: marked(
                  event.content ? event.content : "## No content yet."
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
  const event = await getEvent(context.params.slug);

  return {
    props: {
      event,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
