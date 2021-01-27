import AbstractView from "./abstract.js";

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  // getScroll() {
  //   return this.getElement().scrollTop;
  // }

  // applyScroll(scroll) {
  //   this.getElement().scrollIntoView(0, scroll);
  // }

  // updateScrollTop() {
  //   this.getElement().scrollTop = this._scrollTop;
  // }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    let scrollTop = prevElement.scrollTop;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = scrollTop;
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
