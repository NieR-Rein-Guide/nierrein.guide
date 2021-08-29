import client from "@libs/api"
import { Story } from "@models/types"
import { gql } from "graphql-request"

async function getAllStories(): Promise<Story[]> {
  const GET_STORIES = gql`
    {
      lores {
        title
        slug
        cover {
          formats
        }
        released_date
        character_id
        type
      }
    }
  `

  const { lores } = await client.request(GET_STORIES)
  return lores
}

async function getStory(slug: string): Promise<Story> {
  const GET_STORY = gql`
    query GetSingleGuide($slug: String!) {
      lores (where: {slug: $slug}) {
        title
        content
        cover {
          formats
        }
        released_date
        character_id
        type
      }
    }
  `

  const { lores } = await client.request(GET_STORY, {
    slug,
  })
  return lores[0]
}

export {
  getAllStories,
  getStory
}
