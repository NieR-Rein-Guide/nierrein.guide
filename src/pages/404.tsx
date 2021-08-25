import Meta from "@components/Meta";
import { useRouter } from "next/router";
import Layout from "@components/Layout";

export default function NotFound(): JSX.Element {
  const router = useRouter();

  return (
    <Layout className="justify-center">
      <Meta
        title="404"
        description="You reached the end of the Cage."
        cover="https://nierrein.guide/cover-404.jpg"
      />

      <h2 className="text-center text-4xl">
        Uh oh. <code>{router.asPath}</code> leads to an unknown location of the
        Cage... <br />
        Do we even exists ?<br />
        What is life ?<br />
        Maybe in the future there will be something here...
      </h2>
    </Layout>
  );
}
