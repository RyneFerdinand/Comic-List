import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRef, useCallback, useState } from "react";
import ComicCard from "../../components/comic-card/ComicCard";
import { useCheckFavorites } from "../../Context/FavoriteProvider";
import UseComicSearch from "../../hooks/UseComicSearch";
import "./ComicPage.css";
export default function ComicPage() {
  const [query, setQuery] = useState(() => "");
  const [page, setPage] = useState(1);
  const [skeletons, setSkeletons] = useState(() => {
    let data = [];
    for (let index = 0; index < 12; index++) {
      data.push(index);
    }
    return data;
  });

  const { comicQuery, loading, nextPage, noData } = UseComicSearch(query, page);

  const checkFavorite = useCheckFavorites();

  const observer = useRef();

  const lastComicElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPage) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, nextPage]
  );

  return (
    <div id="comic-page">
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__bar"
          placeholder="Search for Comics..."
          onChange={(q) => {
            setPage(1);
            setQuery(q.target.value);
          }}
        />
        <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          className="search-bar__icon"
        />
      </div>
      <div className="result-section">
        {comicQuery?.map((comic, idx) => {
          if (idx + 1 === comicQuery.length) {
            return (
              <span ref={lastComicElementRef} key={comic.id}>
                <ComicCard
                  key={comic.id}
                  comic={comic}
                  favorite={checkFavorite(comic.id)}
                />
              </span>
            );
          } else {
            return (
              <ComicCard
                key={comic.id}
                comic={comic}
                favorite={checkFavorite(comic.id)}
              />
            );
          }
        })}
        {loading &&
          skeletons?.map((id) => <ComicCard key={id} skeleton={true} />)}
        {noData && <h4 className="no-data-header">\(￣︶￣"\))  Sorry, I can't seem to find the comic...</h4>}
      </div>
    </div>
  );
}
