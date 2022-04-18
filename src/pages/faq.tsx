import Meta from "@components/Meta";
import Layout from "@components/Layout";
import Accordion from "@components/Accordion";
import { FAQ } from "@models/types";
import { getFAQ } from "@models/faq";

interface FAQProps {
  FAQ: FAQ;
}

export default function FAQPage({ FAQ }: FAQProps): JSX.Element {
  const items = FAQ.qa.map((item) => ({
    title: item.question,
    content: (
      <div
        className="wysiwyg"
        dangerouslySetInnerHTML={{ __html: item.answer }}
      ></div>
    ),
  }));

  return (
    <Layout>
      <Meta
        title="FAQ"
        description="A list of frequently asked questions."
        cover="https://nierrein.guide/cover-faq.jpg"
      />

      <section>
        <h2 className="overlap">FAQ</h2>

        <p>
          Written by{" "}
          <span className="text-beige font-semibold">Hastur#1312</span> (and
          proofread by{" "}
          <span className="text-beige font-semibold">cataclysmical#2221</span>).
        </p>

        <div className="flex flex-col gap-y-14 xl:gap-y-24 mt-4">
          <Accordion items={items} />
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const FAQ = await getFAQ();

  return {
    props: {
      FAQ,
    },
  };
}
