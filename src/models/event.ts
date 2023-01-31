import axios from "axios";
import { env } from "../env";
import { Event } from "./types";

async function getAllEvents(): Promise<Event[]> {
  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/events?sort[0]=start_date:desc&populate=*`,);

  const events: Event[] = data.data;

  return events;
}

async function getEventBySlug(slug: string): Promise<Event> {
  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/events?filters[slug][$eqi]=${slug}&populate=*`
  );

  const event = data.data?.[0];

  return event;
}

async function getEventById(id: number): Promise<Event> {
  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/events/${id}?populate=*`);

  const event = data.data;

  return event;
}

export { getAllEvents, getEventById, getEventBySlug };
