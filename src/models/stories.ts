import { Story } from "@models/types"
import axios from "axios";
import { env } from '../env'

async function getAllStories(): Promise<Story[]> {
  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/lores?sort[0]=updatedAt:desc&populate=*`);

  const stories: Story[] = data.data;

  return stories;
}

async function getStory(slug: string): Promise<Story> {
  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/lores?filters[slug][$eqi]=${slug}&populate=*`);

  const story: Story = data.data[0];

  return story;
}

export {
  getAllStories,
  getStory
}
