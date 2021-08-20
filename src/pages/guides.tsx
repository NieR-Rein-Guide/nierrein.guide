import Head from "next/head";
import Layout from "../Layout";
import { Tabs,TabList, TabPanels, TabPanel, Tab } from '@reach/tabs'
import SVG from 'react-inlinesvg'

const TOPICS = [
  'Getting started',
  'Rerolling',
  'Characters'
]

export default function Guides() {
  return (
    <Layout>
      <Head>
        <title>Guides - NieR Re[in] Guide</title>
      </Head>

      <Tabs>
        <TabList className="flex justify-around w-1/2 mx-auto">
          <Tab className="hover-bg px-4 py-2">Beginner</Tab>
          <Tab className="hover-bg px-4 py-2">Intermediate</Tab>
          <Tab className="hover-bg px-4 py-2">Advanced</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Beginner</p>
          </TabPanel>
          <TabPanel>
            <p>Intermediate</p>
          </TabPanel>
          <TabPanel>
            <p>Advanced</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <nav className="sidenav max-w-lg">
        <ul>
          <li className="text-2xl font-medium">Title</li>
          {TOPICS.map(topic => (
            <a key={topic} href="#">
              <li className="flex flex-wrap justify-between items-center gap-x-4">
                <span>{topic}</span>
                <SVG src="/decorations/right.svg" className="text-beige h-4" />
              </li>
            </a>
          ))}
        </ul>
      </nav>
    </Layout>
  );
}
