import { useRouter } from "next/router";
import { getDateFilteredEvents } from "../../mock/dummy-data";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function isInvalid(year: number, month: number): boolean {
  return (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  );
}

const FilteredEventsPage = () => {
  const {
    query: { slug: filterData },
  } = useRouter();

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = [+filterData[0], +filterData[1]];

  if (isInvalid(year, month)) {
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

  const events = getDateFilteredEvents({ year, month });

  if (!events || events.length === 0) {
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
      <EventList events={events} />
    </Fragment>
  );
};

export default FilteredEventsPage;
