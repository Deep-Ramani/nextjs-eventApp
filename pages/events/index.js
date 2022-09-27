import { useRouter } from "next/router";
import React from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../dummy-data";
const AllEventPage = () => {
  const events = getAllEvents();
  const router= useRouter();

  function findEventHandler(year,month){
      const fullPath = `/events/${year}/${month}`
      router.push(fullPath)
  }
  return (
    <div>
      <EventSearch onSearch={findEventHandler}/>
      <EventList items={events} />
    </div>
  );
};

export default AllEventPage;
