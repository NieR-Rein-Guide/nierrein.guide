import { useEffect, useState } from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import GuerillaTimers from "../components/GuerillaTimers";
import Socials from "../components/Socials";
import CHARACTERS from "../models/character";
import CharacterInfo from "../components/CharacterInfo";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>NieR Re[in] Global Guide & Database</title>
      </Head>

      {CHARACTERS.map((char, index) =>
        <CharacterInfo key={index} character={char}/>
      )}
    </Layout>
  );
}
