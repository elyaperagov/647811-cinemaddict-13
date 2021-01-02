import AbstractView from "./abstract.js";

const createPopupCommentsTemplate = (commentaries) => {
  const commentsList = commentaries.map((comment) => createCommentsTemplate(comment)).join(``);
  return commentsList;
};

const createCommentsTemplate = (comment) => {
  const {id, message, emoji, author, date} = comment;
  return `<li class="film-details__comment" data-comment-id="${id}">
  <span class="film-details__comment-${emoji}">
    <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
  </span>
  <div>
    <p class="film-details__comment-text">${message}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

export default class CommentsView extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createPopupCommentsTemplate(this._comments);
  }
}