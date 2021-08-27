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
            <div className="weapon">
              <img src="\ui\material\material100002_standard.png"></img>
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
