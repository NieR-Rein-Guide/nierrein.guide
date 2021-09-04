import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Credits from "@components/Credits";

export default function AboutPage(): JSX.Element {
  return (
    <Layout>
      <Meta
        title="About"
        description="About NieR Re[in] Guide"
        cover="https://nierrein.guide/cover-about.jpg"
      />

      <section className="mb-32">
        <h2 className="overlap">About</h2>

        <div className="wysiwyg">
          <p className="text-lg">
            We are a team of passionate individuals working together to bring
            you free, high quality content such as guides, updated tierlists,
            complete databases, and more!
          </p>
        </div>
      </section>

      <Credits />
    </Layout>
  );
}
