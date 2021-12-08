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

  const fetchPhotos = async (url, clientID) => {
    try {
      const response = await fetch(url + clientID);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPhotos(mainUrl, clientID);
    setTimeout(() => {}, 1000);
  }, []);

  return (
    <AppContext.Provider value={{ photos, loading }}>{children}</AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
