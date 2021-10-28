import { Event } from "../models/event";
import { transformObjectToIdList } from "../helpers/list";

// // https://unsplash.com/
const DUMMY_EVENTS: Event[] = [
  {
    id: "e1",
    title: "Programming for everyone",
    description:
      "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
    location: "Somestreet 25, 12345 San Somewhereo",
    date: "2021-05-12",
    image: "images/coding-event.jpg",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Networking for introverts",
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: "New Wall Street 5, 98765 New Work",
    date: "2021-05-30",
    image: "images/introvert-event.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Networking for extroverts",
    description:
      "You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.",
    location: "My Street 12, 10115 Broke City",
    date: "2022-04-10",
    image: "images/extrovert-event.jpg",
    isFeatured: true,
  },
];

async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(
    "https://nextjs-course-bdb90-default-rtdb.firebaseio.com/events.json"
  );
  const data: { [key: string]: Event } = await res.json();

  return transformObjectToIdList(data);
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await fetchEvents();
  return events.filter((event) => event.isFeatured);
}

export function getAllEvents(): Event[] {
  // const events = await fetchEvents();
  return DUMMY_EVENTS;
}

export function getDateFilteredEvents(dateFilter: {
  year: number;
  month: number;
}): Event[] {
  const { year, month } = dateFilter;
  // const events = await fetchEvents();
  return DUMMY_EVENTS.filter(({ date }) => {
    const eventDate = new Date(date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}

export function getEventById(id: string): Event | undefined {
  // const events = await fetchEvents();
  return DUMMY_EVENTS.find((event) => event.id === id);
}
