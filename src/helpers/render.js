import Abstract from "../view/abstract.js";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const renderElement = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const shake = (element) => {
  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
  setTimeout(() => {
    element.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};

const disablePopup = (isFormDisabled, container) => {
  const elements = container.elements;
  const [...allElements] = elements;

  allElements.forEach((element) => {
    element.disabled = isFormDisabled;
  });
};

const disableDeleteButton = (button, bDisabled) =>{
  button.disabled = bDisabled;
  button.innerHTML = bDisabled ? `Deleting…` : `Delete`;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (!parent || !oldChild || !newChild) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

const renderTemplate = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

const getMostRatedFilms = (films) => {
  return films.slice().sort((a, b) => b.rating - a.rating);
};

const getDateSortedFilms = (films) => {
  return films.slice().sort((a, b) => b.year - a.year);
};

const getMostCommentedFilms = (films) => {
  return films.slice().sort((a, b) => b.comments - a.comments);
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export {
  renderTemplate,
  renderElement,
  createElement,
  remove,
  RenderPosition,
  getMostRatedFilms,
  getMostCommentedFilms,
  getDateSortedFilms,
  generateId,
  shake,
  disablePopup,
  disableDeleteButton
};
