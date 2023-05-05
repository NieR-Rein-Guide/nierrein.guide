import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import prisma from "@libs/prisma";
import { card_story } from "@prisma/client";
import { CDN_URL } from "@config/constants";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Squares from "@components/decorations/Squares";
import StoriesLayout from "@components/Layout/StoriesLayout";

interface Props {
  anecdotes: card_story[];
}

export default function DatabaseStories({ anecdotes }: Props): JSX.Element {
  const [anecdoteIndex, setAnecdoteIndex] = useState(anecdotes[0].id);

  return (
    <Layout>
      <Meta
        title="Anecdotes stories - Database"
        description="Anecdotes stories"
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
              <InputLabel id="season-index">Anecdote</InputLabel>
              <Select
                labelId="season-index"
                value={anecdoteIndex}
                label="Type"
                onChange={(e) => {
                  setAnecdoteIndex(e.target.value);
                }}
              >
                {anecdotes.map((anecdote) => (
                  <MenuItem
                    className="flex items-center justify-between"
                    key={anecdote.id}
                    value={anecdote.id}
                  >
                    <span>{anecdote.name}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <article className="relative bordered bg-grey-dark p-4 rounded-lg">
            <Squares />
            {anecdotes
              .filter((anecdote) => anecdote.id === anecdoteIndex)
              .map((anecdote) => (
                <div key={anecdote.id}>
                  {anecdote.stories.map(({ story, image_path }, index) => (
                    <div key={index} className="my-4">
                      <img
                        className="mb-4"
                        src={`${CDN_URL}${image_path}`}
                        alt={`Story ${index + 1} image`}
                        loading="lazy"
                      />
                      <p
                        className="whitespace-pre-wrap mb-4 pl-4"
                        dangerouslySetInnerHTML={{
                          __html: story,
                        }}
                      ></p>
                    </div>
                  ))}
                </div>
              ))}
          </article>
        </div>
      </StoriesLayout>
    </Layout>
  );
}

export async function getStaticProps() {
  const anecdotes = await prisma.dump.card_story.findMany();

  return {
    props: JSON.parse(
      JSON.stringify({
        anecdotes,
      })
    ),
  };
}
