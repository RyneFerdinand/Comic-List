import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ComicCard from "../../components/comic-card/ComicCard";
import {
  useCheckFavorites,
  useFavorites,
} from "../../Context/FavoriteProvider";

export default function ListPage() {
  const [query, setQuery] = useState("");
  let comicList = useFavorites();
  let checkFavorite = useCheckFavorites();

  return (
    <div id="comic-page">
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__bar"
          placeholder="Search from your list..."
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
        {comicList?.map((comic) => {
          if (query.trim().length === 0) {
            return (
              <ComicCard
                key={comic.id}
                comic={comic}
                favorite={checkFavorite(comic.id)}
              />
            );
          } else if (comic.title.toLowerCase().includes(query.trim())) {
            return (
              <ComicCard
                key={comic.id}
                comic={comic}
                favorite={checkFavorite(comic.id)}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
