import homeIcon from "../../public/icons/home.png";
import guidesIcon from "../../public/icons/guides.png";
import loadoutsIcon from "../../public/icons/loadout.png";
import tierlistIcon from "../../public/icons/tierlist.png";
import charactersIcon from "../../public/icons/characters.png";
import databaseIcon from "../../public/icons/database.png";
import fanContentIcon from "../../public/icons/fancontent.png";
import SVG from "react-inlinesvg";
import { RiInstagramFill, RiRedditFill } from "react-icons/ri";

export const NAVIGATION = [
  {
    label: "Home",
    href: "/",
    icon: homeIcon,
  },
  {
    label: "Guides",
    href: "/guides",
    icon: guidesIcon,
  },
  {
    label: "Tier lists",
    href: "/tierlists",
    icon: tierlistIcon,
  },
  {
    label: "Loadouts",
    href: "/loadouts",
    icon: loadoutsIcon,
    disabled: true,
  },
  {
    label: "Fan Content",
    href: "/fan-content",
    icon: fanContentIcon,
  },
  {
    label: "Characters",
    href: "/characters",
    icon: charactersIcon,
  },

  {
    label: "Database",
    href: "/database",
    icon: databaseIcon,
  },
  {
    label: "To-do list",
    href: "/todolist",
    icon: homeIcon,
  },
  {
    label: "Tools",
    href: "/tools",
    icon: loadoutsIcon,
  },
];

export const FOOTER_NAVIGATION = [
  {
    label: "About & Contributors",
    href: "/about",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
];

interface Project {
  name: string;
  startedBy: string;
  link: string;
  progress: number;
}

export const CURRENT_PROJECTS: Project[] = [
  {
    name: "Data compilation",
    startedBy: "Mayge and jonbttt",
    link: "https://docs.google.com/spreadsheets/d/14-DZc4wyi1deE_-s1lgcMoEorCfAvQGY-3nseyAWOnY/edit#gid=385153085",
    progress: 80,
  },
  {
    name: "Materials compilation",
    startedBy: "Senka",
    link: "https://docs.google.com/spreadsheets/d/1dUs4ajYMQhDHYj8FtJ8hfqhInTrE29j8PJhVV_hbFn4/edit#gid=0",
    progress: 100,
  },
  {
    name: "Quests Data",
    startedBy: "keek",
    link: "https://docs.google.com/spreadsheets/d/1TBNSDa_Ys2c4kBnrIsRKtCHukMuZYOvMe44pxdyZ72c/edit#gid=0",
    progress: 60,
  },
  {
    name: "Daily Rates",
    startedBy: "keek",
    link: "https://docs.google.com/spreadsheets/d/1FFL2Gej8UGphIVaGySk_Dwa7k4xc-PDB1pyqETfQ0JQ/edit#gid=0",
    progress: 60,
  },
  {
    name: "Q/A Page",
    startedBy: "Senka",
    link: "https://docs.google.com/spreadsheets/d/1shgbaumBEGWPwj-1_1phakcln8fAn4KpVD9_SJK-z4Q/edit?usp=sharing",
    progress: 10,
  },
].sort((a, b) => b.progress - a.progress);

export const CREDITS = [
  {
    name: "Senka",
    link: "https://zax.carrd.co/",
  },
  {
    name: "fran",
    link: "https://bbh-l.carrd.co/",
  },
  {
    name: "Mayge",
  },
  {
    name: "Keitio",
  },
  {
    name: "Naikyo",
  },
  {
    name: "arcadewe",
  },
  {
    name: "jonbttt",
  },
  {
    name: "dvsshadow",
  },
  {
    name: "Keek",
  },
  {
    name: "Halomasterpro",
    link: "https://www.twitch.tv/halomasterpro",
  },
  {
    name: "H'YueWa",
    link: "https://twitter.com/hyuewa",
  },
  {
    name: "NightDrawn",
    link: "https://www.youtube.com/channel/UCpbi_Hbhf4jteSFpTs5MPKg",
  },
  {
    name: "val_pinkman",
    link: "https://twitter.com/val_pinkman",
  },
  {
    name: "PostPwnedTV",
    link: "https://www.youtube.com/channel/UCnGiUC0o44YB60xAs-U6neg",
  },
  {
    name: "Luna",
    link: "https://www.leveleditors.net/",
  },
  {
    name: "Unbound",
    link: "https://github.com/B0und",
  },
  {
    name: "Insta",
  },
  {
    name: "Saba",
  },
  {
    name: "Yuuru",
    link: "https://www.youtube.com/channel/UCeSQF_NZyu2WtjV9EbJkEbQ",
  },
  {
    name: "Rondelle",
    link: "https://twitter.com/Rondelle_fr",
  },
  {
    name: "Syrion",
  },
  {
    name: "Eri",
  },
  {
    name: "Bivi",
    link: "https://github.com/190nm/rein-kuro",
  },
  {
    name: "taida",
  },
  {
    name: "SenZephyr",
  },
  {
    name: "Momonga",
  },
].sort((a, b) => a.name.localeCompare(b.name));

export const GITHUB_REPO_LINK =
  "https://github.com/NieR-Rein-Guide/nierrein.guide";

export const meta = {
  title: "NieR Re[in] Guide",
  description:
    "Brings you free, high quality content : Guides, updated tierlists, complete databases, 3d model viewer and more!",
  url: "https://nierrein.guide/",
  cover: "https://nierrein.guide/cover.jpg",
};

export const GAME_TIMEZONE = "Pacific/Pitcairn";
export const SITE_URL = "https://nierrein.guide";
export const DISCORD_URL = "https://discord.gg/swgHJJdt7f";
export const TWITTER_URL = "https://twitter.com/NierReinGuide";
export const INSTAGRAM_URL = "https://www.instagram.com/nierreinguide/";

interface Social {
  label: string;
  href: string;
  icon: JSX.Element;
}

export const OUR_SOCIALS: Social[] = [
  {
    label: "Discord",
    href: DISCORD_URL,
    icon: <SVG src="/logos/discord.svg" height="26" />,
  },
  {
    label: "Twitter",
    href: TWITTER_URL,
    icon: <SVG src="/logos/twitter.svg" height="26" />,
  },
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: <RiInstagramFill size="32" />,
  },
];

export const SOCIALS: Social[] = [
  ...OUR_SOCIALS,
  {
    label: "Official Discord",
    href: "https://discord.gg/4QTuC6xR82",
    icon: <SVG src="/logos/discord.svg" height="26" />,
  },
  {
    label: "Subreddit",
    href: "https://www.reddit.com/r/NieRReincarnation/",
    icon: <RiRedditFill size="32" />,
  },
  {
    label: "Official Subreddit Discord",
    href: "https://www.discord.gg/nier",
    icon: <SVG src="/logos/discord.svg" height="26" />,
  },
];
