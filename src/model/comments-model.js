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
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments.splice(index, 1);

    this._notify(updateType, update);
  }

  // deleteComment(updateType, update) {
  //   const filmId = update.id;
  //   const commentId = update.comments;
  //   const index = this._comments.findIndex((comment) => comment.id === commentId);


  //   if (index === -1) {
  //     throw new Error(`Can't delete unexisting comment`);
  //   }

  //   this._comments[filmId] = [
  //     ...this._comments[filmId].slice(0, index),
  //     ...this._comments[filmId].slice(index + 1)
  //   ];

  //   const updatedFilm = Object.assign({}, update, {comments: this._comments[filmId]});
  //   this._notify(updateType, updatedFilm);
  // }

}
