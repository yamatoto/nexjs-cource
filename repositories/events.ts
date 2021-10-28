import { Event } from "../models/event";
import { transformObjectToIdList } from "../helpers/list";

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

export async function getAllEvents(): Promise<Event[]> {
  return await fetchEvents();
}

export async function getDateFilteredEvents(dateFilter: {
  year: number;
  month: number;
}): Promise<Event[]> {
  const { year, month } = dateFilter;
  const events = await fetchEvents();
  return events.filter(({ date }) => {
    const eventDate = new Date(date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}

export async function getEventById(id: string): Promise<Event | undefined> {
  const events = await fetchEvents();
  return events.find((event) => event.id === id);
}
