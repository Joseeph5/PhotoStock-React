import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from './Context';

export default function SearchForm() {
  const { searchPhotos, searchTerm, setSearchTerm } = useGlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className='search'>
      <form className='search-form' onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='search'
          className='form-input'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </form>
    </section>
  );
}
