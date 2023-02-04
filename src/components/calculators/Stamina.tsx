import localforage from "localforage";
import Image from "next/legacy/image";
import { memo, useEffect, useState } from "react";
import staminaImg from "../../../public/ui/consumable_item/consumable300003_standard.png";

const STAMINA_REGENERATION_RATE = 180000; // 1 stamina per 3 minutes

function calculateStamina(stamina: number, minutes: number) {
  const addStamina = minutes / 3;
  return stamina + addStamina;
}

function capStamina(number) {
  return Math.abs(Math.min(Math.max(parseInt(number), 0), 999));
}

function StaminaCalculator(): JSX.Element {
  const [stamina, setStamina] = useState(0);
  const [maxStamina, setMaxStamina] = useState(150);

  useEffect(() => {
    getLocalStamina();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stamina >= maxStamina) {
        return;
      }

      setStamina(stamina + 1);
    }, STAMINA_REGENERATION_RATE);

    localforage.setItem("currentStamina", stamina);
    localforage.setItem("maxStamina", maxStamina);
    localforage.setItem("lastStaminaUpdate", Date.now());

    return () => {
      clearInterval(interval);
    };
  }, [stamina, maxStamina]);

  async function getLocalStamina() {
    const [currentStamina, maxStamina, lastStaminaUpdate] = await Promise.all([
      localforage.getItem<number>("currentStamina"),
      localforage.getItem<number>("maxStamina"),
      localforage.getItem<number>("lastStaminaUpdate"),
    ]);

    const differenceInMinutes = (Date.now() - lastStaminaUpdate) / 1000 / 60;
    const additionnalStamina = Math.round(differenceInMinutes / 3);
    const newStamina = currentStamina + additionnalStamina;

    setMaxStamina(maxStamina);

    if (newStamina >= maxStamina) {
      setStamina(maxStamina);
      return;
    }

    setStamina(newStamina);
  }

  const twoHours = calculateStamina(stamina, 120);
  const fourHours = calculateStamina(stamina, 240);
  const eightHours = calculateStamina(stamina, 480);
  const twelveHours = calculateStamina(stamina, 720);
  const sixteenHours = calculateStamina(stamina, 960);

  return (
    <div>
      <div className="flex mb-2">
        <h3 className="text-3xl">Stamina Calculator</h3>
      </div>
      <div className="bg-grey-dark border border-beige-inactive p-2">
        <div className="flex my-2">
          <Image layout="fixed" src={staminaImg} alt="Stamina" />
          <div className="flex flex-1 flex-col">
            <div className="mt-6 mb-4">
              <input
                value={`${stamina}`.replace(/^0+/, "")}
                className="text-2xl h-8 w-20 px-2 bg-grey-dark border-b border-dotted border-beige-light border-opacity-50"
                type="number"
                placeholder="0"
                min="0"
                max="999"
                onChange={(e) => setStamina(capStamina(Number(e.target.value)))}
              />
              <span className="text-beige-inactive">
                /
                <input
                  value={`${maxStamina}`.replace(/^0+/, "")}
                  className="text-2xl h-8 w-24 px-2 bg-grey-dark border-b border-dotted border-beige-light border-opacity-50"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="999"
                  onChange={(e) =>
                    setMaxStamina(capStamina(Number(e.target.value)))
                  }
                />
              </span>
            </div>

            <p className="text-beige-inactive text-xs">
              {twoHours} in 2 hours{" "}
              <sup className="text-beige-dark">
                {twoHours < maxStamina
                  ? ""
                  : `(wasting ${twoHours - maxStamina} stamina)`}
              </sup>
            </p>
            <p className="text-beige-inactive text-xs">
              {fourHours} in 4 hours{" "}
              <sup className="text-beige-dark">
                {fourHours < maxStamina
                  ? ""
                  : `(wasting ${fourHours - maxStamina} stamina)`}
              </sup>
            </p>
            <p className="text-beige-inactive text-xs">
              {eightHours} in 8 hours{" "}
              <sup className="text-beige-dark">
                {eightHours < maxStamina
                  ? ""
                  : `(wasting ${eightHours - maxStamina} stamina)`}
              </sup>
            </p>
            <p className="text-beige-inactive text-xs">
              {twelveHours} in 12 hours
              <sup className="text-beige-dark">
                {twelveHours < maxStamina
                  ? ""
                  : `(wasting ${twelveHours - maxStamina} stamina)`}
              </sup>
            </p>
            <p className="text-beige-inactive text-xs">
              {sixteenHours} in 16 hours
              <sup className="text-beige-dark">
                {sixteenHours < maxStamina
                  ? ""
                  : `(wasting ${sixteenHours - maxStamina} stamina)`}
              </sup>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StaminaCalculator);
