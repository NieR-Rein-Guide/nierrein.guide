import Head from "next/head";
import Layout from "../src/Layout";
import dynamic from 'next/dynamic'

const ModelWithNoSSR = dynamic(
  () => import('../components/Model'),
  { ssr: false }
)

export default function Database() {
  return (
    <Layout>
      <Head>
        <title>Database - NieR Re[in] Guide</title>
      </Head>

      <div className="w-full h-96">
        <ModelWithNoSSR />
      </div>
    </Layout>
  );
}
