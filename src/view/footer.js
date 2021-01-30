import AbstractView from "./abstract.js";

const createFooterTemplate = (data) => {
  return `<p>${data === undefined ? `0 movies inside` : `${data.length} movies inside`}</p>`;
};

export default class Footer extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createFooterTemplate(this._data);
  }
}
