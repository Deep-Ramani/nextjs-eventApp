import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Head from "next/head";
import { getFilteredEvents } from "../../dummy-data";
import ResultsTitle from "../../components/results-title/results-title";
import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventPage = () => {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }
  // console.log(router.isReady);
  const filterData = router.query.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const pageHeadData = (
    <Head>
      <title>Filterd Event</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}. `}
      />
    </Head>
  );

  if (!filterData) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter, please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <div>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventPage;
