import React from 'react';
import { useGlobalContext } from './Context';
import Photo from './Photo';
export default function PhotosList() {
  const { photos, loading, loadMoreData } = useGlobalContext();

  if (loading) {
    return (
      <section className='photos'>
        <div className='loading'></div>
      </section>
    );
  }
  return (
    <section className='photos'>
      <div className='photos-center'>
        {photos.map((photo) => {
          return <Photo key={photo.id} {...photo} />;
        })}
      </div>
      {loadMoreData && <div className='loading'></div>}
    </section>
  );
}
