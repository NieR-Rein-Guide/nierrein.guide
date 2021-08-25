import { CostumeInfo } from "@models/character";
export { Card, CharacterCard }

function Card(): JSX.Element {
  return (
    <div className="card">
    </div>
  );
}

function CharacterCard({ costume }: { costume: CostumeInfo }): JSX.Element {
  return (
    <div className="card" style={{ backgroundColor: "yellow" }}>
      <img src={costume.illustrationURL}></img>
    </div >
  );
}

