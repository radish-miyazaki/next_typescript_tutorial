import React, {ChangeEvent, FormEvent, useState} from 'react';
import moment from "moment";
import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import Link from "next/link"
import Image from "next/image"
import {API_URL} from "@/config/index";
import styles from "@/styles/Form.module.css"
import {Event} from "@/types/index";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import {FaImage} from "react-icons/fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

const EditEventPage = ({evt}) => {
  const [values, setValues] = useState<Event>({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })
  const [image, setImage] = useState<string>(evt.image ? evt.image.formats.thumbnail.url : null!)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validation
    const hasEmptyFields = Object.values(values).some((el) => el === '')
    if (hasEmptyFields) {
      toast.error('Please fill in all Fields')
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    if (!res.ok) {
      toast.error('Something Went Wrong')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()
    setImage(data.image.formats.thumbnail.url)
    setShowModal(false)
  }

  return (
    <Layout title="Add New Event">
      <Link href={'/events'}>
        <a>Go Back</a>
      </Link>
      <h1>Edit Event Page</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Update Event" className="btn"/>
      </form>

      <h2>Event Image</h2>
      {image ? (
        <Image src={image} height={100} width={170} />) : (
        <div>
          <p>No Images</p>
        </div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal
        show={showModal}
        title={'IMAGE UPLOAD'}
        onClose={() => setShowModal(false)}
      >
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;

export const getServerSideProps = async ({params: {id}, req}) => {
  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()

  console.log(req.headers.cookie)

  return {
    props: {
      evt
    }
  }
}
