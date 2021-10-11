import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import WeaponCalculator from "@components/calculators/Weapons";
import CharacterCalculator from "@components/calculators/Characters";

export default function XpCalcPage(): JSX.Element {
  return (
    <Layout>
      <Meta
        title="XP Calculation"
        description="Tool to calculate amounts of materials to level up characters and weapons."
        cover="https://nierrein.guide/tools/xp.jpg"
      />

      <nav className="mb-16">
        <Link href="/tools" passHref>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Tools</span>
          </a>
        </Link>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="mt-4 md:mt-0">
          <WeaponCalculator />
        </div>

        <div className="mt-4 md:mt-0">
          <CharacterCalculator />
        </div>
      </div>
    </Layout>
  );
}
