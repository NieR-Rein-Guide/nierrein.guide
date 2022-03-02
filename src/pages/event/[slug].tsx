import SVG from "react-inlinesvg";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Corners from "@components/decorations/Corners";
import marked from "marked";
import { useRouter } from "next/router";
import { Event } from "@models/types";
import { getAllEvents, getEvent } from "@models/event";
import Lines from "@components/decorations/Lines";
import { differenceInDays, formatDistanceToNow } from "date-fns";

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
        <Link href="/events" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Go back</span>
          </a>
        </Link>
      </nav>

      {(router.isFallback && <p>Loading...</p>) || (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center mb-8">
            <div>
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

            {event?.poll?.embed && (
              <div dangerouslySetInnerHTML={{ __html: event.poll.embed }}></div>
            )}
          </div>

          <div className="my-8">
            <Lines containerClass="flex-col items-center justify-center">
              {Date.now() <= new Date(event.start_date).getTime() && (
                <h3 className="text-3xl text-beige-active">
                  Event starts{" "}
                  {formatDistanceToNow(new Date(event.start_date), {
                    addSuffix: true,
                  })}
                </h3>
              )}

              {(Date.now() >= new Date(event.end_date).getTime() && (
                <h3 className="text-2xl text-beige">
                  Event ended the{" "}
                  {new Date(event.end_date).toLocaleDateString()}
                </h3>
              )) || (
                <h3 className="text-2xl text-beige">
                  Event ends{" "}
                  {formatDistanceToNow(new Date(event.end_date), {
                    addSuffix: true,
                  })}
                </h3>
              )}

              <span className="text-beige-inactive">
                Event period:{" "}
                {differenceInDays(
                  new Date(event.end_date),
                  new Date(event.start_date)
                )}{" "}
                days
              </span>
            </Lines>
          </div>

          <article className="relative py-8 px-4 lg:p-8 border border-opacity-40">
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
    revalidate: 86400,
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
