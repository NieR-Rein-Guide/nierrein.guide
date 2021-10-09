import localforage from "localforage";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { useState } from "react";
import WeaponCalculator from "@components/calculators/Weapons";
import CharacterCalculator from "@components/calculators/Characters";

export default function XpCalcPage(): JSX.Element {
    return (
        <Layout>
            <Meta
                title="XP Calculation"
                description="Tool to calculate amounts of materials to level up characters and weapons."
                cover="https://nierrein.guide/cover-tools.jpg"
            />

            <div className="grid lg:grid-cols-2 mb-8">
                <div className="order-2 mt-4 md:mt-0 md:order-1">
                    <WeaponCalculator />
                </div>

                <div className="order-2 mt-4 md:mt-0 md:order-1">
                    <CharacterCalculator />
                </div>
            </div>
        </Layout >
    );
}