import axios from 'axios'
import { FAQ } from './types'
import { env } from '../env'

export async function getFAQ(): Promise<FAQ> {
  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/faq?populate=*`);

  const faq: FAQ = data.data;

  return faq;
}