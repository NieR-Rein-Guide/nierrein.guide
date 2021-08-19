import Head from "next/head";
import { Tabs,TabList, TabPanels, TabPanel, Tab } from '@reach/tabs'
import dynamic from 'next/dynamic'
import { listFolders, listModelsTypes } from '../src/libs/s3'
import Layout from "../src/Layout";
import ErrorBoundary from '../components/Error'
import { useState } from "react";
import classNames from "classnames";
import { useEffect } from "react";

const ModelWithNoSSR = dynamic(
  () => import('../components/Model'),
  { ssr: false }
)

function getModelPath(type = 'character', folderName = 'sk_ch031001') {
  return `https://s3.eu-central-1.wasabisys.com/models/${type}/${folderName}/${folderName}.fbx`
}

export default function Database({ models }) {
  // Character, Companion, Misc, Monster, Weapon
  const [selectedModelType, setSelectedModelType] = useState(models[0].displayName)

  // The index of the 3D model
  const [currentIndex, setCurrentIndex] = useState(0)

  // The 3D model path to load
  const [path, setPath] = useState(getModelPath())

  useEffect(() => {
    const modelType = models.find(model => model.displayName === selectedModelType)
    const Prefix = modelType.models[currentIndex].Prefix
    console.log(Prefix)

    const [type, folderName] = Prefix.split('/')
    setPath(getModelPath(type, folderName))
  }, [currentIndex, models, selectedModelType])

  function handleModelTypeClick(type){
    setSelectedModelType(type)
    setCurrentIndex(0)
  }

  function nextModel() {
    setCurrentIndex(currentIndex + 1)
  }

  function previousModel() {
    if (currentIndex === 0) {
      return
    }

    setCurrentIndex(currentIndex - 1)
  }

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
            <section className="mt-8">
              <h2>Select a model</h2>

              <ul className="flex justify-center gap-4 mt-6">
                {models.map(model => (
                  <li key={model.displayName}>
                    <button onClick={() => handleModelTypeClick(model.displayName)} className={classNames('btn', model.displayName === selectedModelType ? 'active' : null)}>
                      {model.displayName}s<br/>({model.models.length} results)
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center mt-4">
                <button className="btn" onClick={previousModel}>Previous</button>
                <input
                  className="btn"
                  type="text"
                  value={currentIndex}
                  placeholder="Model ID"
                  disabled
                />
                <button className="btn" onClick={nextModel}>Next</button>
              </div>
            </section>

            <ErrorBoundary>
              <div style={{ height: '50vh' }}>
                <ModelWithNoSSR path={path} />
              </div>
            </ErrorBoundary>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

export async function getStaticProps(context) {
  // List all the models types (weapons, characters, ..)
  const modelsTypes = await listModelsTypes()

  // Fetch all the subfolders (the models)
  const modelsFetches = modelsTypes.map(model => listFolders(model))
  const modelsData = await Promise.all(modelsFetches)

  const models = modelsData.map(model => ({
    displayName: formatObjectName(model.Prefix),
    name: model.Prefix,
    models: model.CommonPrefixes
  }))

  return {
    props: {
      models,
    },
  }
}

function formatObjectName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace('/', '')
}