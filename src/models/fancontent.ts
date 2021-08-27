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
  author: string;
  link: string;
  image: File;
}

function submitFanContent({ author, link, image }: SubmitFanContentArgs): Promise<void> {
  const data = {
    author,
    link,
  }

  const formData = new FormData()

  formData.append('data', JSON.stringify(data))
  formData.append(`files.image`, image, image.name);

  return axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}fan-contents`, formData)
}

export {
  getAllFanContents,
  submitFanContent
}
