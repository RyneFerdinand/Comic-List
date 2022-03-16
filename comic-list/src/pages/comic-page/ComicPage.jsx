import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "../../components/comic-card/ComicCard";
import { useCheckFavorites } from "../../Context/FavoriteProvider";
import "./ComicPage.css";
export default function ComicPage() {
  const [comicQuery, setComicQuery] = useState(() => []);
  const [timeOutFunction, setTimeOutFunction] = useState(() => null);
  const [query, setQuery] = useState(() => "");
  const [skeletons, setSkeletons] = useState(() => {
    let data = [];
    for (let index = 0; index < 12; index++) {
      data.push(index);
    }
    return data;
  });

  const checkFavorite = useCheckFavorites();

  const queryComic = (isMounted) => {
    if (timeOutFunction) {
      clearTimeout(timeOutFunction);
    }
    if (query.length > 0) {
      setTimeOutFunction(
        setTimeout(async () => {
          try {
            const data = await axios.get(
              `https://api.jikan.moe/v4/manga?q=${query}&order_by=score&sort=desc&sfw=True&limit=24`
            );
            if (isMounted) {
              setComicQuery(data.data.data);
            }
          } catch (error) {}
        }, 500)
      );
    } else {
      setComicQuery([]);
    }
  };

  useEffect(() => {
    let isMounted = true;
    queryComic(isMounted);
    return () => {
      isMounted = false;
    };
  }, [query]);
  return (
    <div id="comic-page">
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__bar"
          placeholder="Search for Comics..."
          onChange={(q) => {
            setQuery(q.target.value);
          }}
        />
        <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          className="search-bar__icon"
        />
      </div>
      <div className="result-section">
        {query.length > 0 ?
        comicQuery.length > 0
          ? comicQuery.map((comic) => (
              <ComicCard
                key={comic.mal_id}
                comic={comic}
                favorite={checkFavorite(comic.mal_id)}
              />
            ))
          : skeletons.map((id) => <ComicCard key={id} skeleton={true} />): <></>}
      </div>
    </div>
  );
}
