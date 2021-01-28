import {getUserRank} from "../helpers/statistics-helpers.js";
import Smart from "./smart.js";

const createUserProfileTemplate = (data) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${getUserRank(data)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile extends Smart {
  constructor(data) {
    super();
    this._films = data;
  }
  getTemplate() {
    return createUserProfileTemplate(this._films);
  }
}
