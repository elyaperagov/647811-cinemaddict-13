import {createElement} from '../helpers.js';

const createFilmsExtraContainersTemplate = (header) => {
  return `<section class="films-list films-list--extra">
      <h2 class="films-list__title">${header}</h2>
      <div class="films-list__container">
      </div>
    </section>`;
};


export default class FilmsExtra {
  constructor(header) {
    this._header = header;
    this._element = null;
  }

  getTemplate() {
    return createFilmsExtraContainersTemplate(this._header);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
