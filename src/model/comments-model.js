import Observer from "../helpers/observer.js";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    this._comments = [
      update,
      ...this._comments
    ];
    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = update.comments.findIndex((comment) => comment !== update.comments); // это надо додумать

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments.splice(index, 1);

    this._notify(updateType, update);
  }
}
