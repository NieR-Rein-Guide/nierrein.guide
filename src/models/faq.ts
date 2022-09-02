import axios from 'axios'
import { FAQ } from './types'
import { env } from '../env'

export async function getFAQ(): Promise<FAQ> {
  const { data } = await axios.get(`${env.NEXT_PUBLIC_API_ENDPOINT}faq`)
  return data
}