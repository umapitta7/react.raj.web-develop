const isLocalStorageAvailable = () => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (error) {
    return false;
  }
};

export const getInLocal = (key) => {
  if (isLocalStorageAvailable()) {
    return localStorage.getItem(key);
  }
  return null;
};

export const setInLocal = (key, data) => {
  // As the size of your data grows we may want to look into useing slow-json-stringify.
  // Works on both the client side and in Nodejs.  See https://github.com/lucagez/slow-json-stringify
  if (isLocalStorageAvailable()) localStorage.setItem(key, JSON.stringify(data));
};
