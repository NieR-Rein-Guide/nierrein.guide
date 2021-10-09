import CostumeThumbnail from "@components/CostumeThumbnail";
import { memo, useEffect, useState } from "react";
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

const dummyCostumes = {
  2: {
    id: "ch009001_thumbnail",
    type: "SWORD",
  },
  3: {
    id: "ch009005_thumbnail",
    type: "SWORD",
  },
  4: {
    id: "ch009004_thumbnail",
    type: "SWORD",
  },
};

const enhancementsIcons = {
  Small: "material100001_standard",
  Medium: "material100002_standard",
  Large: "material100003_standard",
  Special: "material100005_standard",
  XL: "material100004_standard",
};

function CharacterCalculator(): JSX.Element {
  const materials = [
    new Material("Small", 200),
    new Material("Medium", 400),
    new Material("Large", 800),
    new Material("Special", 1200),
    new Material("XL", 1600),
  ];

  const xps = [
    [
      200, 204, 218, 246, 288, 348, 426, 522, 638, 774, 932, 1110, 1312, 1538,
      1786, 2058, 2356, 2678, 3026, 3400, 3802, 4230, 4684, 5168, 5678, 6218,
      6786, 7382, 8008, 8666, 9352, 10068, 10816, 11594, 12404, 13246, 14120,
      15024, 15962, 16934, 17936, 18972, 20042, 21146, 22284, 23456, 24660,
      25902, 27176, 28486, 29832, 31212, 32630, 34082, 35570, 37094, 38656,
      40265, 41888, 43560, 45268, 47016, 48800, 50622, 52480, 54378, 56316,
      58290, 60304,
    ],
    [
      300, 310, 346, 416, 526, 678, 874, 1118, 1412, 1758, 2158, 2614, 3126,
      3698, 4330, 5022, 5778, 6598, 7482, 8434, 9452, 10538, 11694, 12922,
      14220, 15590, 17034, 18550, 20142, 21810, 23556, 25376, 27276, 29254,
      31312, 33450, 35670, 37970, 40354, 42820, 45368, 48002, 50722, 53526,
      56416, 59392, 62456, 65608, 68848, 72178, 75596, 79104, 82704, 86394,
      90176, 94050, 98018, 102078, 106232, 110480, 114822, 119260, 123792,
      128422, 133148, 137970, 142890, 147908, 153024, 158240, 163554, 168968,
      174482, 180096, 185812, 191628, 197548, 203568, 209690,
    ],
    [
      400, 404, 428, 481, 570, 704, 889, 1129, 1433, 1802, 2244, 2762, 3363,
      4048, 4822, 5692, 6659, 7727, 8901, 10184, 11580, 13093, 14724, 16479,
      18360, 20372, 22516, 24795, 27215, 29777, 32484, 35339, 38345, 41506,
      44824, 48301, 51941, 55747, 59620, 63866, 68183, 72678, 77352, 82206,
      87245, 92471, 97885, 103492, 109292, 115288, 121486, 127882, 134484,
      141292, 148308, 155536, 162976, 170633, 178507, 186602, 194919, 203460,
      212230, 221228, 230458, 239920, 249620, 259557, 269735, 280154, 290817,
      301729, 312888, 324298, 335960, 347878, 360054, 372487, 385181, 398140,
      411363, 424853, 438612, 452643, 466946, 481525, 496380, 511515, 526930,
    ],
  ];

  const [currentCharacterLevel, setCurrentCharacterLevel] = useState(1);
  const [targetCharacterLevel, setTargetCharacterLevel] = useState(50);
  const [characterRarity, setCharacterRarity] = useState(2);
  const [singleMaterialValues, setSingleMaterialValues] = useState(
    getSingleMaterialValues()
  );

  useEffect(() => {
    setSingleMaterialValues(getSingleMaterialValues());
  }, [currentCharacterLevel]);

  useEffect(() => {
    setCurrentCharacterLevel(
      capValue(currentCharacterLevel, 1, targetCharacterLevel)
    );
    setSingleMaterialValues(getSingleMaterialValues());
  }, [targetCharacterLevel]);

  useEffect(() => {
    setTargetCharacterLevel(
      capValue(targetCharacterLevel, 1, getMaxTargetCharacterLevel())
    );
    setCurrentCharacterLevel(
      capValue(currentCharacterLevel, 1, targetCharacterLevel)
    );
    setSingleMaterialValues(getSingleMaterialValues());
  }, [characterRarity]);

  function getMaxTargetCharacterLevel() {
    switch (characterRarity) {
      case 2:
        return 70;

      case 3:
        return 80;

      case 4:
        return 90;

      default:
        throw new Error("xp-calc: Invalid costume rarity " + characterRarity);
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
    if (targetCharacterLevel - currentCharacterLevel == 0) return 0;

    let result = 0;
    for (
      let index = currentCharacterLevel - 1;
      index < targetCharacterLevel - 1;
      index++
    ) {
      result += xps[characterRarity - 2][index];
    }

    return result;
  }

  return (
    <div>
      <div className="flex mb-2">
        <h3 className="text-3xl">Character Calculator</h3>
      </div>
      <div className="order-2 mt-4 md:mt-0 md:order-1 bg-grey-dark border border-beige-inactive p-2">
        <div className="mb-4">
          <label>
            Base Rarity:
            <input
              value={characterRarity}
              className="text-2xl h-8 w-20 px-2 bg-grey-dark border-b border-dotted border-beige-light border-opacity-50"
              type="number"
              placeholder="0"
              min="2"
              max="4"
              onChange={(e) =>
                setCharacterRarity(capValue(Number(e.target.value), 2, 4))
              }
            />
          </label>
        </div>
        <div className="flex gap-x-4">
          <CostumeThumbnail
            src={`/character/thumbnails/${dummyCostumes[characterRarity].id}.png`}
            rarity={characterRarity}
            weaponType="SWORD"
            alt=""
          />
          <div>
            <label>
              Current Level:
              <input
                value={currentCharacterLevel}
                className="text-2xl h-8 w-20 px-2 bg-grey-dark border-b border-dotted border-beige-light border-opacity-50"
                type="number"
                placeholder="0"
                min="1"
                max={targetCharacterLevel}
                onChange={(e) =>
                  setCurrentCharacterLevel(
                    capValue(Number(e.target.value), 1, targetCharacterLevel)
                  )
                }
              />
            </label>
            <label>
              Target Level:
              <input
                value={targetCharacterLevel}
                className="text-2xl h-8 w-20 px-2 bg-grey-dark border-b border-dotted border-beige-light border-opacity-50"
                type="number"
                placeholder="0"
                min="1"
                max={getMaxTargetCharacterLevel()}
                onChange={(e) =>
                  setTargetCharacterLevel(
                    capValue(
                      Number(e.target.value),
                      1,
                      getMaxTargetCharacterLevel()
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

export default memo(CharacterCalculator);
