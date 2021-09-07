import { Card, CharacterCard } from "@components/Card";
import { Costume } from "@models/character";
import React from "react";

export { CardGrid, CharacterCardGrid };

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

function CharacterCardGrid({ costumes }: { costumes: Costume[] }): JSX.Element {
  return (
    <div className="card-grid">
      {costumes.map((costume) => (
        <React.Fragment key={costume.id}>
          <CharacterCard {...{ costume }}></CharacterCard>
        </React.Fragment>
      ))}
    </div>
  );
}
