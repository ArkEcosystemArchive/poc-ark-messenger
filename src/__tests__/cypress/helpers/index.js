export const createRandomString = () =>
  Math.random()
    .toString(36)
    .substring(7);
