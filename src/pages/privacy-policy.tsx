import Layout from "@components/Layout";
import Meta from "@components/Meta";

export default function PrivacyPolicePage(): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Privacy Policy"
        description="About NieR Re[in] Guide's Privacy Policy"
        cover="https://nierrein.guide/cover-privacy-policy.jpg"
      />

      <section>
        <h2 className="overlap">Privacy Policy</h2>

        <div className="wysiwyg">
          <p>
            Your privacy is important to us. It is NieR Re[in] Guide&#39;s
            policy to respect your privacy and comply with any applicable law
            and regulation regarding any personal information we may collect
            about you, including across our website,{" "}
            <a href="https://nierrein.guide/">https://nierrein.guide/</a>.
          </p>
          <p>
            This policy is effective as of 4 September 2021 and was last updated
            on 4 September 2021.{" "}
          </p>
          <h3>Information We Collect</h3>
          <p>
            Information we collect includes both information you knowingly and
            actively provide us when using or participating in any of our
            services and promotions, and any information automatically sent by
            your devices in the course of accessing our products and services.{" "}
          </p>
          <p>
            We are using an analytics service called{" "}
            <a href="https://umami.is/">umami</a> focused on privacy. It does
            not use cookies and does not identify you.
          </p>
          <h3>Contact Us</h3>
          <p>
            For any questions or concerns regarding your privacy, you may
            contact us using the following email address:{" "}
          </p>
          <a href="mailto:contact@nierrein.guide">contact@nierrein.guide</a>
        </div>
      </section>
    </Layout>
  );
}
