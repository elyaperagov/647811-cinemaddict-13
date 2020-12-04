import AbstractView from "./abstract.js";

const createNavigationTemplate = (watchList, history, favorites) => {
  // let {watchList, history, favorites} = stats;

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchList}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
  </nav>`;
};


export default class Navigation extends AbstractView {
  constructor(watchList, history, favorites) {
    super();
    this._watchList = watchList;
    this._history = history;
    this._favorites = favorites;
  }

  getTemplate() {
    return createNavigationTemplate(this._watchList, this._history, this._favorites);
  }
}
