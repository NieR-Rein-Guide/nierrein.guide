import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import prisma from "@libs/prisma";
import { lost_archive } from "@prisma/client";
import { CDN_URL } from "@config/constants";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Squares from "@components/decorations/Squares";
import StoriesLayout from "@components/Layout/StoriesLayout";

interface Props {
  lostArchives: lost_archive[];
}

export default function DatabaseStories({ lostArchives }: Props): JSX.Element {
  const [lostArchiveIndex, setLostArchiveIndex] = useState(lostArchives[0].id);

  return (
    <Layout>
      <Meta
        title="Lost Archives stories - Database"
        description="Lost archives stories"
        cover="https://nierrein.guide/cover-stories.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true} className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Return to Database</span>
        </Link>
      </nav>

      <StoriesLayout>
        <div className="relative">
          <div className="flex items-center gap-y-4 gap-x-4 bg-grey-dark border border-beige border-opacity-50 p-4 mb-8">
            <FormControl className="flex-1">
              <InputLabel id="season-index">Lost Archive</InputLabel>
              <Select
                labelId="season-index"
                value={lostArchiveIndex}
                label="Type"
                onChange={(e) => {
                  setLostArchiveIndex(e.target.value);
                }}
              >
                {lostArchives.map((lostArchive) => (
                  <MenuItem
                    className="flex items-center justify-between"
                    key={lostArchive.id}
                    value={lostArchive.id}
                  >
                    <span>{lostArchive.name}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <article className="relative bordered bg-grey-dark p-4 rounded-lg">
            <Squares />
            {lostArchives
              .filter((lostArchive) => lostArchive.id === lostArchiveIndex)
              .map((lostArchive) => (
                <div key={lostArchive.id}>
                  <img
                    className="mb-4"
                    src={`${CDN_URL}${lostArchive.image_path}`}
                    alt={`${lostArchive.name} image`}
                    loading="lazy"
                  />
                  <p
                    className="whitespace-pre-wrap mb-4 pl-4"
                    dangerouslySetInnerHTML={{
                      __html: lostArchive.story,
                    }}
                  ></p>
                </div>
              ))}
          </article>
        </div>
      </StoriesLayout>
    </Layout>
  );
}

export async function getStaticProps() {
  const lostArchives = await prisma.dump.lost_archive.findMany();

  return {
    props: JSON.parse(
      JSON.stringify({
        lostArchives,
      })
    ),
  };
}
