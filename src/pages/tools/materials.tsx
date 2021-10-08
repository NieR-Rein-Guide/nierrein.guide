import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Image from "next/image";
import { useState } from "react";

const darkMaterials = [
  {
    stage: 2,
    jewels: 5,
    lights: 5,
    memories: 10,
    zenith: 0,
  },
  {
    stage: 3,
    jewels: 5,
    lights: 7,
    memories: 15,
    zenith: 0,
  },
  {
    stage: 4,
    jewels: 5,
    lights: 10,
    memories: 23,
    zenith: 0,
  },
  {
    stage: 5,
    jewels: 10,
    lights: 15,
    memories: 35,
    zenith: 1,
  },
  {
    stage: 6,
    jewels: 10,
    lights: 22,
    memories: 50,
    zenith: 1,
  },
  {
    stage: 7,
    jewels: 10,
    lights: 30,
    memories: 70,
    zenith: 1,
  },
  {
    stage: 8,
    jewels: 20,
    lights: 40,
    memories: 100,
    zenith: 2,
  },
  {
    stage: 9,
    jewels: 20,
    lights: 55,
    memories: 150,
    zenith: 2,
  },
  {
    stage: 10,
    jewels: 20,
    lights: 70,
    memories: 200,
    zenith: 2,
  },
  {
    stage: 11,
    jewels: 30,
    lights: 100,
    memories: 300,
    zenith: 3,
  },
];

function getRemainingMaterials(currentStage = 1, targetStage = 11) {
  const materials = {
    jewels: 0,
    lights: 0,
    memories: 0,
    zenith: 0,
  };

  for (let index = currentStage - 1; index < targetStage - 1; index++) {
    const stage = darkMaterials[index];
    materials.jewels += stage.jewels;
    materials.lights += stage.lights;
    materials.memories += stage.memories;
    materials.zenith += stage.zenith;
  }

  return materials;
}

export default function Database(): JSX.Element {
  const [currentStage, setCurrentStage] = useState(1);
  const [targetStage, setTargetStage] = useState(2);

  const remainingDarkMats = getRemainingMaterials(currentStage, targetStage);

  function handleDarkInput(value, setValue) {
    const stage = Number(value);

    if (stage < 0 || stage > 11) {
      return;
    }

    setValue(Number(stage));
  }

  return (
    <Layout>
      <Meta
        title="Materials calc"
        description="Materials calc"
        cover="https://nierrein.guide/cover-tools.jpg"
      />

      <section>
        <h2 className="overlap">Dark Character</h2>

        <form className="mb-8">
          <div className="input-field">
            <label>
              Current Stage (min 1)
              <input
                value={currentStage}
                onChange={(e) =>
                  handleDarkInput(e.target.value, setCurrentStage)
                }
                placeholder="Current stage (1)"
                type="number"
                min="1"
                max="11"
                step="1"
              />
            </label>
          </div>
          <div className="input-field">
            <label>
              Target Stage (max 11)
              <input
                value={targetStage}
                onChange={(e) =>
                  handleDarkInput(e.target.value, setTargetStage)
                }
                placeholder="Target stage (11)"
                type="number"
                min="2"
                max="11"
                step="1"
              />
            </label>
          </div>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-4">
          <div className="flex flex-col items-center">
            <span>Jewels</span>
            <Image
              src="https://reinguide-assets.s3.eu-central-1.wasabisys.com/material321007_standard_a0f783b80b.png"
              layout="intrinsic"
              height="80"
              width="80"
              alt=""
            />
            <span>{remainingDarkMats.jewels}</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Recalling Light</span>
            <Image
              src="https://reinguide-assets.s3.eu-central-1.wasabisys.com/material321101_standard_2e26c66670.png"
              layout="intrinsic"
              height="80"
              width="80"
              alt=""
            />
            <span>{remainingDarkMats.lights}</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Light of Memory</span>
            <Image
              src="https://reinguide-assets.s3.eu-central-1.wasabisys.com/material322001_standard_8180f70356.png"
              layout="intrinsic"
              height="80"
              width="80"
              alt=""
            />
            <span>{remainingDarkMats.memories}</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Zenith's Brilliance</span>
            <Image
              src="https://reinguide-assets.s3.eu-central-1.wasabisys.com/material322002_standard_2f3bf13c63.png"
              layout="intrinsic"
              height="80"
              width="80"
              alt=""
            />
            <span>{remainingDarkMats.zenith}</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
