import React from 'react';
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import {API_URL, PER_PAGE} from "@/config/index";
import Pagination from "@/components/Pagination";

const Index = ({events, page, total}) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(e => (
        <EventItem key={e.id} evt={e}>
          {e.name}
        </EventItem>
      ))}
      <Pagination total={total} page={page} />
    </Layout>
  );
}

export const getServerSideProps = async ({query: {page = 1}}) => {
  // Calculate start page
  const start = Number(page) === 1 ? 0 : (Number(page) -1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetch events
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventRes.json()

  return {
    props: {events, page: Number(page), total},
  }
}


export default Index;
