import EventList from "../../components/events/event-list";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { Event } from "../../models/event";
import { useRouter } from "next/router";
import useSWR from "swr";
import { transformObjectToIdList } from "../../helpers/list";
import Head from "next/head";

function isInvalidSlug(year: number, month: number): boolean {
  return (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  );
}

function filterEvents(
  allEvents: Event[],
  dateFilter: {
    year: number;
    month: number;
  }
): Event[] {
  const { year, month } = dateFilter;
  return allEvents.filter(({ date }) => {
    const eventDate = new Date(date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}

const FilteredEventsPage = () => {
  const {
    query: { slug: filterData },
  } = useRouter();
  const { data: resData, error } = useSWR(
    "https://nextjs-course-bdb90-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  const [loadedEvents, setLoadedEvents] = useState<Event[]>();

  useEffect(() => {
    if (resData) {
      const events = transformObjectToIdList<Event>(resData);
      setLoadedEvents(events);
    }
  }, [resData]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const [year, month] = [+filterData![0], +filterData![1]];

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${year}/${month}.`} />
    </Head>
  );

  if (error || isInvalidSlug(year, month)) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button pathname="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = filterEvents(loadedEvents, { year, month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button pathname="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
