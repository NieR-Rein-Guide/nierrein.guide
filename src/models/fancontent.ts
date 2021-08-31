import client from "@libs/api"
import axios from "axios"
import { gql } from "graphql-request"
import { FanContent } from "./types"


async function getAllFanContents(): Promise<FanContent[]> {
  const GET_FAN_CONTENTS = gql`
    {
      fanContents (sort: "published_at:desc", where: { is_approved: true }) {
        author
        link
        type
        is_approved
        image {
          formats
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
  type: 'art' | 'video';
  author: string;
  link: string;
  image: File;
}

function submitFanContent({ type, author = '', link, image }: SubmitFanContentArgs): Promise<void> {
  const formData = new FormData()

  if (type === 'video') {
    formData.append('data', JSON.stringify({ link, type }))

    return axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}fan-contents`, formData)
  }

  if (type === 'art') {
    formData.append('data', JSON.stringify({ author, link, type }))
    formData.append(`files.image`, image, image.name);

    return axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}fan-contents`, formData)
  }
}

export {
  getAllFanContents,
  submitFanContent
}
