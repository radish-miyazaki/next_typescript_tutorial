import React from 'react';
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import {API_URL} from "@/config/index";


const Index = ({events}) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(e => (
        <EventItem key={e.id} evt={e}>
          {e.name}
        </EventItem>
      ))}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()
  return {
    props: {events},
    revalidate: 1,
  }
}


export default Index;
