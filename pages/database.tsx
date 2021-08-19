import { Bound } from 'react'
import Head from "next/head";
import Layout from "../src/Layout";
import dynamic from 'next/dynamic'
import ErrorBoundary from '../components/Error'

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

      <ErrorBoundary>
        <div className="h-screen">
          <ModelWithNoSSR path="/model/model.fbx" />
        </div>
      </ErrorBoundary>
    </Layout>
  );
}
