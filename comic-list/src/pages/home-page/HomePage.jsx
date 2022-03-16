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
  const [topManga, setTopManga] = useState(() => []);
  const [topManhwa, setTopManhwa] = useState(() => []);
  const [request, setRequest] = useState(false);

  const checkFavorite = useCheckFavorites();

  const getManga = async (isMounted) => {
    try {
      const data = await axios.get(
        "https://api.jikan.moe/v4/manga?order_by=score&limit=10&sfw=true&sort=desc&type=manga"
      );

      if (isMounted) {
        setTopManga(data.data.data);
      }
      setRequest(false);
    } catch (error) {
      setRequest(true);
    }
  };

  const getManhwa = async (isMounted) => {
    try {
      const data = await axios.get(
        "https://api.jikan.moe/v4/manga?order_by=score&limit=10&sfw=true&sort=desc&type=manhwa"
      );
      setRequest(false);
      if (isMounted) {
        setTopManhwa(data.data.data);
      }
    } catch (error) {
      setRequest(true);
    }
  };

  useEffect(() => {
    let isMounted = true;
    getManga(isMounted);
    getManhwa(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (request) {
      getManga(isMounted);
      getManhwa(isMounted);
    }
    return () => {
      isMounted = false;
    };
  }, [request]);

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

  const carouselItems = [
    {
      carouselId: 116778,
      image: "https://images4.alphacoders.com/112/thumb-1920-1126211.jpg",
      title: "Chainsaw Man",
    },
    {
      carouselId: 121496,
      image: "https://images7.alphacoders.com/105/thumb-1920-1054068.png",
      title: "Solo Leveling",
    },
    {
      carouselId: 113138,
      image: "https://wallpapercave.com/wp/wp8921149.jpg",
      title: "Jujutsu Kaisen",
    },
    {
      carouselId: 132214,
      image: "https://wallpapercave.com/wp/wp9079448.jpg",
      title: "Omniscent Reader's Viewpoint",
    },
    {
      carouselId: 96792,
      image: "https://wallpaperaccess.com/full/1099445.png",
      title: "Demon Slayer",
    },
    {
      carouselId: 122663,
      image: "https://xenodude.files.wordpress.com/2020/07/tower-of-god.png",
      title: "Tower of God",
    },
  ];

  return topManga.length > 0 && topManhwa.length > 0 ? (
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
        {carouselItems.map((item) => {
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
          {topManga?.map((comic) => (
            <ComicCard
              key={comic.mal_id}
              comic={comic}
              favorite={checkFavorite(comic.mal_id)}
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
          {topManhwa?.map((comic) => {
            return (
              <ComicCard
                key={comic.mal_id}
                comic={comic}
                favorite={checkFavorite(comic.mal_id)}
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
