import AbstractView from "./abstract.js";
import {getUserRank} from "../helpers/statistics-helpers.js";

const createUserProfileTemplate = (data) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${getUserRank(data)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createUserProfileTemplate(this._data);
  }
}
