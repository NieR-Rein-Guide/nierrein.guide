import { useEffect, useState } from 'react'
import Head from 'next/head'

import Layout from '../src/Layout'
import GuerillaTimers from '../components/GuerillaTimers'
import Socials from '../components/Socials'

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

      <Socials />
    </Layout>
  )
}
