import React from 'react';
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import {API_URL} from "@/config/index";
import qs from 'qs';
import {useRouter} from "next/router";
import Link from "next/link"

const Search = ({events}) => {

  const router = useRouter()

  return (
    <Layout title="Search Results">
      <Link href={'/events'}>
        <a>Go Back</a>
      </Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(e => (
        <EventItem key={e.id} evt={e}>
          {e.name}
        </EventItem>
      ))}
    </Layout>
  );
};

export const getServerSideProps = async ({query: {term}}) => {
  const query = qs.stringify({
    _where: {
      _or: [
        {name_contains: term},
        {performers_contains: term},
        {description_contains: term},
        {venue_contains: term},
      ]
    }
  })
  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json()
  return {
    props: {events}
  }
}


export default Search;