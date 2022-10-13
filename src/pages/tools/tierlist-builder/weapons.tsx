import Layout from "@components/Layout";
import Meta from "@components/Meta";
import SVG from "react-inlinesvg";
import produce from "immer";
import {
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import Link from "next/link";
import { useSettingsStore } from "../../../store/settings";
import { useInventoryStore } from "@store/inventory";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiEdit,
  FiMessageCircle,
  FiXCircle,
} from "react-icons/fi";
import classNames from "classnames";
import Image from "next/image";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { BtnSecondary } from "@components/btn";
import axios from "axios";
import Wysiwyg from "@components/Wysiwyg";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Checkbox from "@components/form/Checkbox";
import { getAllWeapons } from "@models/weapon";
import WeaponSelect from "@components/weapons/WeaponSelect";
import WeaponThumbnail from "@components/WeaponThumbnail";
import ATTRIBUTES from "@utils/attributes";
import { RANK_THUMBNAILS } from "@utils/rankThumbnails";
import { useCreatedTierlists } from "@store/created-tierlists";
import getBaseRarity from "@utils/getBaseRarity";

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
  weapons: (weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
  })[];
}

export default function TierlistBuilder({
  weapons,
}: TierlistBuilderProps): JSX.Element {
  const router = useRouter();

  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  const addTierlist = useCreatedTierlists((state) => state.addTierlist);

  /**
   * Inventory
   */
  const [showOnlyInventory, setShowOnlyInventory] = useState(false);
  const ownedWeapons = useInventoryStore((state) => state.weapons);

  /**
   * Weapons
   */
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
      tier: "ALL",
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
  const [attribute, setAttribute] = useState("all");
  const [currentTooltip, setCurrentTooltip] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Fetch existing tierlist if edit_key is found.
   */
  useEffect(() => {
    if (router.query.edit_key) {
      getExistingTierlist();
    }
  }, [router]);

  useEffect(() => {
    setYup(true);
  }, []);

  useEffect(() => {
    const filteredSelection = getWeaponsSelection();

    setState(
      produce(state, (draft) => {
        draft[draft.length - 1].items = filteredSelection;
      })
    );
  }, [showOnlyInventory, showUnreleasedContent]);

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

  function handleTooltipModalClose() {
    if (!currentTooltip) {
      return;
    }

    const newState = produce(state, (draft) => {
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

  function getWeaponsSelection() {
    const filteredWeapons = weapons
      .filter((costume) => {
        if (showUnreleasedContent) return true;
        return new Date() > new Date(costume.release_time);
      })
      .filter((weap) => {
        if (!showOnlyInventory) return true;
        return ownedWeapons.includes(weap.weapon_id);
      })
      .map((weap) => ({
        ...weap,
        id: `${weap.weapon_id}-${new Date().toISOString()}`,
        tooltip: "",
      }));

    return filteredWeapons;
  }

  async function getExistingTierlist() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/tierlists?edit_key=${router.query.edit_key}`
      );
      const { tierlist, tiers } = data;
      const filteredSelection = getWeaponsSelection();
      const alreadySelectedItems = tiers.map((tier) => tier.items).flat();
      const newSelection = filteredSelection.filter((item) => {
        const isSelected = alreadySelectedItems.findIndex(
          (it) => it.item_id === item.weapon_id
        );

        if (isSelected >= 0) {
          return false;
        }
        return true;
      });
      setTitle(tierlist.title);
      setDescription(tierlist.description);
      setAttribute(tierlist.attribute);
      setState([...tiers, { tier: "ALL", items: newSelection }]);
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

      const response = await axios({
        url: "/api/tierlists",
        method: router.query.edit_key ? "PUT" : "POST",
        data: {
          title,
          description,
          type: "weapons",
          attribute,
          tiers: state.slice(0, state.length - 1),
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
        title="Tierlist Builder - Weapons"
        description="Build your own tier list."
        cover="https://nierrein.guide/tools/tierlist-weapons.jpg"
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
            <div className="flex items-center gap-x-8">
              <FormControl className="w-32">
                <InputLabel id="attribute-select-label">Attribute</InputLabel>
                <Select
                  labelId="attribute-select-label"
                  value={attribute}
                  label="Attribute"
                  onChange={(e) => setAttribute(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  {ATTRIBUTES.map((attribute) => (
                    <MenuItem key={attribute} value={attribute}>
                      {attribute}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          {loading && <div className="fixed inset-0 bg-black bg-opacity-50" />}
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
                              className="absolute -left-3 top-1 transform -translate-y-1/2 bg-beige rounded-full h-10 w-10 flex items-center justify-center transition ease-out-cubic text-beige-darker hover:bg-beige-darker hover:text-white"
                            >
                              <FiEdit size="24" />
                            </button>
                          )}
                          {(ind === state.length - 1 && (
                            <div className="col-span-10 flex justify-between w-full">
                              <p className="">
                                Drag & Drop weapons into the tiers.
                              </p>
                              <Checkbox
                                label="Only inventory"
                                isChecked={showOnlyInventory}
                                setState={(e) =>
                                  setShowOnlyInventory(e.target.checked)
                                }
                              />
                            </div>
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
                          {el.items?.map((item, index) => {
                            return (
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
                                      {item.tooltip && (
                                        <div className="bg-beige absolute top-0 right-0 w-6 h-6 flex justify-center items-center z-20 rounded-full text-black">
                                          <FiMessageCircle />
                                        </div>
                                      )}
                                      <WeaponThumbnail
                                        key={`${item.weapon_id}-${index}`}
                                        element={item.attribute}
                                        rarity={getBaseRarity({
                                          rarity: item.rarity,
                                          is_ex_weapon: item.is_ex_weapon,
                                          evolution_order: item.evolution_order,
                                        })}
                                        type={item.weapon_type}
                                        isDark={item.is_ex_weapon}
                                        alt={item.name}
                                        image_path={item.image_path}
                                      />
                                      {ind === state.length - 1 && (
                                        <div className="text-xxs text-center mt-1">
                                          <span className="text-center text-beige line-clamp-1 leading-none">
                                            {item.is_ex_weapon && (
                                              <span className="text-rarity-4">
                                                EX{" "}
                                              </span>
                                            )}
                                            {item.name}
                                          </span>
                                        </div>
                                      )}
                                      {ind !== state.length - 1 && (
                                        <Tooltip title="Add a comment on this item">
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

                        {ind === state.length - 1 && (
                          <div className="flex justify-center mt-8">
                            <WeaponSelect
                              label="Add a weapon..."
                              weapons={[...weapons].sort(
                                (a, b) =>
                                  -b.weapon_type.localeCompare(a.weapon_type)
                              )}
                              onSelect={(e, weapon) => {
                                if (!weapon) {
                                  return;
                                }

                                setState(
                                  produce(state, (draft) => {
                                    draft[draft.length - 1].items.push({
                                      ...weapon,
                                      id: new Date().toISOString(),
                                      tooltip: "",
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
        <form className="flex" onSubmit={handleTitleModalClose}>
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
          <button type="submit" className="btn">
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
  const { weapons } = await getAllWeapons();

  return {
    props: JSON.parse(
      JSON.stringify({
        weapons,
      })
    ),
  };
}
