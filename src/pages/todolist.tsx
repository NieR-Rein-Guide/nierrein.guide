// import dynamic from "next/dynamic";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { useEffect, useState } from "react";
// import { Guide, Event } from "@models/types";
// import { getCurrentEvents } from "@models/event";

// interface TodolistPageProps {}

const loginTodos = [
  {
    label: "Receive and send stamina to friends",
  },
  {
    label: "Daily 5 summon",
  },
  {
    label: "Buy 20 stamina potions",
  },
  {
    label: "Gems roulette",
  },
  {
    label: "One exploration",
  },
  {
    label: "Clear all your daily dark trials",
  },
];

const optionalTodos = [
  {
    label: "Daily challenge",
  },
  {
    label: "Daily quests",
  },
  {
    label: "Farming events",
  },

  {
    label: "Guerilla",
  },
];

const preferentialTodos = [
  {
    label: "Farming main quests",
  },
  {
    label: "Farming memoirs",
  },
];

/**
 * Initialize the local storage
 * And the initial todos
 */
function initTodolist() {}

export default function TodolistPage({}): JSX.Element {
  // const [remainingTodos] = useState();

  // useEffect(() => {}, []);

  return (
    <Layout>
      <Meta />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Daily */}
        <section>
          <h2 className="overlap">At login</h2>

          <ul className="flex flex-col gap-y-4">
            {loginTodos.map((todo, index) => (
              <TodoListItem key={index} todo={todo} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="overlap">Depends on the day</h2>

          <ul className="flex flex-col gap-y-4">
            {optionalTodos.map((todo, index) => (
              <TodoListItem key={index} todo={todo} />
            ))}
          </ul>
        </section>

        <section className="col-span-2">
          <h2 className="overlap">Depends on what you need</h2>

          <ul className="flex flex-col gap-y-4">
            {preferentialTodos.map((todo, index) => (
              <TodoListItem key={index} todo={todo} />
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}

function TodoListItem({ todo }) {
  return (
    <label className="flex items-center cursor-pointer">
      <li className="inline-flex items-center bg-grey-foreground py-6 px-8 rounded-sm w-full">
        <input type="checkbox" className="cursor-pointer" />
        <div className="ml-2 inline">{todo.label}</div>
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
