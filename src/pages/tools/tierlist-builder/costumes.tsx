import Layout from "components/Layout";
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
  emblem,
} from "@prisma/client";
import Link from "next/link";
import { getAllCostumes } from "@models/costume";
import { useSettingsStore } from "../../../store/settings";
import { useCreatedTierlists } from "../../../store/created-tierlists";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiEdit,
  FiMessageCircle,
  FiXCircle,
} from "react-icons/fi";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import classNames from "classnames";
import Image from "next/legacy/image";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Select,
} from "@mui/material";
import { BtnSecondary } from "@components/btn";
import axios from "axios";
import Wysiwyg from "@components/Wysiwyg";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import CostumeSelect from "@components/characters/CostumeSelect";
import Checkbox from "@components/form/Checkbox";
import { RANK_THUMBNAILS } from "@utils/rankThumbnails";
import ATTRIBUTES from "@utils/attributes";
import Element from "@components/Element";

const DEFAULT_DESCRIPTION = "<p>My awesome (and objective) tierlist.</p>";

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
  userSelect: "none",
  background: "transparent",
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

  const addTierlist = useCreatedTierlists((state) => state.addTierlist);

  /**
   * Inventory
   */
  const [show4StarsOnly, setShow4StarsOnly] = useState(true);

  /**
   * Costumes
   */
  const [state, setState] = useState([
    {
      tier: "SSS",
      description: "",
      items: [],
    },
    {
      tier: "SS",
      description: "",
      items: [],
    },
    {
      tier: "S",
      description: "",
      items: [],
    },
    {
      tier: "A",
      description: "",
      items: [],
    },
    {
      tier: "B",
      description: "",
      items: [],
    },
    {
      tier: "ALL",
      description: "",
      items: [],
    },
  ]);
  const [yup, setYup] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [tooltipModal, setTooltipModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [title, setTitle] = useState("My tierlist");
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [currentTooltip, setCurrentTooltip] = useState("");
  const [tierDescription, setTierDescription] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Fetch existing tierlist if edit_key is found.
   */
  useEffect(() => {
    if (router.query.edit_key) {
      getExistingTierlist();
    }
  }, [router]);

  /**
   * Client side only
   */
  useEffect(() => {
    setYup(true);
  }, []);

  /**
   * Filter costumes
   */
  useEffect(() => {
    const filteredSelection = getCostumesSelection();
    setState(
      produce(state, (draft) => {
        draft[draft.length - 1].items = filteredSelection;
      })
    );
  }, [costumes]);

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
    if (index + 1 === state.length - 1) {
      return;
    }

    setState(
      produce(state, (draft) => {
        const item = state[index];
        draft.splice(index, 1);
        draft.splice(index + 1, 0, item);
      })
    );
  }

  function removeTier(index) {
    if (window.confirm("Are you sure you want to delete this tier?")) {
      setState(
        produce(state, (draft) => {
          draft.splice(index, 1);
        })
      );
    }
  }

  function editTitle(index) {
    setCurrentIndex(index);
    setTitleModal(true);
  }

  function handleTitleModalClose(event) {
    event.preventDefault();
    const value = event.target.elements[0].value || state[currentIndex].tier;

    const newState = produce(state, (draft) => {
      draft[currentIndex].tier = value;
      draft[currentIndex].description = tierDescription;
    });
    setState(newState);
    setTitleModal(false);
    setCurrentIndex(0);
    setTierDescription("");
  }

  function handleTooltipModalClose() {
    const newState = produce(state, (draft) => {
      if (!currentTooltip) {
        return;
      }
      // Update content
      if (currentTooltip === "<p></p>") {
        draft[currentIndex].items[currentItemIndex].tooltip = "";
        return;
      }
      draft[currentIndex].items[currentItemIndex].tooltip = currentTooltip;
    });

    setState(newState);
    setTooltipModal(false);
    setCurrentIndex(0);
    setCurrentItemIndex(0);
    setCurrentTooltip("");
  }

  function getCostumesSelection() {
    const filtered = costumes
      .filter((costume) => {
        if (showUnreleasedContent) return true;
        return new Date() > new Date(costume.release_time);
      })
      .sort((a, b) => -b.character.name.localeCompare(a.character.name))
      .map((costume, index) => ({
        ...costume,
        id: `${costume.character.character_id}-${costume.costume_id}-${index}`,
        tooltip: "",
        tooltip_is_important: false,
        awakening_step: 0,
        preferred_attribute: "",
      }));

    return filtered;
  }

  async function getExistingTierlist() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/tierlists?edit_key=${router.query.edit_key}`
      );
      const { tierlist, tiers } = data;
      const filteredSelection = getCostumesSelection();
      const alreadySelectedItems = tiers.map((tier) => tier.items).flat();
      const newSelection = filteredSelection.filter((item) => {
        const isSelected = alreadySelectedItems.findIndex(
          (it) => it.item_id === item.costume_id
        );

        if (isSelected >= 0) {
          return false;
        }
        return true;
      });
      setTitle(tierlist.title);
      setDescription(tierlist.description);
      setState([
        ...tiers,
        { tier: "ALL", description: "", items: newSelection },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    if (loading) return;

    try {
      setLoading(true);

      const formattedTiers = state.slice(0, state.length - 1).map((tiers) => {
        const newItems = tiers.items.map((item) => ({
          costume_id: item.costume_id,
          tooltip: item.tooltip,
          tooltip_is_important: item.tooltip_is_important,
          awakening_step: item.awakening_step,
          attribute: item.preferred_attribute,
        }));

        return {
          ...tiers,
          items: newItems,
        };
      });

      const response = await axios({
        url: "/api/tierlists",
        method: router.query.edit_key ? "PUT" : "POST",
        data: {
          title,
          description,
          type: "costumes",
          attribute: "all",
          tiers: formattedTiers,
          edit_key: router.query.edit_key,
        },
      });

      toast.success("Tier list saved! Redirecting...");

      addTierlist(response.data.tierlist);

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
        title="Tierlist Builder - Costumes"
        description="Build your own costumes tier list."
        cover="https://nierrein.guide/tools/tierlist-costumes.jpg"
      />

      <nav className="mb-8">
        <Link href="/tierlists" passHref={true} className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>See all tier lists</span>
        </Link>
      </nav>

      <section className="p-4 md:p-8">
        <div className="relative bordered mb-4">
          <div className="flex flex-col md:flex-row md:items-center  bg-grey-dark p-4">
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
              key={description}
              onBlur={(html) => setDescription(html)}
              content={description}
            />
          </div>
        </div>
        <div className="flex justify-center">
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          )}
          {(loading && <BtnSecondary>Loading...</BtnSecondary>) || (
            <BtnSecondary onClick={save}>Save</BtnSecondary>
          )}
        </div>
        {yup && (
          <div className="flex flex-col gap-y-8 mt-8">
            <DragDropContext onDragEnd={onDragEnd}>
              {state.map((el, ind) => (
                <>
                  {ind === state.length - 1 && (
                    <div className="flex justify-center">
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
                              description: "",
                              items: [],
                            },
                            costumesList,
                          ]);
                        }}
                      >
                        Add new tier
                      </button>
                    </div>
                  )}
                  <Droppable
                    key={ind}
                    droppableId={`${ind}`}
                    direction="horizontal"
                  >
                    {(provided, snapshot) => (
                      <div
                        className="relative py-8 px-4 border border-beige border-opacity-50"
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                      >
                        {ind !== state.length - 1 && (
                          <div className="absolute top-1/2 transform -translate-y-1/2 -right-7 flex flex-col gap-4">
                            <button onClick={() => moveTierUp(ind)}>
                              <FiArrowUpCircle size="24" />
                            </button>
                            <button onClick={() => removeTier(ind)}>
                              <FiXCircle className="text-red-400" size="24" />
                            </button>
                            <button onClick={() => moveTierDown(ind)}>
                              <FiArrowDownCircle size="24" />
                            </button>
                          </div>
                        )}

                        {ind !== state.length - 1 && (
                          <button
                            onClick={() => editTitle(ind)}
                            className="absolute -left-3 top-1 transform -translate-y-1/2 bg-beige rounded-full h-10 w-10 flex items-center justify-center transition ease-out-cubic text-beige-darker hover:bg-beige-darker hover:text-white"
                          >
                            <FiEdit size="24" />
                          </button>
                        )}
                        {ind === state.length - 1 && (
                          <div className="col-span-10 flex justify-between w-full mb-4">
                            <p>Drag & Drop costumes into the tiers.</p>
                            <Checkbox
                              label="Show only 4 stars"
                              isChecked={show4StarsOnly}
                              setState={(e) =>
                                setShow4StarsOnly(e.target.checked)
                              }
                            />
                          </div>
                        )}

                        <div className="flex">
                          {ind !== state.length - 1 && (
                            <div className="w-28 inline-flex">
                              {ind !== state.length - 1 && (
                                <div className="flex justify-center items-center w-28">
                                  {(RANK_THUMBNAILS[el.tier] && (
                                    <Image
                                      src={RANK_THUMBNAILS[el.tier]}
                                      alt={el.tier}
                                    />
                                  )) || <h2 className="text-2xl">{el.tier}</h2>}
                                </div>
                              )}
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
                            {el.items?.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      className={classNames(
                                        "relative flex",
                                        show4StarsOnly &&
                                          item.rarity !== "SS_RARE"
                                          ? "hidden"
                                          : ""
                                      )}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                      )}
                                    >
                                      <div className="relative flex flex-col justify-around">
                                        {item.tooltip && (
                                          <div className="bg-beige absolute top-0 right-0 w-6 h-6 flex justify-center items-center z-20 rounded-full text-black">
                                            <FiMessageCircle />
                                          </div>
                                        )}
                                        <CostumeThumbnail
                                          src={`${CDN_URL}${item.image_path_base}battle.png`}
                                          alt={`${item.title} thumbnail`}
                                          rarity={RARITY[item.rarity]}
                                        />
                                        {item.awakening_step > 0 && (
                                          <span className="absolute -top-2 right-0 text-xs mt-2 transform scale-90 z-20">
                                            <img
                                              src={
                                                item.awakening_step === 5
                                                  ? "/icons/costumes/awaken_rank_icon_rainbow.png"
                                                  : "/icons/costumes/awaken_rank_icon_default.png"
                                              }
                                            />
                                            <span className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 font-semibold text-lg">
                                              {item.awakening_step}
                                            </span>
                                          </span>
                                        )}
                                        {item.preferred_attribute && (
                                          <span className="absolute top-6 right-0 text-xs mt-2">
                                            <Element
                                              type={item.preferred_attribute}
                                              size={30}
                                            />
                                          </span>
                                        )}
                                        {ind === state.length - 1 && (
                                          <div className="text-xxs text-center mt-1">
                                            <p className="mb-0 leading-none">
                                              {item.is_ex_costume && (
                                                <span className="text-rarity-4">
                                                  EX{" "}
                                                </span>
                                              )}
                                              {item.character.name}
                                            </p>
                                            <span className="text-center text-beige line-clamp-1 leading-none">
                                              {item.title}
                                            </span>
                                          </div>
                                        )}
                                        {ind !== state.length - 1 && (
                                          <Tooltip
                                            enterTouchDelay={0}
                                            title="Add a note on this item"
                                          >
                                            <button
                                              onClick={() => {
                                                setCurrentIndex(ind);
                                                setCurrentItemIndex(index);
                                                setTooltipModal(true);
                                              }}
                                              className="mt-1 bg-beige py-1 w-full flex justify-center items-center z-20 rounded-full text-black"
                                            >
                                              <FiMessageCircle />
                                            </button>
                                          </Tooltip>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          </div>
                        </div>

                        {el.description && (
                          <div
                            className="mt-4"
                            dangerouslySetInnerHTML={{
                              __html: el.description,
                            }}
                          ></div>
                        )}

                        {ind === state.length - 1 && (
                          <div className="flex justify-center mt-8">
                            <CostumeSelect
                              label="Add a costume..."
                              costumes={[...costumes].sort(
                                (a, b) =>
                                  -b.character.name.localeCompare(
                                    a.character.name
                                  )
                              )}
                              onSelect={(e, costume) => {
                                if (!costume) {
                                  return;
                                }

                                setState(
                                  produce(state, (draft) => {
                                    draft[draft.length - 1].items.push({
                                      ...costume,
                                      id: `${
                                        costume.character.character_id
                                      }-${Date.now()}`,
                                      tooltip: "",
                                      tooltip_is_important: false,
                                      awakening_step: 0,
                                      preferred_attribute: "",
                                    });
                                  })
                                );
                              }}
                            />
                          </div>
                        )}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </>
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
        <form
          className="flex flex-col gap-y-4 bg-grey-dark relative bordered p-4"
          onSubmit={handleTitleModalClose}
        >
          <Autocomplete
            className="w-96"
            freeSolo
            options={Object.entries(RANK_THUMBNAILS).map(([key]) => key)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`New tier label (${state[currentIndex].tier})`}
              />
            )}
          />
          <Wysiwyg
            onBlur={(content) => setTierDescription(content)}
            content={state[currentIndex]?.description ?? ""}
          />
          <button type="submit" className="btn max-w-xs">
            Save
          </button>
        </form>
      </Modal>

      <Modal
        open={tooltipModal}
        onClose={() => setTooltipModal(false)}
        className="flex items-center justify-center"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col container bg-grey-dark relative bordered p-4">
          <Wysiwyg
            onBlur={(content) => setCurrentTooltip(content)}
            content={
              state[currentIndex]?.items[currentItemIndex]?.tooltip ??
              "Add new tooltip..."
            }
          />
          <div className="flex items-center mt-4">
            <Checkbox
              label="Is tooltip important/critical for this costume?"
              isChecked={
                state[currentIndex]?.items[currentItemIndex]
                  ?.tooltip_is_important
              }
              setState={() => {
                const newState = produce(state, (draft) => {
                  draft[currentIndex].items[
                    currentItemIndex
                  ].tooltip_is_important =
                    !state[currentIndex]?.items[currentItemIndex]
                      ?.tooltip_is_important;
                });

                setState(newState);
              }}
            />
          </div>
          <div className="flex items-center mt-4 gap-4">
            <FormControl className="w-full">
              <InputLabel id="awakening-step">
                Preferred Awakening Level
              </InputLabel>
              <Select
                labelId="awakening-step"
                value={
                  state[currentIndex]?.items[currentItemIndex]?.awakening_step
                }
                label="Type"
                onChange={(e) => {
                  const newState = produce(state, (draft) => {
                    draft[currentIndex].items[currentItemIndex].awakening_step =
                      Number(e.target.value);
                  });

                  setState(newState);
                }}
              >
                <MenuItem value="0">Lv. 0</MenuItem>
                <MenuItem value="1">Lv. 1</MenuItem>
                <MenuItem value="2">Lv. 2</MenuItem>
                <MenuItem value="3">Lv. 3</MenuItem>
                <MenuItem value="4">Lv. 4</MenuItem>
                <MenuItem value="5">Lv. 5</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <InputLabel id="preferred-attribute">
                Preferred Attribute
              </InputLabel>
              <Select
                labelId="preferred-attribute"
                value={
                  state[currentIndex]?.items[currentItemIndex]
                    ?.preferred_attribute
                }
                label="Type"
                onChange={(e) => {
                  const newState = produce(state, (draft) => {
                    draft[currentIndex].items[
                      currentItemIndex
                    ].preferred_attribute = e.target.value;
                  });

                  setState(newState);
                }}
              >
                <MenuItem value="">Remove Attribute</MenuItem>
                {ATTRIBUTES.map((attribute) => (
                  <MenuItem key={attribute} value={attribute}>
                    {attribute}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={handleTooltipModalClose} className="btn">
              Save
            </button>
          </div>
        </div>
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
