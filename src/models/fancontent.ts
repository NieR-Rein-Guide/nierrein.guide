import client from "@libs/api"
import { gql } from "graphql-request"

export type FanContent = {
  author: string;
  link: string;
  image?: {
    width: number;
    height: number;
    url: string;
  };
  published_at: string;
}

async function getAllFanContents(): Promise<FanContent[]> {
  const GET_FAN_CONTENTS = gql`
    {
      fanContents {
        author
        is_approved
        image {
          width
          height
          url
        }
        published_at
        updated_at
      }
    }
  `

  const { fanContents } = await client.request(GET_FAN_CONTENTS)
  return fanContents
}

interface SubmitFanContentArgs {
  author: string;
  link: string;
  image: File;
}

async function submitFanContent({ author, link, image }: SubmitFanContentArgs): Promise<void> {
  const CREATE_FAN_CONTENT = gql`
    mutation submitFanContent($author: String!, $link: String!, $image: UploadFile!) {
      createFanContent(input: { data: {
        author: $author,
        link: $link,
        image: $image
      }}) {
        fanContent {
          author
          link
          image
        }
      }
    }
  `

  return client.request(CREATE_FAN_CONTENT, {
    author,
    link,
    image
  })
}

export {
  getAllFanContents,
  submitFanContent
}
