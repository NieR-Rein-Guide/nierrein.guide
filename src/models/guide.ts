import client from "@libs/api"
import { gql } from "graphql-request"

export type Guide = {
  slug: string;
  title: string;
  content: string;
  cover?: {
    width: number;
    height: number;
    url: string;
  };
  published_at: string;
  updated_at?: string;
}

async function getAllGuides(): Promise<Guide[]> {
  const GET_GUIDES = gql`
    {
      guides {
        title
        slug
        content
        cover {
          width
          height
          url
        }
        published_at
        updated_at
      }
    }
  `

  const { guides } = await client.request(GET_GUIDES)
  return guides
}

async function getGuide(slug: string): Promise<Guide> {
  const GET_GUIDE = gql`
    query GetSingleGuide($slug: String!) {
      guides (where: {slug: $slug}) {
        title
        slug
        content
        cover {
          width
          height
          url
        }
        published_at
        updated_at
      }
    }
  `

  const { guides } = await client.request(GET_GUIDE, {
    slug,
  })
  return guides[0]
}

export {
  getAllGuides,
  getGuide
}
