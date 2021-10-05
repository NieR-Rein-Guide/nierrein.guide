import axios from 'axios'
import { FAQ } from './types'

export async function getFAQ(): Promise<FAQ> {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}faq`)
  return data
}