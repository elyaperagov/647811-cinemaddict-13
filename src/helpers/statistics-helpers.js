import {MINUTES_IN_HOUR, RankName, Ranks} from "../constants.js";

const getHours = (mins) => {
  let hours = Math.trunc(mins / 60);
  return hours;
};

const getMinutes = (mins) => {
  let minutes = mins % 60;
  return minutes;
};

const inRange = (first, value, last) => {
  if (value) {
    let lower = Math.min(first, last);
    let upper = Math.max(first, last);
    const result = value.length >= lower && value.length <= upper;
    return result;
  } else {
    return ``;
  }
};

const getUserRank = (films) => {
  if (inRange(Ranks.NOVICE.MIN, films, Ranks.NOVICE.MAX)) {
    return RankName.NOVICE;
  }
  if (inRange(Ranks.FAN.MIN, films, Ranks.FAN.MAX)) {
    return RankName.FAN;
  }
  if (inRange(Ranks.MOVIE_BUFF.MIN, films, Ranks.MOVIE_BUFF.MAX)) {
    return RankName.MOVIE_BUFF;
  } else {
    return ``;
  }
};

const calculateMoviesDuration = (movies) => {
  let totalDuration = {
    hours: 0,
    minutes: 0
  };

  if (movies.length) {
    const totalHours = movies.map((film) => getHours(film.duration)).reduce((sum, current) => sum + current);
    const totalMinutes = movies.map((film) => getMinutes(film.duration)).reduce((sum, current) => sum + current);
    const runtime = (totalHours * MINUTES_IN_HOUR) + totalMinutes;
    const hours = (runtime / 60);
    const resultHours = Math.floor(hours);
    const resultMinutes = Math.round((hours - resultHours) * 60);

    totalDuration = {
      hours: resultHours,
      minutes: resultMinutes
    };
  }
  return totalDuration;
};

const getGenres = (films) => {
  const genres = films.filter((film) => film.isWatched)
  .map((film) => {
    return film.genre;
  }).flat(1);
  return genres;
};

const getStatistics = (movies) => {
  let genresLabels = [];
  let genresValues = [];
  let genresCounts = {};
  let max = 0;
  const allGenres = getGenres(movies);
  const topGenres = [];
  for (const genre of allGenres) {
    if (!genresCounts[genre]) {
      genresCounts[genre] = 1;
      genresLabels.push(genre);
    } else {
      genresCounts[genre] += 1;
    }
    if (genresCounts[genre] > max) {
      max = genresCounts[genre];
    }
  }
  for (const genre in genresCounts) {
    if (genresCounts[genre]) {
      genresValues.push(genresCounts[genre]);
    }
  }
  for (const key in genresCounts) {
    if (genresCounts[key] === max) {
      topGenres.push(key);
    }
  }
  return {
    topGenre: topGenres[0] ? topGenres[0] : `no movies`,
    genresLabels,
    genresValues
  };
};

export {
  getUserRank,
  getStatistics,
  calculateMoviesDuration,
  getGenres,
  getHours,
  getMinutes
};
