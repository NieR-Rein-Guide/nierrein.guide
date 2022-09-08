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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiEdit,
  FiXCircle,
} from "react-icons/fi";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import classNames from "classnames";
import Image from "next/image";
import { RANK_THUMBNAILS } from "@models/tiers";
import { Modal } from "@mui/material";
import { BtnSecondary } from "@components/btn";
import axios from "axios";
import Checkbox from "@components/form/Checkbox";
import Wysiwyg from "@components/Wysiwyg";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

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
  background: isDragging ? "lightgreen" : "transparent",

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
}

export default function TierlistBuilder({
  costumes,
}: TierlistBuilderProps): JSX.Element {
  const router = useRouter();

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
      tier: "SS",
      items: [],
    },
    {
      tier: "S",
      items: [],
    },
    {
      tier: "A",
      items: [],
    },
    {
      tier: "B",
      items: [],
    },
    {
      tier: undefined,
      items: allCostumes,
    },
  ]);
  const [yup, setYup] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState("My tierlist");
  const [description, setDescription] = useState(
    "<p>My awesome (and objective) tierlist.</p>"
  );
  const [loading, setLoading] = useState(false);

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
          const item = state[index];
          draft.splice(index, 1);
          draft.splice(index - 1, 0, item);
        }
      })
    );
  }

  function moveTierDown(index) {
    setState(
      produce(state, (draft) => {
        const item = state[index];
        draft.splice(index, 1);
        draft.splice(index + 1, 0, item);
      })
    );
  }

  function removeTier(index) {
    setState(
      produce(state, (draft) => {
        draft.splice(index, 1);
      })
    );
  }

  function editTitle(index) {
    setCurrentIndex(index);
    setTitleModal(true);
  }

  function handleTitleModalClose(event) {
    event.preventDefault();
    const value = event.target.elements[0].value;

    if (!value) {
      return;
    }

    const newState = produce(state, (draft) => {
      draft[currentIndex].tier = value;
    });
    setState(newState);
    setTitleModal(false);
    setCurrentIndex(0);
  }

  async function save() {
    if (loading) return;

    try {
      setLoading(true);

      const response = await axios.post("/api/tierlists", {
        title,
        description,
        type: "costumes",
        attribute: "all",
        tiers: state.slice(0, state.length - 1),
      });

      toast.success("Tier list saved! Redirecting...");

      router.push(`/tierlist/${response.data.tierlist.slug}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
        <div className="relative bordered mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-grey-dark p-4">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-grey-dark p-4">
            <Wysiwyg
              onBlur={(html) => setDescription(html)}
              content="<p>My awesome (and objective) tierlist.</p>"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
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

          <div>
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            )}
            {(loading && <BtnSecondary>Loading...</BtnSecondary>) || (
              <BtnSecondary onClick={save}>Save</BtnSecondary>
            )}
          </div>
        </div>
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
                          <button onClick={() => removeTier(ind)}>
                            <FiXCircle size="24" />
                          </button>
                          <button onClick={() => moveTierDown(ind)}>
                            <FiArrowDownCircle size="24" />
                          </button>
                        </div>
                      )}
                      <div
                        className={classNames(
                          "gap-4",
                          ind === state.length - 1
                            ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-10 place-items-center"
                            : "flex overflow-x-auto"
                        )}
                      >
                        {ind !== state.length - 1 && (
                          <button
                            onClick={() => editTitle(ind)}
                            className="absolute -left-7 top-1/2 transform -translate-y-1/2"
                          >
                            <FiEdit size="24" />
                          </button>
                        )}
                        {(ind === state.length - 1 && (
                          <p className="col-span-10">
                            Drag & Drop costumes into the tiers.
                          </p>
                        )) || (
                          <div className="flex justify-center items-center w-28">
                            {(RANK_THUMBNAILS[el.tier] && (
                              <Image
                                src={RANK_THUMBNAILS[el.tier]}
                                alt={el.tier}
                              />
                            )) || <h2 className="text-2xl">{el.tier}</h2>}
                          </div>
                        )}
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
                                  {ind === state.length - 1 && (
                                    <p className="text-xxs line-clamp-2 leading-none text-center mt-1 h-5">
                                      {item.character.name} {item.title}
                                    </p>
                                  )}
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

      <Modal
        open={titleModal}
        onClose={() => setTitleModal(false)}
        className="flex items-center justify-center"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className="flex" onSubmit={handleTitleModalClose}>
          <input
            type="text"
            name="tier"
            placeholder={`New tier label (${state[currentIndex].tier})`}
          />
          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </Modal>
    </Layout>
  );
}

export async function getStaticProps() {
  const { costumes } = await getAllCostumes({
    orderBy: { costume_id: "desc" },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        costumes,
      })
    ),
  };
}
