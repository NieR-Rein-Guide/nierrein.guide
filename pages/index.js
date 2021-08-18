import Head from 'next/head'
import Layout from '../src/Layout'
import { RiRedditLine } from 'react-icons/ri'

import GuerillaTimers from '../components/GuerillaTimers'
import { useEffect, useState } from 'react'

export default function Home() {
  const [renderClientSideComponents, setRenderClientSideComponents] = useState(false)

  useEffect(() => setRenderClientSideComponents(true))

  return (
    <Layout>
      <Head>
        <title>NieR Re[in] Global Guide & Database</title>
      </Head>

      <div>
        <img src="/launched.jpg" alt="NieR Re[in]carnation Launched !" />
      </div>

      <div className="flex items-start justify-between flex-wrap gap-8 my-24">
        {renderClientSideComponents && <GuerillaTimers />}


        <div>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf6QVNcP_iD3D3z4CZmo3vi7Y9N2BgcAdkNWTEWaM_XcMOKWA/viewform?embedded=true" width="500" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>
      </div>

      <section className="w-full flex-grow">
        <h2>Links</h2>

        <ul className="flex justify-around flex-wrap gap-6">
          <li>
            <a className="flex flex-col justify-center gap-y-2" href="https://discord.gg/swgHJJdt7f" rel="noopener noreferrer" target="_blank">
              <img className="max-h-8" src="/discord.svg" alt="Discord" />
              <span>Our Discord</span>
            </a>
          </li>
          <li>
            <a className="flex flex-col justify-center gap-y-2" href="https://discord.gg/4QTuC6xR82" rel="noopener noreferrer" target="_blank">
              <img className="max-h-8" src="/discord.svg" alt="Discord" />
              <span>Official Discord</span>
            </a>
          </li>
          <li>
            <a className="flex flex-col justify-center gap-y-2" href="https://discord.gg/MA4yhvF" rel="noopener noreferrer" target="_blank">
              <img className="max-h-8" src="/discord.svg" alt="Discord" />
              <span>Unofficial Discord</span>
            </a>
          </li>
          <li>
            <a className="flex flex-col justify-center gap-y-2" href="https://www.reddit.com/r/NieRReincarnation/" rel="noopener noreferrer" target="_blank">
              <RiRedditLine size={32} />
              <span>/r/NieRReincarnation/</span>
            </a>
          </li>
        </ul>
      </section>
    </Layout>
  )
}
