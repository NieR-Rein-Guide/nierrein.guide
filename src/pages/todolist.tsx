// import dynamic from "next/dynamic";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import classNames from "classnames";
import localforage from "localforage";
import { useEffect } from "react";
import { useState } from "react";
// import { Guide, Event } from "@models/types";
// import { getCurrentEvents } from "@models/event";

// interface TodolistPageProps {}

interface Todo {
  checked: boolean;
  label: string;
  icon: string;
}

const defaultLoginTodos: Todo[] = [
  {
    checked: false,
    label: "Receive and send stamina to friends",
    icon: "/ui/skill/skill130001_standard.png",
  },
  {
    checked: false,
    label: "Buy 20 stamina potions",
    icon: "/ui/consumable_item/consumable300001_standard.png",
  },
  {
    checked: false,
    label: "Daily 5 summon",
    icon: "/ui/consumable_item/consumable118002_standard.png",
  },
  {
    checked: false,
    label: "Daily challenge",
    icon: "/ui/costume_emblem/costume_emblem009_standard.png",
  },
  {
    checked: false,
    label: "One exploration",
    icon: "/ui/search/search_rank_1.png",
  },
  {
    checked: false,
    label: "Clear all daily dark lair quests",
    icon: "/ui/material/material322002_standard.png",
  },
  {
    checked: false,
    label: "Gems roulette",
    icon: "/ui/consumable_item/consumable200001_standard.png",
  },
];

const defaultOptionalTodos: Todo[] = [
  {
    checked: false,
    label: "Daily Quests",
    icon: "/ui/material/material321011_standard.png",
  },
  {
    checked: false,
    label: "Farming events",
    icon: "/ui/consumable_item/consumable110025_standard.png",
  },

  {
    checked: false,
    label: "Guerilla Quests",
    icon: "/ui/material/material200004_standard.png",
  },
];

const defaultPreferentialTodos: Todo[] = [
  {
    checked: false,
    label: "Farming main quests",
    icon: "/ui/material/material330008_standard.png",
  },
  {
    checked: false,
    label: "Farming memoirs",
    icon: "/ui/memory/memory015_full.png",
  },
];

export default function TodolistPage(): JSX.Element {
  const [loginTodos, setLoginTodos] = useState(defaultLoginTodos);
  const [optionalTodos, setOptionalTodos] = useState(defaultOptionalTodos);
  const [preferentialTodos, setPreferentialTodos] = useState(
    defaultPreferentialTodos
  );

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    localforage.setItem("loginTodos", loginTodos);
  }, [loginTodos]);

  useEffect(() => {
    localforage.setItem("optionalTodos", optionalTodos);
  }, [optionalTodos]);

  useEffect(() => {
    localforage.setItem("preferentialTodos", preferentialTodos);
  }, [preferentialTodos]);

  function updateLoginTodos(todo: Todo) {
    setLoginTodos(
      loginTodos.map((t) => {
        if (t.label === todo.label) {
          return { ...t, checked: !t.checked };
        }
        return t;
      })
    );
  }

  function updateOptionalTodos(todo: Todo) {
    setOptionalTodos(
      optionalTodos.map((t) => {
        if (t.label === todo.label) {
          return { ...t, checked: !t.checked };
        }
        return t;
      })
    );
  }

  function updatePreferentialTodos(todo: Todo) {
    setPreferentialTodos(
      preferentialTodos.map((t) => {
        if (t.label === todo.label) {
          return { ...t, checked: !t.checked };
        }
        return t;
      })
    );
  }

  async function getAllTodos() {
    const [localLoginTodos, localOptionalTodos, localPreferentialTodos] =
      await Promise.all([
        localforage.getItem<Todo[]>("loginTodos"),
        localforage.getItem<Todo[]>("optionalTodos"),
        localforage.getItem<Todo[]>("preferentialTodos"),
      ]);

    setLoginTodos(localLoginTodos || defaultLoginTodos);
    setOptionalTodos(localOptionalTodos || defaultOptionalTodos);
    setPreferentialTodos(localPreferentialTodos || defaultPreferentialTodos);
  }

  return (
    <Layout>
      <Meta
        title="Todolist"
        description="Keep track of what you need to do every day"
        cover="https://nierrein.guide/cover-todolist.jpg"
      />

      <p className="bg-grey-dark p-4 mb-16 max-w-md">
        <p>The data are saved locally.</p>
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
        {/* Daily */}
        <section>
          <h2 className="overlap">At login</h2>

          <ul className="flex flex-col gap-y-4">
            {loginTodos.map((todo) => (
              <TodoListItem
                key={todo.label}
                todo={todo}
                updateTodo={updateLoginTodos}
              />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="overlap">Depends on the day</h2>

          <ul className="flex flex-col gap-y-4">
            {optionalTodos.map((todo) => (
              <TodoListItem
                key={todo.label}
                todo={todo}
                updateTodo={updateOptionalTodos}
              />
            ))}
          </ul>

          <p className="mb-4 bg-grey-dark p-4 mt-8">
            The icons will be updated automatically based on the current day in
            the near future.
          </p>
        </section>

        <section className="xl:col-span-2">
          <h2 className="overlap">Depends on what you need</h2>

          <ul className="flex flex-col gap-y-4">
            {preferentialTodos.map((todo) => (
              <TodoListItem
                key={todo.label}
                todo={todo}
                updateTodo={updatePreferentialTodos}
              />
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}

interface TodoListItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}

function TodoListItem({ todo, updateTodo }: TodoListItemProps) {
  return (
    <label className="flex items-center cursor-pointer">
      <li
        className={classNames(
          "inline-flex items-center py-6 px-8 rounded-sm w-full relative transition hover:bg-grey-dark",
          todo.checked ? "bg-grey-dark" : "bg-grey-foreground"
        )}
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.checked}
          onChange={() => updateTodo(todo)}
        />
        <div className="ml-6 inline pr-6">{todo.label}</div>
        <img
          alt={`${todo.label} icon`}
          src={todo.icon}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 h-12 w-12"
        />

        <img
          className={classNames(
            "absolute h-16 left-2 transform scale-90 ease-out-cubic transition-all",
            todo.checked ? "opacity-100 scale-100" : "opacity-0"
          )}
          src="/ui/costume_emblem/costume_emblem099_full.png"
          alt="Checked"
        />
      </li>
    </label>
  );
}

// export async function getStaticProps() {
//   const [featuredGuides, currentEvents] = await Promise.all([
//     getCurrentEvents({ currentDate: new Date().toISOString() }),
//   ]);

//   return {
//     props: {
//       currentEvents,
//     },
//     revalidate: 60,
//   };
// }