import dynamic from "next/dynamic";
import Image from "next/image";

import launchedImage from "../../public/launched.jpg";

import Layout from "@components/Layout";
import Socials from "@components/Socials";
import JoinUs from "@components/JoinUs";
import CurrentlyWorkingOn from "@components/CurrentlyWorkingOn";
import Meta from "@components/Meta";

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
      <Meta />

      <div>
        <Image
          src={launchedImage}
          placeholder="blur"
          alt="NieR Re[in]carnation Launched !"
        />
      </div>

      <div className="flex flex-col gap-y-24 mt-24">
        <GuerillaTimersWithNoSSR />
        <DailyInfoWithNoSSR />
        <CurrentlyWorkingOn />
        <JoinUs />
        <Socials />
      </div>
    </Layout>
  );
}
