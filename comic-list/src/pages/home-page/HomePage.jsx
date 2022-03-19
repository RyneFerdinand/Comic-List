import { useEffect, useState } from "react";
import WebsiteLogo from "../../asset/Icon/Logo.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItem from "../../components/carousel-item/CarouselItem";
import ComicCard from "../../components/comic-card/ComicCard";
import axios from "axios";
import "./HomePage.css";
import { useCheckFavorites } from "../../Context/FavoriteProvider";
import ReactLoading from "react-loading";

export default function HomePage() {
  const [homeData, setHomeData] = useState(() => null);

  const checkFavorite = useCheckFavorites();

  const getHomeData = async (isMounted) => {
    try {
      const data = await axios.get(
        "https://comic-list-api.herokuapp.com/comic/home"
      );

      if (isMounted) {
        setHomeData(data.data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    let isMounted = true;
    getHomeData(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 769 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

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

  return homeData ? (
    <div id="home-page">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={false}
        showDots={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        transitionDuration={500}
      >
        {homeData.carousel?.map((item) => {
          return (
            <CarouselItem
              key={item.carouselId}
              data={item}
              id={item.carouselId}
            />
          );
        })}
      </Carousel>
      <div className="manga-section">
        <h2 className="section-title">Top Manga</h2>
        <Carousel
          responsive={itemResponsive}
          swipeable={true}
          draggable={false}
          autoPlay={false}
          className="comic-carousel"
        >
          {homeData.manga.data?.map((comic) => (
            <ComicCard
              key={comic.id}
              comic={comic}
              favorite={checkFavorite(comic.id)}
            />
          ))}
        </Carousel>
      </div>
      <div className="manhwa-section">
        <h2 className="section-title">Top Manhwa</h2>
        <Carousel
          responsive={itemResponsive}
          swipeable={true}
          draggable={false}
          autoPlay={false}
          className="comic-carousel"
        >
          {homeData.manhwa.data?.map((comic) => {
            return (
              <ComicCard
                key={comic.id}
                comic={comic}
                favorite={checkFavorite(comic.id)}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  ) : (
    <div className="loading-background flex-col">
      <div className="flex-row">
        <img src={WebsiteLogo} alt="" />
        <h1>MyList</h1>
      </div>
      <ReactLoading
        type={"bars"}
        color={"#FFFFFF"}
        width={"5rem"}
        height={"2rem"}
      />
    </div>
  );
}
