import homeIcon from "../../public/icons/home.png";
import guidesIcon from "../../public/icons/guides.png";
import loadoutsIcon from "../../public/icons/loadout.png";
import tierlistIcon from "../../public/icons/tierlist.png";
import databaseIcon from "../../public/icons/database.png";
import { RiRedditFill, RiGithubFill, RiTwitterFill } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

/**
 * NAVIGATION LINKS
 */
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
    label: "Tools",
    href: "/tools",
    icon: databaseIcon,
  },
  {
    label: "Loadouts",
    href: "/loadouts",
    icon: loadoutsIcon,
    disabled: true,
  },
];

export const TOOLS = [
  {
    href: "/tools/loadout-builder",
    label: "Loadout builder",
    src: "/tools/loadout.jpg",
    class: "md:col-span-2",
  },
  {
    href: "/tools/tierlist-builder",
    label: "Tierlist builder",
    src: "/tools/tierlist.jpg",
    class: "md:col-span-2",
  },
  {
    href: "/todolist",
    label: "Todolist",
    src: "/tools/stamina.jpg",
  },
  {
    href: "https://billycool.github.io/NierReinGachaSimulator/",
    label: "Gacha simulator",
    src: "/tools/summons.jpg",
  },
  {
    href: "/tools/materials",
    label: "EX weapons materials calc",
    src: "/tools/materials.jpg",
  },
  {
    href: "/tools/xp-calc",
    label: "XP calc",
    src: "/tools/xp.jpg",
  },
  {
    href: "/tools/summons-recap",
    label: "Summons recap",
    src: "/tools/summons-recap.jpg",
    class: "md:col-span-2",
  },
];

export const FOOTER_NAVIGATION = [
  {
    label: "Give feedback",
    href: "https://github.com/NieR-Rein-Guide/nierrein.guide/issues/new",
  },
  {
    label: "About & Contributors",
    href: "/about",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
];

/**
 * CREDITS PAGE
 */
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
  {
    name: "Luke",
    link: "https://www.twitch.tv/luke_cip",
  },
  {
    name: "onepiecefreak",
    links: [
      {
        Icon: <FiGithub size={24} />,
        href: "https://github.com/FanTranslatorsInternational",
      },
      {
        Icon: <FiGithub size={24} />,
        href: "https://github.com/onepiecefreak3",
      },
    ],
  },
  {
    name: "Hastur",
  },
  {
    name: "H34VEN",
    link: "https://discord.gg/Marie123",
  },
  {
    name: "Kapater",
    link: "https://youtube.com/@kapater1398",
  },
  {
    name: "nimbus#8500",
    link: "https://www.twitch.tv/nimbusEXP",
  },
  {
    name: "Astonishing#0795",
  },
  {
    name: "emulsifier",
  },
].sort((a, b) => a.name.localeCompare(b.name));

export const GITHUB_REPO_LINK =
  "https://github.com/NieR-Rein-Guide/nierrein.guide";

/**
 * SEO & META TAGS
 */
export const meta = {
  title: "NieR Re[in] Guide",
  description: "A NieR Re[in]carnation database, guides, tierlists and tools.",
  url: "https://nierrein.guide/",
  cover: "https://nierrein.guide/cover.jpg",
};

/**
 * NieR Re[in]carnation Global Timezone
 */
export const GAME_TIMEZONE = "Pacific/Pitcairn";

/**
 * URLs
 */
export const CDN_URL = "https://assets.nierrein.guide/";
export const SITE_URL = "https://nierrein.guide";
export const DISCORD_URL = "https://discord.gg/swgHJJdt7f";
export const TWITTER_URL = "https://twitter.com/NierReinGuide";
export const INSTAGRAM_URL = "https://www.instagram.com/nierreinguide/";
export const MAMA_INVITE_URL =
  "https://discord.com/oauth2/authorize?client_id=892519460638965811&permissions=379968&scope=bot%20applications.commands";

export const SEA_DATE_DIFFERENCE = 39477600000;
export const GLOBAL_RELEASE_DATE = new Date("2021-07-28T22:00:00.000Z");

/**
 * SOCIALS
 */
interface Social {
  label: string;
  href: string;
  icon: JSX.Element;
}

export const OUR_SOCIALS: Social[] = [
  {
    label: "Discord",
    href: DISCORD_URL,
    icon: <FaDiscord size="32" />,
  },
  {
    label: "Twitter",
    href: TWITTER_URL,
    icon: <RiTwitterFill size="32" />,
  },
  {
    label: "GitHub",
    href: GITHUB_REPO_LINK,
    icon: <RiGithubFill size="32" />,
  },
];

export const SOCIALS: Social[] = [
  ...OUR_SOCIALS,
  {
    label: "Official Discord",
    href: "https://discord.gg/4QTuC6xR82",
    icon: <FaDiscord size="32" />,
  },
  {
    label: "Subreddit",
    href: "https://www.reddit.com/r/NieRReincarnation/",
    icon: <RiRedditFill size="32" />,
  },
  {
    label: "Official Subreddit Discord",
    href: "https://www.discord.gg/nier",
    icon: <FaDiscord size="32" />,
  },
];

/**
 * Recommended YouTube channels
 */

interface YouTubeChannel {
  name: string;
  url: string;
  tags: string[];
  avatarUrl: string;
  note?: string;
}

export const RECOMMENDED_YOUTUBE_CHANNELS: YouTubeChannel[] = [
  {
    name: "gottem11111",
    url: "https://www.youtube.com/@MrGottem11111",
    tags: ["Subjugation", "Reviews", "Recap", "Guides"],
    avatarUrl: "/images/channels/gottem1111.jpg",
  },
  {
    name: "Yung Geesus",
    url: "https://www.youtube.com/@YungGeesus",
    tags: ["Subjugation", "Reviews"],
    avatarUrl: "/images/channels/yunggeesus.jpg",
  },
  {
    name: "Farplane",
    url: "https://www.youtube.com/@farplanegaming",
    tags: ["Arena", "Reviews", "Stream"],
    avatarUrl: "/images/channels/farplane.jpg",
  },
  {
    name: "JpBear",
    url: "https://www.youtube.com/@jpbearjpbear4510",
    tags: ["Subjugation", "Not updated"],
    avatarUrl: "/images/channels/jpbear.jpg",
  },
];

/**
 * VALUED WEAPONS
 */
export const VALUED_TYPES = {
  ABILITY: "ABILITY",
  SKILL_COOLDOWN: "SKILL_COOLDOWN",
  SKILL: "SKILL",
};

export const VALUED_TYPES_LABEL = {
  none: {
    label: "Nothing",
    description: "",
  },
  great: {
    label: "Great abilities",
    description: "",
  },
  good: {
    label: "Good abilities",
    description: "",
  },
  pvp: {
    label: "PvP",
    description: "",
  },
  supportMainhand: {
    label: "Support skills",
    description: "",
  },
  supportOffhand: {
    label: "Tanky abilities",
    description: "",
  },
};

export const VALUED_WEAPONS = {
  none: [],
  pvp: [
    {
      type: VALUED_TYPES.ABILITY,
      value: "Fleetfoot",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Haste",
    },
    // + good offensive passives
    {
      type: VALUED_TYPES.SKILL_COOLDOWN,
      value: 16,
    },
  ],
  great: [
    {
      type: VALUED_TYPES.ABILITY,
      value: "Boon",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Bold Vigor",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Caged Vigor",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Pursuit",
    },
  ],
  good: [
    {
      type: VALUED_TYPES.ABILITY,
      value: "Ambush",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Fatal",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Vigor",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Pursuit",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Boon",
    },
  ],
  supportMainhand: [
    {
      type: VALUED_TYPES.SKILL,
      value: "Valiance",
    },
    {
      type: VALUED_TYPES.SKILL,
      value: "Ire",
    },
    {
      type: VALUED_TYPES.SKILL,
      value: "Crush",
    },
    {
      type: VALUED_TYPES.SKILL,
      value: "Recovery",
    },
    {
      type: VALUED_TYPES.SKILL,
      value: "Render",
    },
  ],
  supportOffhand: [
    // Tanky passives
    {
      type: VALUED_TYPES.ABILITY,
      value: "Aegis",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Guard",
    },
    {
      type: VALUED_TYPES.ABILITY,
      value: "Toughness",
    },
  ],
};

/**
 * FEATURED TIERLISTS
 */
export const FEATURED_TIERLISTS = {
  pve: [52],
  pvp: [49, 59, 58],
};

export const SEA_FEATURED_TIERLISTS = {
  pve: [71, 70],
  pvp: [72],
};

/**
 * SLABS
 * ------------------
 */

// STONE TOWER MONUMENT SLABS
export const STONE_TOWER_MONUMENT_SLABS = {
  0: {
    hp: 0,
    atk: 0,
    vit: 0,
    agi: 0,
    crit_rate: 0,
    crit_atk: 0,
    abilities: [],
  },
  33: {
    hp: 26800,
    atk: 1890,
    vit: 1800,
    agi: 0,
    crit_rate: 0,
    crit_atk: 0,
    abilities: [
      {
        name: "Discipline (x3)",
        level: 2,
        description:
          "Grants a 2% greater chance that your normal attacks will be a 3-chain.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability300008/ability300008_standard.png",
      },
    ],
  },
  67: {
    hp: 50000,
    atk: 3900,
    vit: 3750,
    agi: 0,
    crit_rate: 0,
    crit_atk: 0,
    abilities: [
      {
        name: "Discipline (x3)",
        level: 2,
        description:
          "Grants a 2% greater chance that your normal attacks will be a 3-chain.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability300008/ability300008_standard.png",
      },
      {
        name: "Discipline (x4)",
        level: 2,
        description:
          "Grants a 2% greater chance that your normal attacks will be a 4-chain.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability300008/ability300008_standard.png",
      },
    ],
  },
  100: {
    hp: 77600,
    atk: 5820,
    vit: 5400,
    agi: 0,
    crit_rate: 0,
    crit_atk: 0,
    abilities: [
      {
        name: "Discipline (x3)",
        level: 5,
        description:
          "Grants a 5% greater chance that your normal attacks will be a 3-chain.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability300008/ability300008_standard.png",
      },
      {
        name: "Discipline (x4)",
        level: 5,
        description:
          "Grants a 5% greater chance that your normal attacks will be a 4-chain.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability300008/ability300008_standard.png",
      },
      {
        name: "Discipline (x5)",
        level: 4,
        description:
          "Grants a 4% greater chance that your normal attacks will be a 5-chain.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability300008/ability300008_standard.png",
      },
    ],
  },
};

// CURSED GOD MONUMENT SLABS
export const CURSED_GOD_MONUMENT_SLABS = {
  0: {
    hp: 0,
    atk: 0,
    vit: 0,
    agi: 0,
    crit_rate: 0,
    crit_atk: 0,
    abilities: [],
  },
  33: {
    hp: 8000,
    atk: 600,
    vit: 450,
    agi: 0,
    crit_rate: 0,
    crit_atk: 0,
    abilities: [
      {
        name: "Blaze Rush",
        level: 3,
        description:
          "Increases the stats of equipped fire-affinity weapons by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100012/ability100012_standard.png",
      },
      {
        name: "Icewater Rush",
        level: 3,
        description:
          "Increases the stats of equipped water-affinity weapons by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100013/ability100013_standard.png",
      },
      {
        name: "Whirldwind Rush",
        level: 3,
        description:
          "Increases the stats of equipped wind-affinity weapons by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100014/ability100014_standard.png",
      },
      {
        name: "Luminous Rush",
        level: 3,
        description:
          "Increases the stats of equipped light-affinity weapons by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100015/ability100015_standard.png",
      },
      {
        name: "Void Rush",
        level: 3,
        description:
          "Increases the stats of equipped dark-affinity weapons by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100016/ability100016_standard.png",
      },
      {
        name: "Blaze Boon",
        level: 3,
        description: "Fire damage dealt up by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200001/ability200001_standard.png",
      },
      {
        name: "Liquid Boon",
        level: 3,
        description: "Water damage dealt up by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200002/ability200002_standard.png",
      },
      {
        name: "Tempest Boon",
        level: 3,
        description: "Increase wind damage by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200003/ability200003_standard.png",
      },
      {
        name: "Lucid Boon",
        level: 3,
        description: "Increase light damage by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200004/ability200004_standard.png",
      },
      {
        name: "Void Boon",
        level: 3,
        description: "Dark damage dealt up by 3%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200005/ability200005_standard.png",
      },
    ],
  },
  67: {
    hp: 16000,
    atk: 1200,
    vit: 900,
    agi: 0,
    crit_rate: 0,
    crit_atk: 0,
    abilities: [
      {
        name: "Blaze Rush",
        level: 6,
        description:
          "Increases the stats of equipped fire-affinity weapons by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100012/ability100012_standard.png",
      },
      {
        name: "Icewater Rush",
        level: 6,
        description:
          "Increases the stats of equipped water-affinity weapons by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100013/ability100013_standard.png",
      },
      {
        name: "Whirldwind Rush",
        level: 6,
        description:
          "Increases the stats of equipped wind-affinity weapons by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100014/ability100014_standard.png",
      },
      {
        name: "Luminous Rush",
        level: 6,
        description:
          "Increases the stats of equipped light-affinity weapons by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100015/ability100015_standard.png",
      },
      {
        name: "Void Rush",
        level: 6,
        description:
          "Increases the stats of equipped dark-affinity weapons by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100016/ability100016_standard.png",
      },
      {
        name: "Blaze Boon",
        level: 6,
        description: "Fire damage dealt up by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200001/ability200001_standard.png",
      },
      {
        name: "Liquid Boon",
        level: 6,
        description: "Water damage dealt up by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200002/ability200002_standard.png",
      },
      {
        name: "Tempest Boon",
        level: 6,
        description: "Increase wind damage by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200003/ability200003_standard.png",
      },
      {
        name: "Lucid Boon",
        level: 6,
        description: "Increase light damage by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200004/ability200004_standard.png",
      },
      {
        name: "Void Boon",
        level: 6,
        description: "Dark damage dealt up by 6%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200005/ability200005_standard.png",
      },
    ],
  },
  100: {
    hp: 24000,
    atk: 1800,
    vit: 1350,
    agi: 0,
    crit_rate: 0,
    crit_atk: 0,
    abilities: [
      {
        name: "Blaze Rush",
        level: 9,
        description:
          "Increases the stats of equipped fire-affinity weapons by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100012/ability100012_standard.png",
      },
      {
        name: "Icewater Rush",
        level: 9,
        description:
          "Increases the stats of equipped water-affinity weapons by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100013/ability100013_standard.png",
      },
      {
        name: "Whirldwind Rush",
        level: 9,
        description:
          "Increases the stats of equipped wind-affinity weapons by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100014/ability100014_standard.png",
      },
      {
        name: "Luminous Rush",
        level: 9,
        description:
          "Increases the stats of equipped light-affinity weapons by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100015/ability100015_standard.png",
      },
      {
        name: "Void Rush",
        level: 9,
        description:
          "Increases the stats of equipped dark-affinity weapons by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability100016/ability100016_standard.png",
      },
      {
        name: "Blaze Boon",
        level: 9,
        description: "Fire damage dealt up by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200001/ability200001_standard.png",
      },
      {
        name: "Liquid Boon",
        level: 9,
        description: "Water damage dealt up by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200002/ability200002_standard.png",
      },
      {
        name: "Tempest Boon",
        level: 9,
        description: "Increase wind damage by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200003/ability200003_standard.png",
      },
      {
        name: "Lucid Boon",
        level: 9,
        description: "Increase light damage by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200004/ability200004_standard.png",
      },
      {
        name: "Void Boon",
        level: 9,
        description: "Dark damage dealt up by 9%.",
        icon_url:
          "https://assets.nierrein.guide/ui/ability/ability200005/ability200005_standard.png",
      },
    ],
  },
};

// AWAKENING
export const AWAKENING_LEVEL = {
  0: 0,
  1: 0.05, // 5% bonus stats
  2: 0.15, // 15% bonus stats
  3: "Ability Unlocks",
  4: 0.3, // 30% bonus stats
  5: "Debris Unlocked",
};

/**
 * SKILLS TYPES
 */
export const SKILLS_TYPES = [
  // Attributes
  {
    label: "Light",
    options: ["light"],
  },
  {
    label: "Dark",
    options: ["dark"],
  },
  {
    label: "Wind",
    options: ["wind"],
  },
  {
    label: "Water",
    options: ["water"],
  },
  {
    label: "Fire",
    options: ["fire"],
  },
  {
    label: "Own affinity",
    options: ["own affinity"],
  },
  {
    label: "Stun",
    options: ["stun"],
  },
  {
    label: "Burn",
    options: ["burn"],
  },
  {
    label: "Poison",
    options: ["poison"],
  },
  {
    label: "Blind",
    options: ["blind"],
  },
  {
    label: "Pursuit",
    options: ["chains"],
  },
  {
    label: "Compromised",
    options: ["compromised"],
  },
  {
    label: "Sacrifice HP",
    options: ["consume"],
  },
  {
    label: "Heal",
    options: ["recover"],
  },
  {
    label: "Cure",
    options: ["cure"],
  },
  {
    label: "Reduce defense",
    options: ["reduce def", "decrease their def", "reduce enemy defense"],
  },
  {
    label: "Cooldown",
    options: ["cooldown"],
  },
  {
    label: "Buff allies",
    options: ["allies"],
  },
  {
    label: "Usable from start",
    options: ["usable from start", "usable from the start"],
  },
  {
    label: "Gauge increase from start",
    options: ["gauge increase", "gauge up at battle start"],
  },
];

/**
 * REPLACES COSTUMES
 * (alternative costume asset_id ending in "_replace")
 */
export const REPLACE_COSTUME_IDS = [10113, 10114];
