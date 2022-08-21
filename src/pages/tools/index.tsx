import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Image from "next/image";
import Link from "next/link";
import Tools from "@components/pages/tools";

export default function Database(): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Tools"
        description="Some tools."
        cover="https://nierrein.guide/tools/xp.jpg"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Tools />
      </div>
    </Layout>
  );
}
