import {getRandomArrayItem, getRandomInteger, randomDate, shuffleArray, getTimeFromMins} from '../helpers';
import {COMMENTS, YEARS, RATING, DURATION, DESCRIPTION_MAX, descriptions, genres} from '../constants';

const filmCardsArray = [
  {
    title: `Made for earch other`,
    poster: `./images/posters/made-for-each-other.png`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(` `),
    duration: getTimeFromMins(getRandomInteger(DURATION.MIN, DURATION.MAX)),
    genre: getRandomArrayItem(genres),
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: (randomDate(new Date(1955, 0, 1), new Date())).getFullYear(),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),

  },
  {
    title: `Popyey meets sindbad`,
    poster: `./images/posters/popeye-meets-sinbad.png`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(` `),
    duration: getTimeFromMins(getRandomInteger(DURATION.MIN, DURATION.MAX)),
    genre: getRandomArrayItem(genres),
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: (randomDate(new Date(YEARS.MIN, 0, 1), new Date())).getFullYear(),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `Sagebrush trail`,
    poster: `./images/posters/sagebrush-trail.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(` `),
    duration: getTimeFromMins(getRandomInteger(DURATION.MIN, DURATION.MAX)),
    genre: getRandomArrayItem(genres),
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: (randomDate(new Date(YEARS.MIN, 0, 1), new Date())).getFullYear(),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `Santa claus conquers the martians`,
    poster: `./images/posters/santa-claus-conquers-the-martians.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(` `),
    duration: getTimeFromMins(getRandomInteger(DURATION.MIN, DURATION.MAX)),
    genre: getRandomArrayItem(genres),
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: (randomDate(new Date(YEARS.MIN, 0, 1), new Date())).getFullYear(),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `The dance of life`,
    poster: `./images/posters/the-dance-of-life.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(` `),
    duration: getTimeFromMins(getRandomInteger(DURATION.MIN, DURATION.MAX)),
    genre: getRandomArrayItem(genres),
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: (randomDate(new Date(YEARS.MIN, 0, 1), new Date())).getFullYear(),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `The great flamarion`,
    poster: `./images/posters/the-great-flamarion.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(` `),
    duration: getTimeFromMins(getRandomInteger(DURATION.MIN, DURATION.MAX)),
    genre: getRandomArrayItem(genres),
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: (randomDate(new Date(YEARS.MIN, 0, 1), new Date())).getFullYear(),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `The man with the golden arm`,
    poster: `./images/posters/the-man-with-the-golden-arm.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(` `),
    duration: getTimeFromMins(getRandomInteger(DURATION.MIN, DURATION.MAX)),
    genre: getRandomArrayItem(genres),
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: (randomDate(new Date(YEARS.MIN, 0, 1), new Date())).getFullYear(),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
];

const generateCards = (itemCount) => {
  const cards = [];
  for (let i = 0; i < itemCount; i++) {
    cards.push(getRandomArrayItem(filmCardsArray));
  }
  return cards;
};

export {
  generateCards
};
