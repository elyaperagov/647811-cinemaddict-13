import {MINUTES_IN_HOUR, RankName, Ranks} from "../constants.js";

const getHours = (mins) => {
  let hours = Math.trunc(mins / 60);
  return hours;
};

const getMinutes = (mins) => {
  let minutes = mins % 60;
  return minutes;
};

const inRange = (low, num, high, inclusive) => {
  inclusive = (typeof inclusive === `undefined`) ? false : inclusive;
  if (inclusive && num >= low && num <= high) {
    return true;
  }
  if (num > low && num < high) {
    return true;
  } else {
    return false;
  }
};

const getUserRank = (films) => {
  const watchedMovies = films.filter((film) => film.isWatched).length;

  if (inRange(Ranks.NOVICE.MIN, watchedMovies, Ranks.NOVICE.MAX)) {
    return RankName.NOVICE;
  }
  if (inRange(Ranks.FAN.MIN, watchedMovies, Ranks.FAN.MAX)) {
    return RankName.FAN;
  }
  if (inRange(Ranks.MOVIE_BUFF.MIN, watchedMovies, Ranks.MOVIE_BUFF.MAX)) {
    return RankName.MOVIE_BUFF;
  }
  return ``;
};

const calculateMoviesDuration = (movies) => {
  let totalDuration = {
    hours: 0,
    minutes: 0
  };
  const watchedFilms = movies.filter((film) => film.isWatched);

  if (watchedFilms.length) {
    const totalHours = watchedFilms.map((film) => getHours(film.duration)).reduce((sum, current) => sum + current);
    const totalMinutes = watchedFilms.map((film) => getMinutes(film.duration)).reduce((sum, current) => sum + current);
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
  }).flat(1); // спросить про flatMap и flat
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
  getGenres
};
