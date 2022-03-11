import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItem from "../../components/carousel-item/CarouselItem";
import ComicCard from "../../components/comic-card/ComicCard";
import axios from "axios";
import "./HomePage.css";

export default function HomePage() {
  const [topManga, setTopManga] = useState(() => []);
  const [topManhwa, setTopManhwa] = useState(() => []);

  const getManga = async () => {
    try {
      const data = await axios.get(
        "https://api.jikan.moe/v4/manga?order_by=score&limit=10&sfw=true&sort=desc"
      );
      setTopManga(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getManhwa = async () => {
    try {
      const data = await axios.get(
        "https://api.jikan.moe/v4/manga?order_by=score&limit=10&sfw=true&sort=desc&type=manhwa"
      );
      setTopManhwa(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getManga();
    getManhwa();
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
      breakpoint: { max: 1800, min: 1201},
      items: 6,
    },
    laptop: {
      breakpoint: { max: 1200, min: 1001 },
      items: 5,
    },
    smallerLaptop: {
      breakpoint: { max: 1000, min: 769 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
  };

  const carouselItems = [
    {
      carouselId: 1,
      image: "https://images4.alphacoders.com/112/thumb-1920-1126211.jpg",
      title: "Chainsaw Man",
    },
    {
      carouselId: 2,
      image: "https://images7.alphacoders.com/105/thumb-1920-1054068.png",
      title: "Solo Leveling",
    },
    {
      carouselId: 3,
      image: "https://wallpapercave.com/wp/wp8921149.jpg",
      title: "Jujutsu Kaisen",
    },
    {
      carouselId: 4,
      image: "https://wallpapercave.com/wp/wp9079448.jpg",
      title: "Omniscent Reader's Viewpoint",
    },
    {
      carouselId: 5,
      image: "https://wallpaperaccess.com/full/1099445.png",
      title: "Demon Slayer",
    },
    {
      carouselId: 6,
      image: "https://xenodude.files.wordpress.com/2020/07/tower-of-god.png",
      title: "Tower of God",
    },
  ];

  return (
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
          return <CarouselItem key={item.carouselId} data={item} />;
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
            <ComicCard key={comic.mal_id} comic={comic} />
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
          {topManhwa?.map((comic) => (
            <ComicCard key={comic.mal_id} comic={comic} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
