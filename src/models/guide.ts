import client from "@libs/api"
import { gql } from "graphql-request"
import { Guide } from "./types"

async function getFeaturedGuides(): Promise<Guide[]> {
  const GET_GUIDES = gql`
    {
      featuredGuide  {
        guides {
          title
          author
          slug
          content
          cover {
            width
            height
            url
            formats
          }
          published_at
          updated_at
        }
      }
    }
  `

  const { featuredGuide } = await client.request(GET_GUIDES)
  return featuredGuide.guides
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
          formats
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
  getGuide,
  getFeaturedGuides
}
