require("dotenv").config();

const axios = require("axios");
const express = require("express");

const router = express.Router();

const carouselItems = require("./carousel.json");

const MAL_API_URL = process.env.MAL_API_URL;
const JIKAN_API_URL = process.env.JIKAN_API_URL;

const MAL_API_KEY = process.env.MAL_API_KEY;

const MAL_CARD = 1;
const JIKAN_CARD = 2;
const DETAIL = 3;

const header = {
  headers: {
    "X-MAL-CLIENT-ID": MAL_API_KEY,
  },
};

const processData = (data, type) => {
  let processedData = {};

  if (type === MAL_CARD) {
    processedData.data = [];
    data.data.data.forEach((manga) => {
      const newData = {
        id: manga.node.id,
        title: manga.node.title,
        cover: manga.node.main_picture.medium,
      };
      processedData.data.push(newData);
    });
  } else if (type === JIKAN_CARD) {
    processedData.data = [];
    data.data.data.forEach((manga) => {
      const newData = {
        id: manga.mal_id,
        title: manga.title,
        cover: manga.images.webp.large_image_url,
      };
      processedData.data.push(newData);
    });
    processedData.pagination = data.data.pagination;
  } else if (type === DETAIL) {
    processedData = {
      id: data.detail.id,
      title: data.detail.title,
      poster: data.detail.main_picture.large,
      synopsis: data.detail.synopsis,
      genres: data.detail.genres,
      characters: [],
      recommendations: [],
    };

    data.character.forEach((character) => {
      const newCharacter = {
        id: character.character.mal_id,
        image: character.character.images.webp.image_url,
        name: character.character.name,
        role: character.role,
      };
      processedData.characters.push(newCharacter);
    });

    data.detail.recommendations.forEach((recommendation) => {
      const newRecommenedation = {
        id: recommendation.node.id,
        title: recommendation.node.title,
        poster: recommendation.node.main_picture.medium,
      };
      processedData.recommendations.push(newRecommenedation);
    });
  }
  return processedData;
};

router.get("/home", async (req, res) => {
  const manhwaURL = `${MAL_API_URL}/manga/ranking?ranking_type=manhwa&limit=10&fields=id,title,main_picture,paging`;
  const mangaURL = `${MAL_API_URL}/manga/ranking?ranking_type=manhwa&limit=10&fields=id,title,main_picture,paging`;

  try {
    const mangaData = await axios.get(mangaURL, header);
    const manhwaData = await axios.get(manhwaURL, header);

    const homeData = {
      carousel: carouselItems,
      manga: processData(mangaData, MAL_CARD),
      manhwa: processData(manhwaData, MAL_CARD),
    };

    res.json(homeData);
  } catch (error) {
    res.json(error);
  }
});

router.get("/search", async (req, res) => {
  if (req.query.q) {
    try {
      const searchURL = `${JIKAN_API_URL}/manga?q=${req.query.q}&order_by=score&sort=desc&sfw=True&limit=24&page=1`;
      const searchData = await axios.get(searchURL);

      res.json(processData(searchData, JIKAN_CARD));
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ message: "No Query Inserted !" });
  }
});

router.get("/:id", async (req, res) => {
  if (req.params.id) {
    const detailURL = `${MAL_API_URL}/manga/${req.params.id}?fields=id,title,main_picture,synopsis,genres,recommendations`;
    const characterURL = `${JIKAN_API_URL}/manga/${req.params.id}/characters`;

    const detailData = await axios.get(detailURL, header);
    const characterData = await axios.get(characterURL);
    const data = {
      detail: detailData.data,
      character: characterData.data.data,
    };

    res.json(processData(data, DETAIL));
  } else {
    res.json({ message: "id not given !" });
  }
});

module.exports = router;
