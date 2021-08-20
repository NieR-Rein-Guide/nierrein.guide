import Head from "next/head";
import dynamic from 'next/dynamic'

import Layout from "../src/Layout";
import Socials from "@components/Socials";
import JoinUs from "@components/JoinUs";

const GuerillaTimersWithNoSSR = dynamic(
  () => import('../src/components/GuerillaTimers'),
  { ssr: false }
)

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>NieR Re[in] Global Guide & Database</title>
      </Head>

      <div>
        <img src="/launched.jpg" alt="NieR Re[in]carnation Launched !" />
      </div>

      <div className="grid grid-cols-1 lg::grid-cols-2 gap-8 my-24">
        <GuerillaTimersWithNoSSR />
        <JoinUs />
      </div>

      <Socials />
    </Layout>
  );
}
