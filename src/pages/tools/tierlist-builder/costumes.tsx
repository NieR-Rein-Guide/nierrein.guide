import Layout from "@components/Layout";
import Meta from "@components/Meta";
import SVG from "react-inlinesvg";
import produce from "immer";
import {
  character,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
} from "@prisma/client";
import Link from "next/link";
import { getAllCostumes } from "@models/costume";
import { useSettingsStore } from "../../../store/settings";
import { useInventoryStore } from "@store/inventory";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import classNames from "classnames";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#2D2D2D",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#bda699" : "#0C0C0C",
});

interface TierlistBuilderProps {
  costumes: (costume & {
    costume_ability_link: (costume_ability_link & {
      costume_ability: costume_ability;
    })[];
    costume_skill_link: (costume_skill_link & {
      costume_skill: costume_skill;
    })[];
    costume_stat: costume_stat[];
    character: character;
    emblem: emblem;
  })[];
  abilitiesLookup;
  charactersLookup;
}

export default function TierlistBuilder({
  costumes,
  abilitiesLookup,
  charactersLookup,
}: TierlistBuilderProps): JSX.Element {
  resetServerContext();

  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  /**
   * Inventory
   */
  const [showOnlyInventory, setShowOnlyInventory] = useState(false);
  const ownedCostumes = useInventoryStore((state) => state.costumes);

  const allCostumes = costumes
    .filter((costume) => {
      if (showUnreleasedContent) return true;
      return new Date() > new Date(costume.release_time);
    })
    .filter((cost) => {
      if (!showOnlyInventory) return true;
      return ownedCostumes.includes(cost.costume_id);
    })
    .map((costume) => ({
      ...costume,
      id: `${costume.character.character_id}-${costume.costume_id}`,
    }));

  const [state, setState] = useState([
    {
      tier: "SSS",
      items: [],
    },
    {
      tier: undefined,
      items: allCostumes,
    },
  ]);
  const [yup, setYup] = useState(false);

  useEffect(() => {
    setYup(true);
  }, []);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd].items, source.index, destination.index);
      const newState = [...state];
      newState[sInd].items = items;
      setState(newState);
    } else {
      const result = move(
        state[sInd].items,
        state[dInd].items,
        source,
        destination
      );
      const newState = [...state];
      newState[sInd] = {
        ...newState[sInd],
        items: result[sInd],
      };

      newState[dInd] = {
        ...newState[dInd],
        items: result[dInd],
      };

      setState(newState);
    }
  }

  function moveTierUp(index) {
    setState(
      produce(state, (draft) => {
        if (index > 0) {
          const item = state[index].items;
          // draft.splice(index, 1);
          draft.splice(index - 1, 0, item);
        }
      })
    );
  }

  function moveTierDown(index) {
    setState(
      produce(state, (draft) => {
        const item = state[index].items;
        // draft.splice(index, 1);
        draft.splice(index + 1, 0, item);
      })
    );
  }

  return (
    <Layout>
      <Meta
        title="Tierlist Builder"
        description="Build your own tier list."
        cover="https://nierrein.guide/tools/tierlist-builder.jpg"
      />

      <nav className="mb-8">
        <Link href="/tierlists" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>See all tier lists</span>
          </a>
        </Link>
      </nav>

      <section className="p-4 md:p-8">
        <button
          className="btn"
          type="button"
          onClick={() => {
            const costumesList = state[state.length - 1];
            const tiers = state.slice(0, state.length - 1);
            setState([
              ...tiers,
              {
                tier: "N/A",
                items: [],
              },
              costumesList,
            ]);
          }}
        >
          Add new tier
        </button>
        {yup && (
          <div className="flex flex-col gap-y-8 mt-8">
            <DragDropContext onDragEnd={onDragEnd}>
              {state.map((el, ind) => (
                <Droppable
                  key={ind}
                  droppableId={`${ind}`}
                  direction="horizontal"
                >
                  {(provided, snapshot) => (
                    <div
                      className="relative py-8 px-4"
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      {ind !== state.length - 1 && (
                        <div className="absolute top-1/2 transform -translate-y-1/2 -right-7 flex flex-col gap-2">
                          <button onClick={() => moveTierUp(ind)}>
                            <FiArrowUpCircle size="24" />
                          </button>
                          <button onClick={() => moveTierDown(ind)}>
                            <FiArrowDownCircle size="24" />
                          </button>
                        </div>
                      )}
                      <div
                        className={classNames(
                          "flex gap-4",
                          ind === state.length - 1
                            ? "flex-wrap"
                            : "overflow-x-auto"
                        )}
                      >
                        <h3 className="text-3xl font-display">{el.tier}</h3>
                        {el.items?.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="relative flex"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div className="flex flex-col justify-around">
                                  <CostumeThumbnail
                                    src={`${CDN_URL}${item.image_path_base}battle.png`}
                                    alt={`${item.title} thumbnail`}
                                    rarity={RARITY[item.rarity]}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { costumes, abilitiesLookup, charactersLookup } = await getAllCostumes({
    orderBy: { rarity: "asc" },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        costumes,
        abilitiesLookup,
        charactersLookup,
      })
    ),
  };
}
