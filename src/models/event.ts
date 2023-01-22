import client from "@libs/api"
import { gql } from "graphql-request"
import { Event } from "./types"

async function getAllEvents(): Promise<Event[]> {
  const GET_EVENTS = gql`
    {
      events(sort: "start_date:desc") {
        id
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

  const GET_EVENTS_2 = gql`
    {
      events(sort: "start_date:desc", start: 100) {
        id
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

  const { events: events2 } = await client.request(GET_EVENTS_2)

  const allEvents = [
    ...events,
    ...events2,
  ]

  return allEvents
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
        id
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

async function getEventById(id: number): Promise<Event> {
  const GET_EVENT = gql`
    query getSingleEvent($id: Int!) {
      events (where: {id: $id}) {
        id
        title
        slug
        content
        image {
          formats
        }
        start_date
        end_date
      }
    }
  `

  const { events } = await client.request(GET_EVENT, {
    id,
  })
  return events[0]
}

export {
  getAllEvents,
  getCurrentEvents,
  getFutureEvents,
  getEvent,
  getEventById
}