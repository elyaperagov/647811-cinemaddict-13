import Observer from "../helpers/observer.js";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
    console.log(this._comments);
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
    const index = this._comments.findIndex((comment) => comment !== update.comments); // это надо додумать

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments.splice(index, 1);

    this._notify(updateType, update);
  }

  static adaptToClient(comments) {
    const adaptedComments = Object.assign(
        {},
        comments,
        {
          id: comments.id,
          message: comments.comment,
          emoji: comments.emotion,
          author: comments.author,
          date: comments.date
        });
    // console.log(adaptedComments)
    return adaptedComments;
  }


  // static adaptToServer(comments) {
  //   const adaptedComments = Object.assign(
  //       {},
  //       comments,
  //       {
  //         idMessage: comments.id,
  //         text: comments.comment,
  //         emoji: comments.emotion,
  //         date: comments.date,
  //         author: comments.author
  //       });

  //   return adaptedComments;
  // }
}
