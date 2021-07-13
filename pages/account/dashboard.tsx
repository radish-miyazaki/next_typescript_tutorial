import React from 'react';
import Layout from "@/components/Layout";
import {parseCookies} from "@/helpers/index";
import {API_URL} from "@/config/index";
import styles from '@/styles/Dashboard.module.css'
import DashboardEvent from "@/components/DashboardEvent";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const Dashboard = ({events, token}) => {

  const router = useRouter()

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error('Unauthorized')
          return
        }
        toast.error(data.message)
      } else {
        router.reload()
      }
    }
  }


  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {
          events.map(e => (
            <DashboardEvent key={e.id} evt={e} handleDelete={deleteEvent} />
          ))
        }
      </div>
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps = async ({req}) => {
  const {token} = parseCookies(req)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const events = await res.json()

  return {
    props: {
      events,
      token
    }
  }
}
