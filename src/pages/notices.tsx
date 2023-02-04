import Meta from "@components/Meta";
import Layout from "@components/Layout";
import prisma from "@libs/prisma";
import { notification } from "@prisma/client";
import Notifications from "../components/Notifications";

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

      <Notifications hasBtn={false} notifications={notifications} />
    </Layout>
  );
}

export async function getStaticProps() {
  console.log("Revalidating notices data props.");

  const notificationsData = await prisma.nrg.notification.findMany({
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
    revalidate: 30,
  };
}
