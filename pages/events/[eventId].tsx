import { getEventById, getFeaturedEvents } from "../../repositories/events";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { Event } from "../../models/event";
import Head from "next/head";
import Comments from "../../components/input/comments";
import { Fragment } from "react";

type Props = {
  selectedEvent: Event;
};

const EventDetailPage = ({ selectedEvent }: Props) => {
  if (!selectedEvent) {
    return (
      // fallback: "blocking"の場合はこない。　fallback: trueの時だけ
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  const { id, title, date, location, image, description } = selectedEvent;
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
      <Comments eventId={id} />
    </Fragment>
  );
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const pathsWithParams = (await getFeaturedEvents())
    .map(({ id }) => id)
    .map((eventId) => ({ params: { eventId } }));
  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
}

export async function getStaticProps(
  ctx: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const { params } = ctx;
  const selectedEvent = await getEventById(params!.eventId as string);

  if (!selectedEvent) {
    return {
      notFound: true,
    };
  }

  return {
    props: { selectedEvent },
    revalidate: 30,
  };
}

export default EventDetailPage;
