import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import SVG from "react-inlinesvg";

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

  try {
    for (let index = currentStage - 1; index < targetStage - 1; index++) {
      const stage = darkMaterials[index];
      materials.jewels += stage.jewels;
      materials.lights += stage.lights;
      materials.memories += stage.memories;
      materials.zenith += stage.zenith;
    }

    return materials;
  } catch (error) {
    return materials;
  }
}

export default function MaterialsCalculator(): JSX.Element {
  const [currentStage, setCurrentStage] = useState(1);
  const [targetStage, setTargetStage] = useState(11);
  const [dropRate, setDropRate] = useState(0.003);
  const [darkDailyStamina] = useState(15);
  const [maxStamina, setMaxStamina] = useState(150);

  const remainingDarkMats = getRemainingMaterials(currentStage, targetStage);

  function handleDarkInput(value, setValue) {
    const stage = Number(value);

    if (stage <= 0 || stage > 11) {
      return;
    }

    setValue(Number(stage));
  }

  const smallPot = 10;
  const mediumPot = maxStamina / 2;

  const zenithRuns = Math.round(remainingDarkMats.zenith / dropRate);
  const staminaForZeniths = zenithRuns * darkDailyStamina;

  return (
    <Layout>
      <Meta
        title="Materials calc"
        description="Materials calc"
        cover="https://nierrein.guide/tools/materials.jpg"
      />

      <nav className="mb-16">
        <Link href="/tools" passHref>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Tools</span>
          </a>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">Dark Materials</h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-8">
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

          <div className="input-field">
            <label>
              Zenith's drop rate
              <input
                value={dropRate}
                onChange={(e) => setDropRate(Number(e.target.value))}
                placeholder="0.0025"
                type="number"
              />
            </label>
            <p className="text-xs mt-1">
              Current drop rate is 60% from 0,5% (dailies)
            </p>
          </div>

          <div className="input-field">
            <label>
              Max Stamina
              <input
                value={maxStamina}
                onChange={(e) => setMaxStamina(Number(e.target.value))}
                placeholder="Your max stamina (150)"
                type="number"
                min="50"
                max="999"
                step="1"
              />
            </label>
          </div>
        </form>

        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 bg-grey-dark p-8 relative bordered">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 wysiwyg mt-8">
          <ul>
            <li>
              <span className="text-beige">{zenithRuns}</span> dailies runs to
              get {remainingDarkMats.zenith} Zenith's Brilliance.
            </li>
            <li>{staminaForZeniths} total stamina.</li>
          </ul>
          <div>
            <div className="flex items-center">
              <Image
                src="/ui/consumable_item/consumable300001_standard.png"
                alt="Small pots"
                layout="fixed"
                height="48"
                width="48"
              />{" "}
              {staminaForZeniths / smallPot} small pots.
            </div>
            <div className="flex items-center">
              <Image
                src="/ui/consumable_item/consumable300002_standard.png"
                alt="Small pots"
                layout="fixed"
                height="48"
                width="48"
              />{" "}
              {staminaForZeniths / mediumPot} medium pots.
            </div>
            <div className="flex items-center">
              <Image
                src="/ui/consumable_item/consumable300003_standard.png"
                alt="Small pots"
                layout="fixed"
                height="48"
                width="48"
              />{" "}
              {staminaForZeniths / maxStamina} large pots.
            </div>
          </div>
          <div>
            <h6>Approximate drop rates for purple (dailies)</h6>
            <ol>
              <li>Zenith's Brilliance: 60%</li>
              <li>Polycristal of Thought: 30%</li>
              <li>Adoration: 10%</li>
            </ol>
          </div>
        </div>
      </section>
    </Layout>
  );
}
