import Meta from "@components/Meta";
import Layout from "@components/Layout";
import prisma from "@libs/prisma";
import dynamic from "next/dynamic";
import { notification } from "@prisma/client";

const NotificationsWithNoSSR = dynamic(
  () => import("../components/Notifications"),
  {
    ssr: false,
  }
);

interface NoticesProps {
  notifications: notification[];
}

export default function Events({ notifications }: NoticesProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Notices"
        description="A list of past and current in-game notices."
        cover="https://nierrein.guide/cover-notices.jpg"
      />

      <NotificationsWithNoSSR hasBtn={false} notifications={notifications} />
    </Layout>
  );
}

export async function getStaticProps() {
  console.log("Revalidating notices data props.");

  const notificationsData = await prisma.dump.notification.findMany({
    orderBy: {
      release_time: "desc",
    },
  });

  const notifications = notificationsData.map((notification) => ({
    ...notification,
    body: notification.body.replaceAll(
      "/images/",
      "https://web.app.nierreincarnation.com/images/"
    ),
  }));

  return {
    props: JSON.parse(
      JSON.stringify({
        notifications,
      })
    ),
    revalidate: 43200, // 12 hours in seconds (2 updates per day)
  };
}
