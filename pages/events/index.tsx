import { getAllEvents } from "../../repositories/events";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import { GetStaticPropsResult } from "next";
import { Event } from "../../models/event";

type Props = {
  allEvents: Event[];
};

const AllEventsPage = ({ allEvents }: Props) => {
  const router = useRouter();

  function findEventsHandler(year?: string, month?: string) {
    router.push(`/events/${year}/${month}`).then();
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={allEvents} />
    </div>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  return {
    props: {
      allEvents: await getAllEvents(),
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
