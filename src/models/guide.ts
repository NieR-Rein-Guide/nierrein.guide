import axios from "axios";
import { env } from "../env";
import { Guide } from "./types"

async function getAllGuides(): Promise<Guide[]> {
  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/guides?sort[0]=updatedAt:desc&populate=*`,);

  const guides: Guide[] = data.data;

  return guides;
}

async function getGuideBySlug(slug: string): Promise<Guide> {
  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/guides?filters[slug][$eqi]=${slug}&populate=*`
  );

  return data.data?.[0];
}

async function getGuideById(id: number): Promise<Guide> {
  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/guides/${id}?populate=*`);

  return data.data;
}

export {
  getAllGuides,
  getGuideBySlug,
  getGuideById,
}
