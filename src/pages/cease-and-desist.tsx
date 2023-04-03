import Meta from "@components/Meta";
import Layout from "@components/Layout";

export default function CeaseAndDesist(): JSX.Element {
  return (
    <Layout className="justify-center">
      <Meta title="Cease and desist" />

      <div className="bg-grey-lighter bordered relative p-8 mb-4">
        <h2 className="text-center text-4xl">Cease and desist announcement</h2>

        <div className="relative w-full pb-[56.25%] mt-6">
          <iframe
            className="absolute top-0 left-0 w-full h-full border-none"
            src="https://www.youtube.com/embed/cvUNBHfNj4A"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}
