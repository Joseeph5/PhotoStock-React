import React, { useRef } from 'react';
import { useGlobalContext } from './Context';

export default function SearchForm() {
  const { setPage, setLoading, setSearchTerm } = useGlobalContext();
  const termType = useRef('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (!termType.current.value) {
      return;
    }
    setLoading(true);
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
