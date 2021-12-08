import React from 'react';
import { useGlobalContext } from './Context';
import Photo from './Photo';
export default function PhotosList() {
  const { photos, loading } = useGlobalContext();

  if (loading) {
    return (
      <section className='photos'>
        <div className='photos-center'>
          <h3>Loading...</h3>
        </div>
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
    </section>
  );
}
