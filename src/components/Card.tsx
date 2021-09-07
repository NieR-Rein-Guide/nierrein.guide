import { Costume } from "@models/types";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";
import Squares from "./decorations/Squares";
import RARITY from "@utils/rarity";
export { Card, CharacterCard };

function Card(): JSX.Element {
  return <div className="card"></div>;
}

function CharacterCard({ costume }: { costume: Costume }): JSX.Element {
  return (
    <Link
      href={`/characters/${slugify(
        `${costume.character}/${costume.costume.name.en}`,
        {
          remove: /[*+~.()'"!:@]/g,
        }
      )}`}
    >
      {/* Eventually replace with this */}
      {/* ${slugify(`${costume.character}/${costume.name.en}`, { lower: true, remove: /[*+~.()'"!:@]/g })}`}> */}
      <a>
        <div className={`card rarity${RARITY[costume.costume.rarity]}`}>
          <div className="card-art">
            <div className="squares-container">
              <Squares />
            </div>
            <div className="weapon-and-element-container">
              <img src="/icons/elements/dark.png" alt=""></img>
              <img src="/icons/weapons/gun.png" alt=""></img>
            </div>
            <div className="star-container">
              {Array.from(Array(RARITY[costume.costume.rarity]), () => {
                return (
                  <img
                    src={`/icons/stars/${
                      RARITY[costume.costume.rarity]
                    }_star_single.svg`}
                    alt=""
                  ></img>
                );
              })}
            </div>
            <Image
              src={`/character_medium/${costume.ids.actor}_full-1920-1080.png`}
              alt={`${costume.character} (${costume.costume.name.en}) illustration`}
              className="card-art"
              layout="fill"
            />
          </div>
        </div>
      </a>
    </Link>
  );
}
