import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "next/image";

import launchedImage from "../../public/launched.jpg";

import Layout from "@components/Layout";
import Socials from "@components/Socials";
import JoinUs from "@components/JoinUs";
import CurrentlyWorkingOn from "@components/CurrentlyWorkingOn";

const GuerillaTimersWithNoSSR = dynamic(
  () => import("@components/GuerillaTimers"),
  { ssr: false }
);

const DailyInfoWithNoSSR = dynamic(() => import("../components/DailyInfo"), {
  ssr: false,
});

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>NieR Re[in] Global Guide & Database</title>
      </Head>

      <div>
        <Image
          src={launchedImage}
          placeholder="blur"
          alt="NieR Re[in]carnation Launched !"
        />
      </div>

      <div className="grid grid-cols-1 lg::grid-cols-2 gap-8 my-24">
        <GuerillaTimersWithNoSSR />
        <DailyInfoWithNoSSR />
        <CurrentlyWorkingOn />
        <JoinUs />
      </div>

      <Socials />
    </Layout>
  );
}
