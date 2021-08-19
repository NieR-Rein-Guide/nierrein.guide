import Head from "next/head";
import { Tabs,TabList, TabPanels, TabPanel, Tab } from '@reach/tabs'
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


      <Tabs defaultIndex={0}>
        <TabList className="flex justify-around w-1/2 mx-auto">
          <Tab index={0} className="hover-bg px-4 py-2">3D Models</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ErrorBoundary>
              <div className="h-screen">
                <ModelWithNoSSR path="/model/model.fbx" />
              </div>
            </ErrorBoundary>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
