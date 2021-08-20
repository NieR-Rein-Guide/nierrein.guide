import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../src/Layout";

export default function NotFound(): JSX.Element {
  const router = useRouter();

  return (
    <Layout className="justify-center">
      <Head>
        <title>404 - NieR Re[in] Global Guide & Database</title>
      </Head>

      <h2 className="text-center text-4xl">
        Uh oh. <code>{router.asPath}</code> leads to an unknown location of
        the Cage... <br />
        Do we even exists ?<br />
        What is life ?<br />
        Maybe in the future there will be something here...
      </h2>
    </Layout>
  );
}
