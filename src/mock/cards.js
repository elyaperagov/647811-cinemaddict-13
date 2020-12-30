import {getRandomArrayItem, getRandomInteger, randomDate, shuffleArray, getTimeFromMins} from '../helpers/common.js';
import {YEARS, RATING, DURATION, DESCRIPTION_MAX, FILM_TITLES, descriptions, genres, EMOJIES, messages, authors} from '../constants';

const RATING_DIVIDER = 10;
const COMMENTS_QUANTITY = 30;

const getMeRandomElements = function (sourceArray, neededElements) {
  let result = [];
  for (let i = 0; i < neededElements; i++) {
    result.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);
  }
  return result;
};

const date = randomDate(new Date(YEARS.MIN, 0, 1));

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateComment = () => {
  let comment = {
    id: generateId(),
    message: shuffleArray(messages).slice(0, getRandomInteger(1, DESCRIPTION_MAX)).join(` `),
    author: getRandomArrayItem(authors),
    emoji: getRandomEmoji(),
    date
  };
  return comment;
};

const getRandomEmoji = () => {
  const randomIndex = getRandomInteger(0, EMOJIES.length - 1);

  return EMOJIES[randomIndex];
};

const generateCard = () => {
  let card = {
    id: generateId(),
    title: getRandomArrayItem(FILM_TITLES),
    description: shuffleArray(descriptions).slice(0, getRandomInteger(1, DESCRIPTION_MAX)).join(` `),
    duration: getTimeFromMins(getRandomInteger(DURATION.MIN, DURATION.MAX)),
    genre: getRandomArrayItem(genres),
    comments: getMeRandomElements((new Array(COMMENTS_QUANTITY).fill().map(generateComment)), getRandomInteger(0, COMMENTS_QUANTITY)),
    year: date.getFullYear(),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / RATING_DIVIDER).toFixed(1),
    isInWatchList: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
    emojies: getRandomEmoji(),
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
