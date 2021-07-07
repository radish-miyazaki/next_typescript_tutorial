import React, {FormEvent, useState} from 'react';
import {useRouter} from "next/router";
import styles from '@/styles/Search.module.css'

const Search = () => {
  const [term, setTerm] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/events/search/?term=${term}`)
    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          placeholder="Search Events..."
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
