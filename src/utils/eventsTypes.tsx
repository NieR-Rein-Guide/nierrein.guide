import React from "react";
import { FiBook } from "react-icons/fi";

export const eventsTypes = {
  record: {
    label: "Record",
    icon: <FiBook />,
  },
  premium_summons: {
    label: "Premium Summons",
    icon: <img src="/icons/gem.png" alt="gem" />,
  },
  weekly_summons: {
    label: "Weekly Summons",
    icon: <img src="/icons/gem.png" alt="gem" />,
  },
  monthly_summons: {
    label: "Monthly Summons",
    icon: <img src="/icons/gem.png" alt="gem" />,
  },
  abyss_tower: {
    label: "Abyss Tower",
    icon: (
      <img src="/icons/tower.png" height="48" className="h-12" alt="tower" />
    ),
  },
  variation: {
    label: "Variation",
    icon: <img src="/icons/variation-ticket.png" alt="tower" />,
  },
  anecdote: {
    label: "Anecdote",
    icon: (
      <img src="/icons/panel.jpg" height="32" className="h-8" alt="panel" />
    ),
  },
  campaign: {
    label: "Campaign",
    icon: <img src="" alt="" />,
  },
};
