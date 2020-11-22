const getRandomArrayItem = (items) => {
  return items[Math.floor(Math.random()*items.length)];
}

const generateRandomNumber = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const COMMENTS = {
  MIN: 0,
  MAX: 5
};

const YEARS = {
  MIN: 1955,
  MAX: 2020
};

const RATING = {
  MIN: 0,
  MAX: 100
}

const DURATION = {
  MIN: 20,
  MAX: 300
}

const DESCRIPTION_MAX = 5;

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
 ];

 const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const filmCardsArray = [
  {
    title: `Made for earch other`,
    poster: `./images/posters/made-for-each-other.png`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(' '),
    genre: `Musical`,
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: getRandomInteger(YEARS.MIN, YEARS.MAX),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `Popyey meets sindbad`,
    poster: `./images/posters/popeye-meets-sinbad.png`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(' '),
    genre: `Comedy`,
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: getRandomInteger(YEARS.MIN, YEARS.MAX),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `Sagebrush trail`,
    poster: `./images/posters/sagebrush-trail.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(' '),
    genre: `Action`,
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: getRandomInteger(YEARS.MIN, YEARS.MAX),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `Santa claus conquers the martians`,
    poster: `./images/posters/santa-claus-conquers-the-martians.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(' '),
    genre: `Sci-fi`,
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: getRandomInteger(YEARS.MIN, YEARS.MAX),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `The dance of life`,
    poster: `./images/posters/the-dance-of-life.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(' '),
    genre: `Romantic`,
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: getRandomInteger(YEARS.MIN, YEARS.MAX),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `The great flamarion`,
    poster: `./images/posters/the-great-flamarion.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(' '),
    genre: `Historical`,
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: getRandomInteger(YEARS.MIN, YEARS.MAX),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
  {
    title: `The man with the golden arm`,
    poster: `./images/posters/the-man-with-the-golden-arm.jpg`,
    description: shuffleArray(descriptions).slice(0, getRandomInteger(0, DESCRIPTION_MAX)).join(' '),
    genre: `Drama`,
    comments: getRandomInteger(COMMENTS.MIN, COMMENTS.MAX),
    year: getRandomInteger(YEARS.MIN, YEARS.MAX),
    rating: (getRandomInteger(RATING.MIN, RATING.MAX) / 10).toFixed(1),
  },
]

export const generateCards = (itemCount) => {
  const cards = [];

  for (let i = 0; i < itemCount; i++) {
    cards.push(getRandomArrayItem(filmCardsArray));
  }
  return cards;
};
