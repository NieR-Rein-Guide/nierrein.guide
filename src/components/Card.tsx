import { CostumeInfo } from "@models/character";
import Link from 'next/link';
import Image from 'next/image';
import slugify from "slugify";
import Squares from "./decorations/Squares";
export { Card, CharacterCard }

function Card(): JSX.Element {
  return (
    <div className="card">
    </div>
  );
}

function CharacterCard({ costume }: { costume: CostumeInfo }): JSX.Element {
  return (
    <Link href={`/characters/${slugify(`${costume.character}/${costume.name.en}`, { remove: /[*+~.()'"!:@]/g })}`}>
      {/* Eventually replace with this */}
      {/* ${slugify(`${costume.character}/${costume.name.en}`, { lower: true, remove: /[*+~.()'"!:@]/g })}`}> */}
      <a>
        <div className={`card rarity${costume.stars}`}>
          <div className="card-art">
            <div className="squares-container">
              <Squares />
            </div>
            <div className="weapon-and-element-container">
              <img src="/icons/elements/dark.png"></img>
              <img src="/icons/weapons/gun.png"></img>
            </div>
            <div className="star-container">
              {Array.from(Array(costume.stars), (e, i) => {
                return <img src={`/icons/stars/${costume.stars}_star_single.svg`}></img>
              })}
            </div>
            <Image
              src={costume.illustrationURL}
              alt={`${costume.character} (${costume.name.en}) illustration`}
              className="card-art"
              layout="fill"
            />
          </div>
        </div >
      </a>
    </Link >
  );
}
