import Head from "next/head";

import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { CostumeInfo, typedCharacters } from "@models/character";
import MamaStar from "@components/decorations/MamaStar";
import { Dispatch, SetStateAction, useState } from "react";
import React from "react";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import VisuallyHidden from "@reach/visually-hidden";

import {
  Listbox,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
  ListboxGroup,
  ListboxGroupLabel,
} from "@reach/listbox";
import "@reach/listbox/styles.css";

function CharacterDiamond({
  costume,
  setCostume,
  active,
  labelTop,
}: {
  costume: CostumeInfo;
  setCostume: Dispatch<SetStateAction<CostumeInfo>>;
  active: boolean;
  labelTop: boolean;
}): JSX.Element {
  const onClick = () => {
    setCostume(costume);
  };

  return (
    <div className="relative">
      <div
        className={`absolute text-sm pointer-events-auto ${
          labelTop ? "bottom-20" : "top-20"
        } right-0 flex justify-center text-white ${
          active ? "" : "text-opacity-60"
        }`}
        style={{ width: "56px" }}
        onClick={onClick}
      >
        {costume.character}
      </div>
      <div
        className={`pointer-events-auto overflow-hidden iso-bg ${
          active ? "active" : ""
        }`}
        onClick={onClick}
      >
        <img
          style={{
            minWidth: "74px",
            maxWidth: "74px",
            minHeight: "74px",
            maxHeight: "74px",
          }}
          className="select-none"
          alt={costume.character}
          title={costume.character}
          src={costume.iconURL}
        />
      </div>
    </div>
  );
}

function CharacterRows({
  currentCostume,
  setCostume,
}: {
  currentCostume: CostumeInfo;
  setCostume: Dispatch<SetStateAction<CostumeInfo>>;
}) {
  const characters = Array.from(typedCharacters.values()).map(
    (chars) => chars[0]
  );

  const firstRow: CostumeInfo[] = [];
  const secondRow: CostumeInfo[] = [];
  characters.forEach((costume, index) => {
    if (index % 2 == 1) {
      firstRow.push(costume);
    } else {
      secondRow.push(costume);
    }
  });

  return (
    <div className="overflow-auto sm:self-center hidden md:inline">
      <div className="relative h-32 mt-20 mb-20 mx-20">
        <div className="flex gap-6 pointer-events-none">
          {firstRow.map((costume) => (
            <React.Fragment key={costume.id}>
              <CharacterDiamond
                {...{ costume, setCostume }}
                active={costume.character == currentCostume.character}
                labelTop={true}
              />
            </React.Fragment>
          ))}
        </div>
        <div
          className="absolute flex gap-6 pointer-events-none"
          style={{
            left: "-40px",
            top: "42px",
          }}
        >
          {secondRow.map((costume) => (
            <React.Fragment key={costume.id}>
              <CharacterDiamond
                {...{ costume, setCostume }}
                active={costume.character == currentCostume.character}
                labelTop={false}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function CostumeDialog({
  currentCostume,
  setCostume,
}: {
  currentCostume: CostumeInfo;
  setCostume: Dispatch<SetStateAction<CostumeInfo>>;
}) {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const characters = Array.from(typedCharacters.values()).map(
    (chars) => chars[0]
  );

  return (
    <div className="border rounded p-2">
      <select
        className="bg-black text-white w-full h-12"
        onChange={function (ev) {
          const newId = +ev.target.value;
          Array.from(typedCharacters.values()).find((values) =>
            values.find((cost) => {
              if (cost.id == newId) {
                setCostume(cost);
                return true;
              }
            })
          );
        }}
      >
        {characters.map((costume) => (
          <optgroup key={costume.character} label={costume.character}>
            {typedCharacters.get(costume.character).map((costume) => (
              <option key={costume.id} value={costume.id.toString()}>
                ({costume.stars}*) {costume.name.en}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {/* <button onClick={open}>Open Dialog</button> */}

      {/* <Dialog isOpen={showDialog} onDismiss={close}>
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <p>CC MEK</p>
        {characters.map((costume) => (
          <div key={costume.character}>
            <div className="flex">
              <img
                height={24}
                width={24}
                className="select-none"
                alt={costume.character}
                title={costume.character}
                src={costume.iconURL}
              />
              {costume.character}
            </div>
            {typedCharacters.get(costume.character).map((costume) => (
              <div key={costume.id}>
                ({costume.stars}*) {costume.name.en}
              </div>
            ))}
          </div>
        ))}
      </Dialog> */}
    </div>
  );
}

function CostumeSelect({
  currentCostume,
  setCostume,
}: {
  currentCostume: CostumeInfo;
  setCostume: Dispatch<SetStateAction<CostumeInfo>>;
}) {
  const characters = Array.from(typedCharacters.values()).map(
    (chars) => chars[0]
  );

  return (
    <div className="md:hidden">
      <Listbox
        defaultValue={currentCostume.name.en}
        // onChange={(newValue) => {
        //   setCostume(typedCharacters.get(newValue)[0]);
        // }}
      >
        {characters.map((costume) => (
          <ListboxGroup key={costume.character}>
            <ListboxGroupLabel>
              <div className="flex">
                <img
                  height={24}
                  width={24}
                  className="select-none"
                  alt={costume.character}
                  title={costume.character}
                  src={costume.iconURL}
                />
                {costume.character}
              </div>
            </ListboxGroupLabel>
            {typedCharacters.get(costume.character).map((costume) => (
              <ListboxOption value={costume.name.en} key={costume.id}>
                ({costume.stars}*) {costume.name.en}
              </ListboxOption>
            ))}
          </ListboxGroup>
        ))}
      </Listbox>
    </div>
  );
}

function CharacterCostumes({
  currentCostume,
  setCostume,
}: {
  currentCostume: CostumeInfo;
  setCostume: Dispatch<SetStateAction<CostumeInfo>>;
}) {
  const sorted = typedCharacters
    .get(currentCostume.character)
    .sort((a, b) => a.stars - b.stars);
  const byStars = sorted.reduce((acc, elem) => {
    if (acc.has(elem.stars)) {
      acc.get(elem.stars).push(elem);
    } else {
      acc.set(elem.stars, [elem]);
    }
    return acc;
  }, new Map<number, CostumeInfo[]>());
  const costumes = Array.from(byStars.entries());

  return (
    <div className="gap-2 my-2 p-2 lg:pl-6 overflow-auto">
      {costumes.map(([stars, costumes]) => (
        <div className="flex flex-row" key={stars}>
          <span className="flex flex-row">
            {Array.from({ length: stars }).map((_, index) => (
              <div className="w-8 h-8" key={index}>
                <MamaStar />
              </div>
            ))}
            {Array.from({ length: 5 - stars }).map((_, index) => (
              <div className="w-8 h-8" key={index}></div>
            ))}
          </span>
          {costumes.map((costume) => (
            <div
              key={costume.id}
              className={`flex items-center border-beige border-2 p-2 ${
                currentCostume.id == costume.id ? "" : "border-opacity-30"
              }`}
              onClick={() => setCostume(costume)}
            >
              {costume.name.en}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function CharactersPage(): JSX.Element {
  const [currentCostume, setCostume] = useState(
    typedCharacters.values().next().value[0] as CostumeInfo
  );

  return (
    <Layout>
      <Head>
        <title>Characters - NieR Re[in] Global Guide & Database</title>
      </Head>

      <CharacterRows {...{ setCostume, currentCostume }} />
      <span className="hidden md:inline">
        <CharacterCostumes {...{ setCostume, currentCostume }} />
      </span>
      <span className="inline md:hidden">
        <CostumeDialog {...{ setCostume, currentCostume }} />
      </span>

      <CostumeDetails costume={currentCostume}></CostumeDetails>
    </Layout>
  );
}
