import { Fragment } from "react"
import Link from 'next/link'

const NAVIGATION = [
  {
    label: 'Characters',
    href: '/characters',
    iconUrl: '/ui/consumable_item/consumable100001_standard.png',
  },
  {
    label: 'Loadouts',
    href: '/loadouts',
    iconUrl: '/ui/consumable_item/consumable110001_standard.png',
  },
  {
    label: 'Tier list',
    href: '/tierlist',
    iconUrl: '/ui/consumable_item/consumable110002_standard.png',
  },
  {
    label: 'Guides',
    href: '/guides',
    iconUrl: '/ui/consumable_item/consumable110003_standard.png',
  },
  {
    label: 'Database',
    href: '/database',
    iconUrl: '/ui/consumable_item/consumable110007_standard.png',
  }
]

function Layout ({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full">
      <header className="flex justify-between items-center flex-wrap gap-y-8 px-8 py-6">
        <Link href="/" passHref={true}>
          <a className="logo flex items-center">
            <img className="h-14" src="/ui/gem/gem_standard.png" alt="gem"/>
            <h1 className="text-3xl">NieR Re[in] Guide</h1>
          </a>
        </Link>

        <nav className="flex">
          <ul className="nav flex flex-wrap gap-y-6">
            { NAVIGATION.map(nav => (
              <li className="nav-item w-28">
                <Link href={nav.href} passHref={true}>
                  <a className="inline-flex flex-col items-center">
                    <div className="iso">
                      <img className="icon" src={nav.iconUrl} alt="icon" />
                    </div>
                    <span className="mt-4 text-center serif text-xl">{nav.label}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex flex-col w-full flex-1 px-8 text-center">
        { children }
      </main>

      <footer className="flex flex-col items-center justify-center w-full h-24 border-t border-white border-opacity-20">
        <span>NieR Re[in] Guide is not affiliated with or endorsed by SQUARE ENIX CO. LTD.</span>
        <span>All game assets used belongs to © SQUARE ENIX CO. LTD.</span>
      </footer>
    </div>
  )
}

export default Layout