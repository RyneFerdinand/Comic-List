import React, { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();
const FavoriteCheckContext = createContext();
const FavoriteUpdateContext = createContext();

export function useFavorites() {
  return useContext(FavoriteContext)
}

export function useCheckFavorites() {
  return useContext(FavoriteCheckContext);
}

export function useUpdateFavorites() {
  return useContext(FavoriteUpdateContext);
}

export default function FavoriteProvider({ children }) {
  const [favoriteComic, setFavoriteComic] = useState(() => []);

  useEffect(() => {
    let data = localStorage.getItem("favorites");
    if(data !== null && data.length > 0){
      setFavoriteComic(JSON.parse(data))
    }
  }, [])
  

  const updateFavorite = (newComic, add) => {
    if (add) {
      let data = localStorage.getItem("favorites");
      if(data === null){
        data = [];
      } else {
        data = JSON.parse(data);
      }
      data.push(newComic);
      localStorage.setItem("favorites", JSON.stringify(data))
      setFavoriteComic([...favoriteComic, newComic]);
    } else {
      let data = localStorage.getItem("favorites");
      if(data !== null){
        data = JSON.parse(data);
        data = data.filter(comic => comic.mal_id !== newComic.mal_id)
        localStorage.setItem("favorites", JSON.stringify(data))

      }
      
      setFavoriteComic((prevFavoriteComic) => {
        return prevFavoriteComic.filter(
          (comic) => comic.mal_id !== newComic.mal_id
        );
      });
    }
  };

  const checkFavorites = (id) => {
    let inList = false;
    favoriteComic.forEach((comic) => {
      if (comic.mal_id === id) {
        inList = true;
      }
    });
    return inList;
  };

  return (
    <FavoriteContext.Provider value={favoriteComic}>
      <FavoriteCheckContext.Provider value={checkFavorites}>
        <FavoriteUpdateContext.Provider value={updateFavorite}>
          {children}
        </FavoriteUpdateContext.Provider>
      </FavoriteCheckContext.Provider>
    </FavoriteContext.Provider>
  );
}
