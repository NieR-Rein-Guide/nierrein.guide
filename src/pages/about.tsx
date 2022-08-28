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

          <ul>
            <li>
              <p>
                (April 2022) Datamined data is now coming from the dump tool
                created by{" "}
                <a
                  href="https://github.com/onepiecefreak3"
                  rel="noopener noreferrer"
                >
                  onepiecefreak3
                </a>
                :{" "}
                <a
                  href="https://github.com/NieR-Rein-Guide/nier-rein-apps"
                  rel="noopener roferrer"
                >
                  NieR-Rein-Guide/nier-rein-apps
                </a>
              </p>
            </li>
            <li>
              <p>
                (Aug/Sept 2021) Mayge#1207 worked on a Python script that could
                export usable .json data from Bivi's tool
              </p>
            </li>
            <li>
              <p>
                (August 2021) Bivi#2020 worked on{" "}
                <a
                  href="https://github.com/190nm/rein-kuro/"
                  rel="noopener no referrer"
                >
                  190nm/rein-kuro/
                </a>{" "}
                that allowed us to use datamined data.
              </p>
            </li>
            <li>
              <p>(August 2021) Tark#0857 provided us a static .json</p>
            </li>
          </ul>
        </div>
      </section>

      <Credits />
    </Layout>
  );
}
