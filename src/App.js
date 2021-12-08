import { useGlobalContext } from './Context';
import PhotosList from './PhotosList';
import SearchForm from './SearchForm';

function App() {
  const data = useGlobalContext();
  console.log(data);
  return (
    <main>
      <div>
        <SearchForm />
        <PhotosList />
      </div>
    </main>
  );
}

export default App;
