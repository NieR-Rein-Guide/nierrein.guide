import { Tabs, TabList, TabPanels, TabPanel, Tab } from "@reach/tabs";
import dynamic from "next/dynamic";
import { listFolders, listModelsTypes } from "@libs/s3";
import Layout from "@components/Layout";
import ErrorBoundary from "@components/Error";
import Meta from "@components/Meta";
import { useState } from "react";
import classNames from "classnames";
import { useEffect } from "react";

const ModelWithNoSSR = dynamic(() => import("@components/Model"), {
  ssr: false,
});

interface Model {
  Prefix: string; // folder name of the 3D model
}

interface ModelType {
  displayName: string; // The root folder name capitalized
  models: Model[];
}

interface DatabasePageProps {
  models: ModelType[];
}

function getModelPath(type = "character", folderName = "sk_ch031001") {
  return `https://s3.eu-central-1.wasabisys.com/models/${type}/${folderName}/${folderName}.fbx`;
}

export default function Database({ models }: DatabasePageProps): JSX.Element {
  // Character, Companion, Misc, Monster, Weapon
  const [selectedModelType, setSelectedModelType] = useState(models[0]);

  // The index of the 3D model
  const [currentIndex, setCurrentIndex] = useState(0);

  // The 3D model path to load
  const [path, setPath] = useState(getModelPath());

  useEffect(() => {
    const modelType = models.find(
      (model) => model.displayName === selectedModelType.displayName
    );
    const Prefix = modelType.models[currentIndex].Prefix;

    const [type, folderName] = Prefix.split("/");
    setPath(getModelPath(type, folderName));
  }, [currentIndex, models, selectedModelType]);

  function handleModelTypeClick(type) {
    setSelectedModelType(type);
    setCurrentIndex(0);
  }

  function nextModel() {
    if (selectedModelType.models.length - 1 === currentIndex) {
      return;
    }
    setCurrentIndex(currentIndex + 1);
  }

  function previousModel() {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex(currentIndex - 1);
  }

  return (
    <Layout>
      <Meta
        title="Database"
        description="3D Model Viewer (WIP : and all the materials, characters, weapons...)"
        cover="https://nierrein.guide/cover-database.jpg"
      />

      <Tabs defaultIndex={0}>
        <TabList className="flex justify-around w-1/2 mx-auto">
          <Tab index={0} className="hover-bg px-4 py-2">
            3D Models
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <section className="mt-8">
              <h2 className="overlap">Select a model</h2>

              <ul className="flex justify-center gap-4 mt-6">
                {models.map((model) => (
                  <li key={model.displayName}>
                    <button
                      onClick={() => handleModelTypeClick(model)}
                      className={classNames(
                        "btn",
                        model.displayName === selectedModelType.displayName
                          ? "active"
                          : null
                      )}
                    >
                      {model.displayName}s<br />({model.models.length} results)
                    </button>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 mt-4 w-1/2 mx-auto">
                <button
                  className="btn justify-center bg-beige text-black"
                  onClick={previousModel}
                >
                  Previous
                </button>
                <input
                  className="btn text-center"
                  type="text"
                  value={currentIndex}
                  placeholder="Model ID"
                  disabled
                />
                <button
                  className="btn justify-center bg-beige text-black"
                  onClick={nextModel}
                >
                  Next
                </button>
              </div>

              <div className="mt-4 wysiwyg">
                <h3>
                  This page is currently <b>experimental</b>.
                </h3>

                <p>
                  Please enable <code>Hardware Acceleration</code> on your
                  browser for better performance.
                </p>

                <h3>Known issues :</h3>
                <ul>
                  <li>
                    Previous button doesn't work, refresh the page to "fix"
                  </li>
                  <li>UX sucks. I'm sorry</li>
                  <li>
                    If you cannot see the model it is likely black on black or
                    off camera
                  </li>
                </ul>

                <h3>How to use ?</h3>
                <ol>
                  <li>Scroll to zoom in/out</li>
                  <li>Left click + drag to rotate</li>
                  <li>Right click + drag to move the model</li>
                </ol>
              </div>
            </section>

            <ErrorBoundary>
              <div style={{ height: "50vh" }}>
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
  const modelsTypes = await listModelsTypes();

  // Fetch all the subfolders (the models)
  const modelsFetches = modelsTypes.map((model) => listFolders(model));
  const modelsData = await Promise.all(modelsFetches);

  const models = modelsData.map((model) => ({
    displayName: formatObjectName(model.Prefix),
    name: model.Prefix,
    models: model.CommonPrefixes,
  }));

  return {
    props: {
      models,
    },
    revalidate: 60,
  };
}

function formatObjectName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace("/", "");
}
