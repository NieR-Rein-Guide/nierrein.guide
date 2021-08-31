// import dynamic from "next/dynamic";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
// import { Guide, Event } from "@models/types";
// import { getCurrentEvents } from "@models/event";

// interface TodolistPageProps {}

const loginTodos = [
  {
    checked: false,
    label: "Receive and send stamina to friends",
    icon: "/ui/skill/skill130001_standard.png",
  },
  {
    checked: false,
    label: "Daily 5 summon",
    icon: "/ui/consumable_item/consumable118002_standard.png",
  },
  {
    checked: false,
    label: "Buy 20 stamina potions",
    icon: "/ui/consumable_item/consumable300001_standard.png",
  },
  {
    checked: false,
    label: "Gems roulette",
    icon: "/ui/consumable_item/consumable200001_standard.png",
  },
  {
    checked: false,
    label: "One exploration",
    icon: "/ui/search/search_rank_1.png",
  },
  {
    checked: false,
    label: "Clear all your daily dark trials",
    icon: "/ui/material/material322002_standard.png",
  },
];

const optionalTodos = [
  {
    checked: false,
    label: "Daily challenge",
    icon: "/ui/costume_emblem/costume_emblem009_standard.png",
  },
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

const preferentialTodos = [
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

export default function TodolistPage({}): JSX.Element {
  return (
    <Layout>
      <Meta />

      <p className="bg-grey-dark p-4 mb-24 max-w-lg mx-auto">
        Offline support and local storage are coming soon.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
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

          <p className="mb-4 bg-grey-dark p-4 mt-8">
            The icons will be updated automatically based on the current day in
            the near future.
          </p>
        </section>

        <section className="xl:col-span-2">
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
      <li className="inline-flex items-center bg-grey-foreground py-6 px-8 rounded-sm w-full relative">
        <input type="checkbox" className="cursor-pointer" />
        <div className="ml-4 inline">{todo.label}</div>
        <img
          alt={`${todo.label} icon`}
          src={todo.icon}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 h-12 w-12"
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
