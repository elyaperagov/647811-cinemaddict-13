import {DESCRIPTION_MAX} from "../constants.js";

const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + `h ` + minutes + `m `;
};

const getPosterName = (name) => {
  let title = name.toLowerCase().replace(/\s/g, `-`);
  return title;
};

const getRandomArrayItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const randomDate = (start, end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const getShortDescription = (description) => `${description.substring(0, DESCRIPTION_MAX)}...`;

const getMeRandomElements = function (sourceArray, neededElements) {
  let result = [];
  for (let i = 0; i < neededElements; i++) {
    result.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);
  }
  return result;
};

export {
  getRandomArrayItem,
  getRandomInteger,
  randomDate,
  shuffleArray,
  getTimeFromMins,
  getPosterName,
  updateItem,
  getMeRandomElements,
  getShortDescription
};
