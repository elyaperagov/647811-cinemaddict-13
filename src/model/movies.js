import Observer from "../helpers/observer.js";

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

    // const pushed = film[0].comments.push(update.comment)  // неправильно

    const movie = Object.assign({}, film[0].comments, update);
    // const movie = Object.assign({}, film[0], {comments: update.comment});

    this.updateFilm(updateType, movie);
  }

  deleteComment(updateType, update) {
    const film = this._films.filter((movie) => movie.id === update.id);
    const comments = film[0].comments.filter((commId) => commId.id !== update.comment);

    const movie = Object.assign({}, film[0], {comments});

    this.updateFilm(updateType, movie);
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
          // watching_date: movie.user_details.watching_date,
          isFavorite: movie.user_details.favorite,
        }
    );

    // Ненужные ключи мы удаляем
    // delete adaptedMovie.is_archived;
    // delete adaptedMovie.is_favorite;
    return adaptedMovie;
  }

  // static adaptToClient(movie) {
  //   return api.getComments(movie.id).then((comments) => {
  //     const adaptedMovie = Object.assign(

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
        {},
        movie,
        {
          "is_archived": movie.isArchive,
          "is_favorite": movie.isFavorite
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedMovie.isArchive;
    delete adaptedMovie.isFavorite;

    return adaptedMovie;
  }
}
