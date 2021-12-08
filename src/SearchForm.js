import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchForm() {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <section className='search'>
      <form className='search-form' onSubmit={submitHandler}>
        <input type='text' placeholder='search' className='form-input' />
      </form>
    </section>
  );
}
