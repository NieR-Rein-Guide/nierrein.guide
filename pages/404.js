import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../src/Layout";

export default function NotFound() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>404 - NieR Re[in] Global Guide & Database</title>
      </Head>

      <div className="text-center">
        <h2 className="text-4xl">
          Uh oh. <code>{router.asPath}</code> leads to an unknown location of
          the Cage... <br />
          Do we even exists ?<br />
          What is life ?
        </h2>
      </div>
    </Layout>
  );
}
