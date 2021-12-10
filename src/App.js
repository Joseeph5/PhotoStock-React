import { useEffect } from 'react';
import { useGlobalContext } from './Context';
import PhotosList from './PhotosList';
import SearchForm from './SearchForm';
import ToggleButton from './ToggleButton';

function App() {
  const { setPage, loadMoreData } = useGlobalContext();

  useEffect(() => {
    const ScrollEvent = window.addEventListener('scroll', () => {
      if (
        !loadMoreData &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 50
      ) {
        console.log(`scroll Y ${window.innerHeight + window.scrollY}`);
        console.log(`scrollHeight ${document.body.scrollHeight - 200}`);
        console.log('fetch more data');
        setPage((oldValue) => {
          return oldValue + 1;
        });
      }
    });
    return () => {
      window.removeEventListener(ScrollEvent);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <main>
      <nav className='nav-center'>
        <h2>React Stock</h2>
        <div>
          <ToggleButton />
        </div>
      </nav>
      <SearchForm />
      <PhotosList />
    </main>
  );
}

export default App;
