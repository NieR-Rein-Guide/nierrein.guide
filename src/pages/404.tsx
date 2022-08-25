import Meta from "@components/Meta";
import Layout from "@components/Layout";

export default function NotFound(): JSX.Element {
  return (
    <Layout className="justify-center">
      <Meta
        title="404"
        description="You reached the end of the Cage."
        cover="https://nierrein.guide/cover-404.jpg"
      />

      <div className="bg-grey-lighter bordered relative p-8 mb-4">
        <h2 className="text-center text-4xl">
          Uh oh. You have reached the edge of the cage.
        </h2>
      </div>

      <p className="text-center text-xl text-beige">
        Maybe in the future there will be something here...
      </p>
    </Layout>
  );
}
