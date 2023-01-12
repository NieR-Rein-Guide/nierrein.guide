import SVG from "react-inlinesvg";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Corners from "@components/decorations/Corners";
import Link from "next/link";
import { notification } from "@prisma/client";
import classNames from "classnames";
import prisma from "@libs/prisma";
import { formatDistanceToNow } from "date-fns";

interface SingleNoticeProps {
  notification: notification;
}

export default function SingleNotice({
  notification,
}: SingleNoticeProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title={`${notification.title} - Notice`}
        cover="https://nierrein.guide/cover-notices.jpg"
      />

      <nav className="mb-8">
        <Link href="/notices" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Go back to all notices</span>
          </a>
        </Link>
      </nav>

      <article className="relative p-4 py-8 md:p-8 bg-grey-lighter border border-beige border-opacity-50">
        <Corners />

        <div className="relative border border-beige border-opacity-50 mb-12">
          <div
            className={classNames(
              "flex flex-col md:flex-row md:items-center gap-x-4 bg-beige-darker filter hover:bg-grey-dark transition ease-out-cubic",
              !notification.thumbnail_path && "pt-4 md:p-4"
            )}
          >
            {notification.thumbnail_path && (
              <img
                className="h-28 object-contain mt-4 mb-2 md:mt-0 md:mb-0"
                loading="lazy"
                src={`https://web.app.nierreincarnation.com${notification.thumbnail_path}`}
                alt=""
              />
            )}
            <div className="flex flex-col items-center md:items-baseline">
              <h3 className="font-labor font-semibold text-base md:text-xl text-center md:text-left max-w-xs mx-auto md:mx-0 md:max-w-full">
                {notification.title}
              </h3>
              <time className="text-sm text-beige">
                {formatDistanceToNow(new Date(notification.release_time), {
                  addSuffix: true,
                })}
              </time>
            </div>
          </div>
        </div>

        <div
          className="notice__body"
          dangerouslySetInnerHTML={{
            __html: notification.body.replaceAll(
              "/images/",
              "https://web.app.nierreincarnation.com/images/"
            ),
          }}
        ></div>
      </article>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const notification = await prisma.nrg.notification.findFirst({
    where: {
      notification_id: Number(context.params.id),
    },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        notification,
      })
    ),
  };
}

export async function getStaticPaths() {
  const notifications = await prisma.nrg.notification.findMany({
    select: {
      notification_id: true,
    },
  });

  const paths = notifications.map((notification) => ({
    params: { id: `${notification.notification_id}` },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
