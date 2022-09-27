import Head from "next/head";
import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a greate events" />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}
