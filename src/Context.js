import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const AppContext = React.createContext();
const mainUrl = 'https://api.unsplash.com/photos/';
const searchUrl = 'https://api.unsplash.com/search/photos/';
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

export default function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loadMoreData, setLoadMoreData] = useState(false);

  const fetchPhotos = async (url, clientID, page) => {
    const pageUrl = `&page=${page}`;

    try {
      const response = await fetch(url + clientID + pageUrl);
      const data = await response.json();
      if (Array.isArray(data)) {
        setPhotos((oldPhotos) => {
          console.log([...oldPhotos, ...data]);
          return [...oldPhotos, ...data];
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchPhotos = async (url, clientID, page, search) => {
    setLoading(true);
    const pageUrl = `&page=${page}`;
    const searchUrl = `&query=${search}`;
    try {
      const response = await fetch(url + clientID + pageUrl + searchUrl);
      const data = await response.json();
      if (Array.isArray(data)) {
        setPhotos(data);
        setLoading(false);
      }
    } catch (error) {
      console.log('error when fetching data...');
      console.log(error);
    }
  };

  useEffect(() => {
    setLoadMoreData(true);
    if (searchTerm) {
      searchPhotos(mainUrl, clientID, page, searchTerm);
    } else {
      fetchPhotos(mainUrl, clientID, page);
    }
    setTimeout(() => {
      setLoadMoreData(false);
    }, 1000);
  }, [searchTerm, page]);

  return (
    <AppContext.Provider
      value={{
        photos,
        loading,
        searchPhotos,
        searchTerm,
        setSearchTerm,
        setPage,
        page,
        loadMoreData,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
