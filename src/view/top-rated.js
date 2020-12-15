import AbstractView from "./abstract.js";

const createFilmsListTopRatedTemplate = () =>
  `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
  </section>`;

export default class TopRated extends AbstractView {
  // constructor() {
  //   super();
  // }

  getTemplate() {
    return createFilmsListTopRatedTemplate();
  }
}
