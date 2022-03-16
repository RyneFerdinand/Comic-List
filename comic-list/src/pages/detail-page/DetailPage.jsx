import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useParams } from "react-router-dom";
import CharacterCard from "../../components/character-card/CharacterCard";
import ComicCard from "../../components/comic-card/ComicCard";
import {
  useCheckFavorites,
  useUpdateFavorites,
} from "../../Context/FavoriteProvider";
import "./DetailPage.css";
export default function DetailPage() {
  const checkFavorite = useCheckFavorites();
  const updateFavorite = useUpdateFavorites();
  const [skeletons, setSkeletons] = useState(() => {
    let data = [];
    for (let index = 0; index < 6; index++) {
      data.push(index);
    }
    return data;
  });
  const [comicData, setComicData] = useState(null);
  const [request, setRequest] = useState(false);
  const [favorite, setFavorite] = useState(() => false);

  const { id } = useParams();
  const getComicData = async (isMounted) => {
    try {
      let data, characterData, recommendationData;

      data = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
      setTimeout(async () => {
        try {
          characterData = await axios.get(
            `https://api.jikan.moe/v4/manga/${id}/characters`
          );
          setTimeout(async () => {
            try {
              recommendationData = await axios.get(
                `https://api.jikan.moe/v4/manga/${id}/recommendations`
              );
              const comic = {
                ...data.data.data,
                characters: characterData.data.data,
                recommendation: recommendationData.data.data,
              };
              if (isMounted) {
                setComicData(comic);
                setFavorite(checkFavorite(comic.mal_id));
                setRequest(false);
              }
            } catch (error) {
              setRequest(true);
            }
          }, 50);
        } catch (error) {
          setRequest(true);
        }
      }, 50);
    } catch (error) {
      setRequest(true);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setComicData(null);
    getComicData(isMounted);
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    console.log("masuk");
    let isMounted = true;

    if (request) {
      getComicData(isMounted);
    }
    return () => {
      isMounted = false;
    };
  }, [request]);

  const itemResponsive = {
    desktop: {
      breakpoint: { max: 1800, min: 1321 },
      items: 6,
    },
    laptop: {
      breakpoint: { max: 1320, min: 1101 },
      items: 5,
    },
    smallerLaptop: {
      breakpoint: { max: 1100, min: 901 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 900, min: 541 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 2,
    },
  };

  const clickUpdateFavorite = () => {
    updateFavorite(comicData, !favorite);
    setFavorite((prevFavorite) => !prevFavorite);
  };
  return comicData ? (
    <div id="detail-page">
      <div className="detail-section">
        <div className="detail-flex-row space-between">
          <img
            src={comicData.images.webp.large_image_url}
            alt=""
            className="detail-section__poster"
          />
          <div className="detail-flex-col">
            <div className="detail-flex-row space-between">
              <h1 className="detail-section__title">{comicData.title}</h1>
              <button className="add-button" onClick={clickUpdateFavorite}>
                {favorite ? "Remove from List" : "Add to List"}
              </button>
            </div>
            <span className="detail-section__genres">
              {comicData.genres.map((genre, idx) => (
                <span key={genre.mal_id} className="genre">
                  {genre.name}
                </span>
              ))}
            </span>
            <p className="detail-section__synopsis">{comicData.synopsis}</p>
          </div>
        </div>
      </div>

      <div className="character-section">
        <h2 className="section-title">Characters</h2>
        {comicData.characters ? (
          <Carousel
            responsive={itemResponsive}
            swipeable={true}
            draggable={false}
            autoPlay={false}
            className="comic-carousel"
          >
            {comicData.characters?.map((character) => (
              <CharacterCard
                key={character.character.mal_id}
                character={character}
              />
            ))}
          </Carousel>
        ) : (
          <></>
        )}
      </div>

      <div className="recommendation-section">
        <h2 className="section-title">Recommendation</h2>
        <Carousel
          responsive={itemResponsive}
          swipeable={true}
          draggable={false}
          autoPlay={false}
          className="comic-carousel"
        >
          {comicData.recommendation?.map((recommendation) => (
            <ComicCard
              key={recommendation.entry.mal_id}
              comic={recommendation.entry}
              favorite={checkFavorite(recommendation.entry.mal_id)}
            />
          ))}
        </Carousel>
      </div>
    </div>
  ) : (
    <div id="detail-page">
      <div className="detail-section">
        <div className="detail-flex-row space-between">
          <div className="detail-section__poster skeleton-animate" />
          <div className="detail-flex-col">
            <div className="detail-flex-row space-between">
              <div className="detail-section__title--skeleton skeleton-animate"></div>
            </div>
            <div className="detail-section__synopsis--skeleton skeleton-animate"></div>
            <div className="detail-section__synopsis--skeleton skeleton-animate"></div>
            <div className="detail-section__synopsis--skeleton skeleton-animate"></div>
            <div className="detail-section__synopsis--skeleton skeleton-animate"></div>
            <div className="detail-section__synopsis--skeleton skeleton-animate"></div>
            <div className="detail-section__synopsis--skeleton skeleton-animate"></div>
          </div>
        </div>
      </div>
      <div className="character-section">
        <h2 className="section-title">Characters</h2>
        <Carousel
          responsive={itemResponsive}
          swipeable={true}
          draggable={false}
          autoPlay={false}
          className="comic-carousel"
        >
          {skeletons.map((id) => (
            <ComicCard key={id} skeleton={true} />
          ))}
        </Carousel>
      </div>

      <div className="recommendation-section">
        <h2 className="section-title">Recommendation</h2>
        <Carousel
          responsive={itemResponsive}
          swipeable={true}
          draggable={false}
          autoPlay={false}
          className="comic-carousel"
        >
          {skeletons?.map((id) => (
            <ComicCard key={id} skeleton={true} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
