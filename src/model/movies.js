import Observer from "../helpers/observer.js";
import {api} from "../main.js";

export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const film = this._films.filter((movie) => movie.id === update.id);

    film[0].comments.push(update.comment);

    this.updateFilm(updateType, film[0]);
  }

  deleteComment(updateType, update) {
    const film = this._films.filter((movie) => movie.id === update.id);
    const comments = film[0].comments.filter((commId) => commId.id !== update.comment);

    const movie = Object.assign({}, film[0], {comments});

    this.updateFilm(updateType, movie);
  }

  static updateToClient(movie) {
    return api.getUpdatedComments(movie.id).then((commentsCollection) => {
      const adaptedMovie = Object.assign(
          {},
          movie,
          {
            id: movie.id,
            comments: commentsCollection,
            title: movie.film_info.title,
            alternativeTitle: movie.film_info.alternative_title,
            rating: movie.film_info.total_rating,
            poster: movie.film_info.poster,
            age: movie.film_info.age_rating,
            director: movie.film_info.director,
            writers: movie.film_info.writers,
            actors: movie.film_info.actors,
            year: new Date(movie.film_info.release.date),
            releaseCountry: movie.film_info.release.release_country,
            duration: movie.film_info.runtime,
            genre: movie.film_info.genre,
            description: movie.film_info.description,
            isInWatchlist: movie.user_details.watchlist,
            isWatched: movie.user_details.already_watched,
            watchingDate: movie.user_details.watching_date,
            isFavorite: movie.user_details.favorite,
          }
      );
      return adaptedMovie;
    });
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
        {},
        movie,
        {
          id: movie.id,
          comments: movie.comments,
          title: movie.film_info.title,
          alternativeTitle: movie.film_info.alternative_title,
          rating: movie.film_info.total_rating,
          poster: movie.film_info.poster,
          age: movie.film_info.age_rating,
          director: movie.film_info.director,
          writers: movie.film_info.writers,
          actors: movie.film_info.actors,
          year: new Date(movie.film_info.release.date),
          releaseCountry: movie.film_info.release.release_country,
          duration: movie.film_info.runtime,
          genre: movie.film_info.genre,
          description: movie.film_info.description,
          isInWatchlist: movie.user_details.watchlist,
          isWatched: movie.user_details.already_watched,
          watchingDate: movie.user_details.watching_date,
          isFavorite: movie.user_details.favorite,
        }
    );

    return adaptedMovie;
  }

  static takeCommentId(comments) {
    let commentsIds = [];
    comments.forEach((comment) => {
      commentsIds.push(comment.id);
    });

    return commentsIds;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
        {},
        movie,
        {
          "id": movie.id,
          "comments": this.takeCommentId(movie.comments),
          "film_info": {
            "title": movie.title,
            "alternative_title": movie.alternativeTitle,
            "total_rating": movie.rating,
            "poster": movie.poster,
            "age_rating": movie.age,
            "director": movie.director,
            "writers": movie.writers,
            "actors": movie.actors,
            "release": {
              "date": movie.year.toISOString(),
              "release_country": movie.releaseCountry
            },
            "runtime": movie.duration,
            "genre": movie.genre,
            "description": movie.description
          },
          "user_details": {
            "watchlist": movie.isInWatchlist,
            "already_watched": movie.isWatched,
            "watching_date": movie.watchingDate,
            "favorite": movie.isFavorite,
          }
        }
    );

    delete adaptedMovie.actors;
    delete adaptedMovie.age;
    delete adaptedMovie.releaseCountry;
    delete adaptedMovie.description;
    delete adaptedMovie.duration;
    delete adaptedMovie.genre;
    delete adaptedMovie.isInWatchlist;
    delete adaptedMovie.isFavorite;
    delete adaptedMovie.isWatched;
    delete adaptedMovie.alternativeTitle;
    delete adaptedMovie.title;
    delete adaptedMovie.poster;
    delete adaptedMovie.rating;
    delete adaptedMovie.year;
    delete adaptedMovie.watchingDate;
    delete adaptedMovie.writers;
    delete adaptedMovie.director;

    return adaptedMovie;
  }
}
