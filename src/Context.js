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
  const [newPhotos, setNewPhotos] = useState(false);

  const fetchPhotos = async (url, clientID, page) => {
    const pageUrl = `&page=${page}`;

    try {
      const response = await fetch(url + clientID + pageUrl);
      const data = await response.json();
      if (Array.isArray(data)) {
        setPhotos((oldValues) => {
          if (page === 1) {
            return data;
          } else {
            return [...oldValues, ...data];
          }
        });
        setLoading(false);
        setNewPhotos(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchPhotos = async (url, clientID, page, search) => {
    const pageUrl = `&page=${page}`;
    const searchUrl = `&query=${search}`;

    try {
      const response = await fetch(url + clientID + pageUrl + searchUrl);
      const data = await response.json();
      if (Array.isArray(data.results)) {
        setPhotos((oldValues) => {
          if (page === 1) {
            return data.results;
          } else {
            return [...oldValues, ...data.results];
          }
        });
        setLoading(false);
        setNewPhotos(false);
      }
    } catch (error) {
      console.log('error when fetching data...');
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (searchTerm) {
        searchPhotos(searchUrl, clientID, page, searchTerm);
      } else {
        fetchPhotos(mainUrl, clientID, page);
      }
    }, 300);
    setTimeout(() => {
      setLoadMoreData(false);
    }, 1000);
  }, [searchTerm, page]);

  return (
    <AppContext.Provider
      value={{
        photos,
        loading,
        setLoading,
        searchPhotos,
        searchTerm,
        setSearchTerm,
        setPage,
        page,
        loadMoreData,
        setLoadMoreData,
        newPhotos,
        setNewPhotos,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
