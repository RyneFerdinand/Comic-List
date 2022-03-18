import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UseComicSearch(query, page) {
  const [loading, setLoading] = useState(() => false);
  const [comicQuery, setComicQuery] = useState(() => []);
  const [nextPage, setNextPage] = useState(() => true);
  const [timeOutFunction, setTimeOutFunction] = useState(() => null);
  const [noData, setNoData] = useState(() => false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setComicQuery([]);
      setNoData(false);
      if(query.length === 0){
        setLoading(false);  
      }
    }
    return () => {
      isMounted = false;
    };
  }, [query]);

  useEffect(() => {
    let isMounted = true;

    if (timeOutFunction) {
      clearTimeout(timeOutFunction);
    }
    if (query.length > 0) {
      setLoading(true);
      setTimeOutFunction(
        setTimeout(async () => {
          try {
            const data = await axios.get(
              `http://localhost:8000/comic/search?q=${query}&page=${page}`
            );
            if (isMounted) {
              setNextPage(data.data.pagination.has_next_page);

              if (data.data.data.length === 0) {
                setNoData(true);
              } else {
                setComicQuery((prevComics) => [
                  ...prevComics,
                  ...data.data.data,
                ]);
              }
              setLoading(false);
            }
          } catch (error) {
          }
        }, 500)
      );
    }
    return () => {
      isMounted = false;
    };
  }, [query, page]);

  return { loading, comicQuery, nextPage, noData };
}
