import { getAllEvents } from "../../mock/dummy-data";

const AllEventsPage = () => {
  const events = getAllEvents();
  return (
    <div>
      <h1>All Events</h1>
      {events.map(({ id, title, image }) => (
        <div key={id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} />
        </div>
      ))}
    </div>
  );
};

export default AllEventsPage;
