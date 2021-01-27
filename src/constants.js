const COMMENTS = {
  MIN: 0,
  MAX: 15
};

const YEARS = {
  MIN: 1955,
  MAX: 2020
};

const RATING = {
  MIN: 0,
  MAX: 100
};

const DURATION = {
  MIN: 20,
  MAX: 300
};


const BAR_HEIGHT = 50;
const MINUTES_IN_HOUR = 60;

const RankName = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie buff`
};

const Ranks = {
  NOVICE: {
    MIN: 1,
    MAX: 10
  },
  FAN: {
    MIN: 11,
    MAX: 20
  },
  MOVIE_BUFF: {
    MIN: 21,
    MAX: 50
  }
};

const COMMENTS_QUANTITY = 50;

const DESCRIPTION_MAX = 5;

const messages = [
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

const authors = [
  `Сережа`,
  `Вася`,
  `Петя`,
  `Артём`,
  `Денис`,
];

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

const genres = [
  `Musical`,
  `Comedy`,
  `Action`,
  `Sci-fi`,
  `Romantic`,
  `Historical`,
  `Drama`
];

const EMOJIES = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`
];

const FILM_TITLES = [
  `Made for each other`,
  `Popeye meets sinbad`,
  `Sagebrush trail`,
  `Santa claus conquers the martians`,
  `The Dance of life`,
  `The great flamarion`,
  `The man with the golden arm`
];

const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const statsPeriod = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const FilterType = {
  ALL: `All Movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};

const MenuItem = {
  // ADD_NEW_TASK: `ADD_NEW_TASK`,
  FILMS: `FILMS`,
  STATISTICS: `STATISTICS`
};


export {
  COMMENTS,
  YEARS,
  RATING,
  DURATION,
  DESCRIPTION_MAX,
  FILM_TITLES,
  COMMENTS_QUANTITY,
  descriptions,
  genres,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  EMOJIES,
  messages,
  authors,
  MenuItem,
  BAR_HEIGHT,
  MINUTES_IN_HOUR,
  RankName,
  Ranks,
  statsPeriod
};
