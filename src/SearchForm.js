import React, { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from './Context';

export default function SearchForm() {
  const { setPage, setLoading, setSearchTerm } = useGlobalContext();
  const termType = useRef('');

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(termType.current.value);
    setPage(1);
    setSearchTerm(termType.current.value);
  };

  return (
    <section className='search'>
      <form className='search-form' onSubmit={submitHandler}>
        <input type='text' placeholder='search' className='form-input' ref={termType} />
      </form>
    </section>
  );
}
