import {getRandomArrayItem, getRandomInteger, randomDate, shuffleArray, getTimeFromMins} from '../helpers/common.js';
import {COMMENTS, YEARS, RATING, DURATION, DESCRIPTION_MAX, FILM_TITLES, descriptions, genres} from '../constants';

const RATING_DIVIDER = 10;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateCard = () => {
  let card = {
    id: generateId(),
    title: getRandomArrayItem(FILM_TITLES),
    description: shuffleArray(descriptions).slice(0, getRandomInteger(1, DESCRIPTION_MAX)).join(` `),
    duration: getTimeFromMins(getRandomInteger(DURATION.MIN, DURATION.MAX)),
    genre: getRandomArrayItem(genres),
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: (randomDate(new Date(YEARS.MIN, 0, 1))).getFullYear(),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / RATING_DIVIDER).toFixed(1),
    isInWatchList: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
  };
  return card;
};

const generateCards = (itemCount) => {
  const cards = [];
  for (let i = 0; i < itemCount; i++) {
    cards.push(generateCard());
  }
  return cards;
};

export {
  generateCard,
  generateCards
};
