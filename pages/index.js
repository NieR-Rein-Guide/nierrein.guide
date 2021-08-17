import Head from 'next/head'
import Layout from '../src/Layout'

import GuerillaTimers from '../src/components/GuerillaTimers'
import { useEffect, useState } from 'react'

export default function Home() {
  const [renderClientSideComponents, setRenderClientSideComponents] = useState(false)

  useEffect(() => setRenderClientSideComponents(true))

  return (
    <Layout>
      <Head>
        <title>NieR Re[in] Global Guide & Database</title>
        <link rel="icon" href="/artwork/ui/material/material322002_standard.png" />
      </Head>

      <div>
        <img src="/launched.jpg" />
      </div>

      {renderClientSideComponents && <GuerillaTimers />}
    </Layout>
  )
}
