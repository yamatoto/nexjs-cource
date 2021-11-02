import { getFeaturedEvents } from "../repositories/events";
import { Event } from "../models/event";
import EventList from "../components/events/event-list";
import { GetStaticPropsResult } from "next";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";

type Props = {
  featuredEvents: Event[];
};

const HomePage = ({ featuredEvents }: Props) => {
  return (
    <div>
      <Head>
        <title>NextJS Event</title>
        <meta
          name="description"
          content="Find a lot fo great events that allow you to evolve...."
        />
      </Head>
      <NewsletterRegistration />
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
