import { CostumeInfo } from "@models/character";
import Link from 'next/link';
import Image from 'next/image';
export { Card, CharacterCard }

function Card(): JSX.Element {
  return (
    <div className="card">
    </div>
  );
}

function CharacterCard({ costume }: { costume: CostumeInfo }): JSX.Element {
  return (
    <Link href={"/characters/" + costume.character + "/" + costume.name.en.replace(" ", "-")}>
      <a>
        <div className={"card " + "rarity" + costume.stars}>
          <div className="card-art">
            <div className="element">
              <img src="\icons\elements\dark.png"></img>
            </div>
            <div className="weapon">
              <img src="\icons\weapons\gun.png"></img>
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
    </Link>
  );
}
