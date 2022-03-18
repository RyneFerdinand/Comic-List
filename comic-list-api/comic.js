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
        poster: manga.node.main_picture.medium,
      };
      processedData.data.push(newData);
    });
  } else if (type === JIKAN_CARD) {
    processedData.data = [];
    data.data.data.forEach((manga) => {
      const newData = {
        id: manga.mal_id,
        title: manga.title,
        poster: manga.images.webp.large_image_url,
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
  const mangaURL = `${MAL_API_URL}/manga/ranking?ranking_type=manga&limit=10&fields=id,title,main_picture,paging&nsfw=true`;
  const manhwaURL = `${MAL_API_URL}/manga/ranking?ranking_type=manhwa&limit=10&fields=id,title,main_picture,paging&nsfw=true`;
  let dataReceived = false;
  while (!dataReceived) {
    try {
      const mangaData = await axios.get(mangaURL, header);
      const manhwaData = await axios.get(manhwaURL, header);

      const homeData = {
        carousel: carouselItems,
        manga: processData(mangaData, MAL_CARD),
        manhwa: processData(manhwaData, MAL_CARD),
      };

      res.setHeader("Access-Control-Allow-Origin", "*");
      dataReceived = true;
      res.json(homeData);
    } catch (error) {}
  }
});

router.get("/search", async (req, res) => {
  if (req.query.q && req.query.page) {
    let dataReceived = false;
    while (!dataReceived) {
      try {
        const searchURL = `${JIKAN_API_URL}/manga?q=${req.query.q}&order_by=score&sort=desc&sfw=True&limit=24&page=${req.query.page}&genres_exclude=12`;
        const searchData = await axios.get(searchURL);
        res.setHeader("Access-Control-Allow-Origin", "*");
        dataReceived = true;
        res.json(processData(searchData, JIKAN_CARD));
      } catch (error) {}
    }
  } else {
    res.status(400).json({ message: "No Query Inserted !" });
  }
});

router.get("/:id", async (req, res) => {
  if (req.params.id) {
    let dataReceived = false;
    while (!dataReceived) {
      try {
        const detailURL = `${MAL_API_URL}/manga/${req.params.id}?fields=id,title,main_picture,synopsis,genres,recommendations`;
        const characterURL = `${JIKAN_API_URL}/manga/${req.params.id}/characters`;

        const detailData = await axios.get(detailURL, header);
        const characterData = await axios.get(characterURL);
        const data = {
          detail: detailData.data,
          character: characterData.data.data,
        };
        res.setHeader("Access-Control-Allow-Origin", "*");
        dataReceived = true;
        res.json(processData(data, DETAIL));
      } catch (error) {}
    }
  } else {
    res.status(400).json({ message: "id not given !" });
  }
});

module.exports = router;
