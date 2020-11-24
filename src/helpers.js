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

const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + `h ` + minutes + `m `;
};

const getPosterName = (name) => {
  let title = name.toLowerCase().replace(/\s/g, `-`);
  return title;
};

export {
  getRandomArrayItem,
  getRandomInteger,
  randomDate,
  shuffleArray,
  getTimeFromMins,
  getPosterName
};
