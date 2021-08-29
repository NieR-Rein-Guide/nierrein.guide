import homeIcon from "../../public/icons/home.png";
import guidesIcon from "../../public/icons/guides.png";
import loadoutsIcon from "../../public/icons/loadout.png";
import tierlistIcon from "../../public/icons/tierlist.png";
import charactersIcon from "../../public/icons/characters.png";
import databaseIcon from "../../public/icons/database.png";
import fanContentIcon from "../../public/icons/fancontent.png";

import SVG from "react-inlinesvg";

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
    label: "Loadouts",
    href: "/loadouts",
    icon: loadoutsIcon,
  },
  {
    label: "Tier lists",
    href: "/tierlists",
    icon: tierlistIcon,
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
    label: "Fan Content",
    href: "/fan-content",
    icon: fanContentIcon,
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
    startedBy: "jonbttt",
    link: "https://docs.google.com/spreadsheets/d/14-DZc4wyi1deE_-s1lgcMoEorCfAvQGY-3nseyAWOnY/edit#gid=385153085",
    progress: 60,
  },
  {
    name: "Materials compilation",
    startedBy: "Senka",
    link: "https://docs.google.com/spreadsheets/d/1dUs4ajYMQhDHYj8FtJ8hfqhInTrE29j8PJhVV_hbFn4/edit#gid=0",
    progress: 40,
  },
  {
    name: "Quests Data",
    startedBy: "keek",
    link: "https://docs.google.com/spreadsheets/d/1TBNSDa_Ys2c4kBnrIsRKtCHukMuZYOvMe44pxdyZ72c/edit#gid=0",
    progress: 50,
  },
  {
    name: "Daily Rates",
    startedBy: "keek",
    link: "https://docs.google.com/spreadsheets/d/1FFL2Gej8UGphIVaGySk_Dwa7k4xc-PDB1pyqETfQ0JQ/edit#gid=0",
    progress: 50,
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
    link: "https://dr0p.me/",
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
].sort((a, b) => a.name.localeCompare(b.name));

export const GITHUB_REPO_LINK =
  "https://github.com/NieR-Rein-Guide/nierrein.guide";

export const meta = {
  title: "NieR Re[in] Global Guide & Database",
  description:
    "Brings you free, high quality content : Guides, updated tierlists, complete databases, 3d model viewer and more!",
  url: "https://nierrein.guide/",
  cover: "https://nierrein.guide/cover.jpg",
};

export const GAME_TIMEZONE = "US/Pacific";
export const SITE_URL = "https://nierrein.guide";
export const DISCORD_URL = "https://discord.gg/swgHJJdt7f";

interface Social {
  label: string;
  href: string;
  icon: JSX.Element;
}

export const SOCIALS: Social[] = [
  {
    label: "Our Discord",
    href: DISCORD_URL,
    icon: <SVG src="/logos/discord.svg" height="32" />,
  },
  {
    label: "Our Twitter",
    href: "https://twitter.com/NierReinGuide",
    icon: <SVG src="/logos/twitter.svg" height="32" />,
  },
  {
    label: "Our Instagram",
    href: "https://www.instagram.com/nierreinguide/",
    icon: <SVG src="/logos/instagram.svg" height="32" />,
  },
  {
    label: "Official Discord",
    href: "https://discord.gg/4QTuC6xR82",
    icon: <SVG src="/logos/discord.svg" height="32" />,
  },
  {
    label: "Subreddit",
    href: "https://www.reddit.com/r/NieRReincarnation/",
    icon: <SVG src="/logos/reddit.svg" height="42" />,
  },
  {
    label: "Official Subreddit Discord",
    href: "https://www.discord.gg/nier",
    icon: <SVG src="/logos/discord.svg" height="32" />,
  },
];
