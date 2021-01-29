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

const DESCRIPTION_MAX = 140;

const EMOJIES = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`
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
  FILMS: `FILMS`,
  STATISTICS: `STATISTICS`
};

export {
  DESCRIPTION_MAX,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  EMOJIES,
  MenuItem,
  BAR_HEIGHT,
  MINUTES_IN_HOUR,
  RankName,
  Ranks,
  statsPeriod
};
