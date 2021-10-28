import { getFeaturedEvents } from "../repositories/events";
import { Event } from "../models/event";
import EventList from "../components/events/event-list";
import { GetStaticPropsResult } from "next";

type Props = {
  featuredEvents: Event[];
};

const HomePage = ({ featuredEvents }: Props) => {
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  return {
    props: {
      featuredEvents: await getFeaturedEvents(),
    },
    revalidate: 1800, // 30m
  };
}

export default HomePage;
