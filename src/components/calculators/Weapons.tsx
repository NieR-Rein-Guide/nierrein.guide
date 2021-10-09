import { memo, useState, useEffect } from "react";
import WeaponThumbnail from "@components/WeaponThumbnail";
import Image from "next/image";

class Material {
  name: string;
  exp: number;

  constructor(name: string, exp: number) {
    this.name = name;
    this.exp = exp;
  }
}

class MaterialAmount {
  name: string;
  amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}

const dummyWeapons = {
  2: {
    id: "001501",
    type: "SWORD",
    element: "WIND",
  },
  3: {
    id: "001008",
    type: "SWORD",
    element: "LIGHT",
  },
  4: {
    id: "001011",
    type: "SWORD",
    element: "LIGHT",
  },
};

const enhancementsIcons = {
  Small: "material200001_standard",
  Medium: "material200002_standard",
  Large: "material200003_standard",
  Special: "material200005_standard",
  XL: "material200004_standard",
};

function WeaponCalculator(): JSX.Element {
  const materials = [
    new Material("Small", 200),
    new Material("Medium", 400),
    new Material("Large", 800),
    new Material("Special", 1200),
    new Material("XL", 1600),
  ];

  const xps = [
    [
      200, 202, 210, 225, 248, 278, 316, 363, 419, 483, 557, 641, 734, 836, 949,
      1072, 1205, 1348, 1502, 1667, 1842, 2027, 2225, 2433, 2652, 2882, 3125,
      3377, 3642, 3918, 4206, 4506, 4817, 5141, 5476, 5823, 6183, 6555, 6938,
      7335, 7744, 8165, 8598, 9045, 9504, 9975, 10459, 10956, 11467, 11989,
      12525, 13074, 13635, 14211, 14799, 15400, 16015, 16635, 17284, 17939,
      18607, 19289, 19984, 20692, 21416, 22151, 22901, 23665, 24442,
    ],
    [
      300, 305, 325, 362, 416, 490, 583, 698, 834, 991, 1172, 1375, 1602, 1853,
      2128, 2428, 2752, 3101, 3478, 3878, 4306, 4760, 5241, 5748, 6283, 6845,
      7435, 8053, 8698, 9373, 10075, 10806, 11567, 12355, 13174, 14021, 14899,
      15806, 16743, 17710, 18707, 19734, 20793, 21882, 23001, 24152, 25333,
      26546, 27791, 29066, 30374, 31713, 33084, 34487, 35922, 37389, 38889,
      40422, 41986, 43584, 45215, 46877, 48575, 50303, 52067, 53862, 55693,
      57555, 59453, 61383, 63347, 65346, 67379, 69445, 71546, 73682, 75852,
      78055, 80295,
    ],
    [
      400, 410, 447, 517, 618, 758, 933, 1149, 1405, 1702, 2042, 2425, 2852,
      3324, 3842, 4406, 5017, 5676, 6383, 7139, 7944, 8798, 9704, 10659, 11666,
      12725, 13836, 14999, 16215, 17484, 18807, 20184, 21615, 23101, 24642,
      26239, 27891, 29598, 31363, 33184, 35062, 36996, 38990, 41039, 43148,
      45314, 47540, 49823, 52167, 54569, 57030, 59553, 62134, 64776, 67478,
      70242, 73066, 75952, 78898, 81906, 84977, 88109, 91303, 94561, 97879,
      101262, 104707, 108216, 111788, 115423, 119123, 122886, 126713, 130605,
      134562, 138582, 142668, 146819, 151036, 155316, 159663, 164076, 168555,
      173099, 177709, 182387, 187130, 191941, 196817,
    ],
  ];

  const [currentWeaponLevel, setCurrentWeaponLevel] = useState(1);
  const [targetWeaponLevel, setTargetWeaponLevel] = useState(40);
  const [weaponRarity, setWeaponRarity] = useState(2);
  const [singleMaterialValues, setSingleMaterialValues] = useState(
    getSingleMaterialValues()
  );

  useEffect(() => {
    setSingleMaterialValues(getSingleMaterialValues());
  }, [currentWeaponLevel]);

  useEffect(() => {
    setCurrentWeaponLevel(capValue(currentWeaponLevel, 1, targetWeaponLevel));
    setSingleMaterialValues(getSingleMaterialValues());
  }, [targetWeaponLevel]);

  useEffect(() => {
    setTargetWeaponLevel(
      capValue(targetWeaponLevel, 1, getMaxTargetWeaponLevel())
    );
    setCurrentWeaponLevel(capValue(currentWeaponLevel, 1, targetWeaponLevel));
    setSingleMaterialValues(getSingleMaterialValues());
  }, [weaponRarity]);

  function getMaxTargetWeaponLevel() {
    switch (weaponRarity) {
      case 2:
        return 70;

      case 3:
        return 80;

      case 4:
        return 90;

      default:
        throw new Error("xp-calc: Invalid weapon rarity " + weaponRarity);
    }
  }

  function capValue(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }

  function getSingleMaterialValues(): MaterialAmount[] {
    const accExp = getAccumulatedExp();

    const result = [];
    for (let index = 0; index < materials.length; index++) {
      result.push(
        new MaterialAmount(
          materials[index].name,
          Math.ceil(accExp / materials[index].exp)
        )
      );
    }

    return result;
  }

  function getAccumulatedExp() {
    if (targetWeaponLevel - currentWeaponLevel == 0) return 0;

    let result = 0;
    for (
      let index = currentWeaponLevel - 1;
      index < targetWeaponLevel - 1;
      index++
    ) {
      result += xps[weaponRarity - 2][index];
    }

    return result;
  }

  return (
    <div>
      <div className="flex mb-2">
        <h3 className="text-3xl">Weapon Calculator</h3>
      </div>
      <div className="order-2 mt-4 md:mt-0 md:order-1 bg-grey-dark border border-beige-inactive p-2">
        <div className="mb-4">
          <label>
            Base Rarity:
            <input
              value={weaponRarity}
              className="text-2xl h-8 w-20 px-2 bg-grey-dark border-b border-dotted border-beige-light border-opacity-50"
              type="number"
              placeholder="0"
              min="2"
              max="4"
              onChange={(e) =>
                setWeaponRarity(capValue(Number(e.target.value), 2, 4))
              }
            />
          </label>
        </div>
        <div className="flex gap-x-4">
          <WeaponThumbnail
            type={dummyWeapons[weaponRarity].type}
            element={dummyWeapons[weaponRarity].element}
            id={dummyWeapons[weaponRarity].id}
            rarity={weaponRarity}
          />
          <div>
            <label>
              Current Level:
              <input
                value={currentWeaponLevel}
                className="text-2xl h-8 w-20 px-2 bg-grey-dark border-b border-dotted border-beige-light border-opacity-50"
                type="number"
                placeholder="0"
                min="1"
                max={targetWeaponLevel}
                onChange={(e) =>
                  setCurrentWeaponLevel(
                    capValue(Number(e.target.value), 1, targetWeaponLevel)
                  )
                }
              />
            </label>
            <label>
              Target Level:
              <input
                value={targetWeaponLevel}
                className="text-2xl h-8 w-20 px-2 bg-grey-dark border-b border-dotted border-beige-light border-opacity-50"
                type="number"
                placeholder="0"
                min="1"
                max={getMaxTargetWeaponLevel()}
                onChange={(e) =>
                  setTargetWeaponLevel(
                    capValue(
                      Number(e.target.value),
                      1,
                      getMaxTargetWeaponLevel()
                    )
                  )
                }
              />
            </label>
          </div>
        </div>
        <table className="mt-4">
          <tbody>
            {singleMaterialValues.map((item, index) => (
              <tr key={index}>
                <td className="flex items-center gap-x-4">
                  <Image
                    src={`/ui/material/${enhancementsIcons[item.name]}.png`}
                    alt={item.name}
                    height="48"
                    width="48"
                  />
                  <p>{item.name}</p>
                </td>
                <td className="pl-8 text-beige">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(WeaponCalculator);
