import client from "@libs/api"
import { gql } from "graphql-request"
import { Event } from "./types"

async function getAllEvents(): Promise<Event[]> {
  const GET_EVENTS = gql`
    {
      events(sort: "start_date:desc") {
        title
        slug
        image {
          formats
        }
        start_date
        end_date
        poll {
          title
          embed
        }
      }
    }
  `

  const { events } = await client.request(GET_EVENTS)

  return events
}

async function getCurrentEvents({ currentDate }: { currentDate: string}): Promise<Event[]> {
  const GET_EVENTS = gql`
    query getCurrentEvents($current_date: String!) {
      events(sort: "start_date:desc", where: { end_date_gt: $current_date, start_date_lt: $current_date }) {
        title
        slug
        image {
          formats
        }
        start_date
        end_date
        poll {
          title
          embed
        }
      }
    }
  `

  const { events } = await client.request(GET_EVENTS, {
    current_date: currentDate
  })

  return events
}

async function getFutureEvents({ currentDate }: { currentDate: string}): Promise<Event[]> {
  const GET_EVENTS = gql`
    query getFutureEvents($current_date: String!) {
      events(sort: "start_date:desc", where: { start_date_gt: $current_date }) {
        title
        slug
        image {
          formats
        }
        start_date
        end_date
        poll {
          title
          embed
        }
      }
    }
  `

  const { events } = await client.request(GET_EVENTS, {
    current_date: currentDate
  })

  return events
}

async function getEvent(slug: string): Promise<Event> {
  const GET_EVENT = gql`
    query getSingleEvent($slug: String!) {
      events (where: {slug: $slug}) {
        title
        slug
        content
        image {
          formats
        }
        start_date
        end_date
        poll {
          title
          embed
        }
      }
    }
  `

  const { events } = await client.request(GET_EVENT, {
    slug,
  })
  return events[0]
}

export {
  getAllEvents,
  getCurrentEvents,
  getFutureEvents,
  getEvent
}