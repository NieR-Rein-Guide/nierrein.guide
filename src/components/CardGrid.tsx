import { Card, CharacterCard } from "@components/Card";
import { CostumeInfo } from "@models/character";
import React from "react";

export { CardGrid, CharacterCardGrid }

function CardGrid(): JSX.Element {
  return (
    <div className="card-grid">
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </div>
  );
}

function CharacterCardGrid({ costumes }: { costumes: CostumeInfo[] }): JSX.Element {
  return (
    <div className="card-grid">
      {costumes.map((costume) => (
        <React.Fragment key={costume.id}>
          <CharacterCard {...{ costume }}>
          </CharacterCard>
        </React.Fragment>
      ))}
    </div>
  );
}
