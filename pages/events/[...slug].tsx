import { getDateFilteredEvents } from "../../repositories/events";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Event } from "../../models/event";

type Props = {
  data?: {
    filteredEvents: Event[];
    date: {
      year: number;
      month: number;
    };
  };
  hasError?: boolean;
};

const FilteredEventsPage = ({ data, hasError }: Props) => {
  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button pathname="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const {
    filteredEvents,
    date: { year, month },
  } = data!;
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
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
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

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

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const { params } = ctx;

  const filterData = params!.slug!;
  const [year, month] = [+filterData[0], +filterData[1]];

  if (isInvalidSlug(year, month)) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getDateFilteredEvents({ year, month });

  return {
    props: {
      data: {
        filteredEvents,
        date: { year, month },
      },
    },
  };
}

export default FilteredEventsPage;
