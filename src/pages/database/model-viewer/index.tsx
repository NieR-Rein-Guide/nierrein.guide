import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure";
import dynamic from "next/dynamic";
import { listFolders, listModelsTypes } from "@libs/s3";
import Layout from "@components/Layout";
import ErrorBoundary from "@components/Error";
import Meta from "@components/Meta";
import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import SVG from "react-inlinesvg";
import getModelPath from "@utils/getModelPath";

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
        title="3D Model viewer"
        description="View all models of the game"
        cover="https://nierrein.guide/cover-model-viewer.jpg"
      />

      <nav className="mb-8">
        <Link href="/database" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Go back to Database</span>
          </a>
        </Link>
      </nav>

      <section className="mt-8">
        <h2 className="overlap">Select a model</h2>

        <Disclosure>
          <div className="flex justify-between items-center">
            <h3 className="text-3xl">
              This page is currently <b>experimental</b>.
            </h3>

            <DisclosureButton className="bg-grey-foreground py-4 px-4 relative bordered">
              How to use the model viewer?
            </DisclosureButton>
          </div>

          <DisclosurePanel>
            <div className="mt-8 wysiwyg w-full">
              <p>
                Select a category of models, then click "previous" or "next" to
                change the model.
              </p>

              <p>
                Please enable <code>Hardware Acceleration</code> on your browser
                for better performance.
              </p>

              <h3>Known issues :</h3>
              <ul>
                <li>UX is not good at the moment</li>
                <li>If you cannot see the model it is likely off camera</li>
              </ul>

              <h3>How to use ?</h3>
              <ol>
                <li>Scroll to zoom in/out</li>
                <li>Left click + drag to rotate</li>
                <li>Right click + drag to move the model</li>
              </ol>
            </div>
          </DisclosurePanel>
        </Disclosure>

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

        <div className="grid grid-cols-3 mt-4 w-1/2 gap-x-4 mx-auto">
          <button
            className="btn justify-center bg-beige text-black"
            onClick={previousModel}
          >
            Previous
          </button>
          <input
            className="text-center"
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
      </section>

      <ErrorBoundary>
        <div style={{ height: "50vh" }}>
          <ModelWithNoSSR path={path} />
        </div>
      </ErrorBoundary>
    </Layout>
  );
}

export async function getStaticProps() {
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
    revalidate: 86400,
  };
}

function formatObjectName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace("/", "");
}
