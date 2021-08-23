export const GAME_TIMEZONE = "US/Pacific";

import guidesIcon from '../../public/icons/guides.png'
import loadoutsIcon from '../../public/icons/loadout.png'
import tierlistIcon from '../../public/icons/tierlist.png'
import charactersIcon from '../../public/icons/characters.png'
import databaseIcon from '../../public/icons/database.png'
import fanContentIcon from '../../public/icons/fancontent.png'

export const NAVIGATION = [
  {
    label: 'Guides',
    href: '/guides',
    icon: guidesIcon,
  },
  {
    label: 'Loadouts',
    href: '/loadouts',
    icon: loadoutsIcon,
  },
  {
    label: 'Tier list',
    href: '/tierlist',
    icon: tierlistIcon,
  },
  {
    label: 'Characters',
    href: '/characters',
    icon: charactersIcon,
  },
  {
    label: 'Database',
    href: '/database',
    icon: databaseIcon,
  },
  {
    label: 'Fan Content',
    href: '/fan-content',
    icon: fanContentIcon,
  },
]

export const CREDITS = [
  {
    name: 'Senka',
    link: 'https://zax.carrd.co/'
  },
  {
    name: 'fran',
    link: 'https://bbh-l.carrd.co/'
  },
  {
    name: 'Mayge'
  },
  {
    name: 'Keitio'
  },
  {
    name: 'Naikyo'
  },
  {
    name: 'arcadewe'
  },
  {
    name: 'jonbttt'
  },
  {
    name: 'dvsshadow'
  },
  {
    name: 'Keek'
  },
  {
    name: 'Halomasterpro',
    link: 'https://www.twitch.tv/halomasterpro'
  },
  {
    name: 'H\'YueWa',
    link: 'https://twitter.com/hyuewa'
  },
  {
    name: 'NightDrawn',
    link: 'https://www.youtube.com/channel/UCpbi_Hbhf4jteSFpTs5MPKg'
  },
  {
    name: 'val_pinkman',
    link: 'https://dr0p.me/'
  },
  {
    name: 'PostPwnedTV',
    link: 'https://www.youtube.com/channel/UCnGiUC0o44YB60xAs-U6neg'
  },
  {
    name: 'Luna',
    link: 'https://www.leveleditors.net/'
  }
].sort((a, b) => a.name.localeCompare(b.name))

export const GITHUB_REPO_LINK = 'https://github.com/NieR-Rein-Guide/nierrein.guide'

export const meta = {
  title: 'NieR Re[in] Global Guide & Database',
  description: 'Brings you free, high quality content : Guides, updated tierlists, complete databases, 3d model viewer and more!',
  url: 'https://nierrein.guide/',
  cover: 'https://nierrein.guide/cover.jpg'
}