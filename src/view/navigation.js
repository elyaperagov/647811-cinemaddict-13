import AbstractView from "./abstract.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return (
    `<a href="#watchlist" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">${name}<span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${filterItemsTemplate}
    </div>`;
};


export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
