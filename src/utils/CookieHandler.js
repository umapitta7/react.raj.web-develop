export class CookieHandler {
  /**
  * Property sets the cookie
  * @param {string} value cookie string to be stored in the browser
  * @returns void
  */
  static set cookie(value) {
    document.cookie = value;
  }

  /**
   * Deletes specific cookie
   * @param {string} name name of the cookie to delete.
   * @returns void
   */
  static delete(name) {
    if (this.cookieExists(name)) {
      this.set(name, null, 'Thu, 01 Jan 1970 00:00:00 GMT'); // Setting the past date so that cookie expires - need to valdiate once
    }
  }

  /**
   * Checks the existence cookie by name
   * @param {string} name Name of hte cookie
   * @returns true if cookie Exists, false otherwise
   */
  static cookieExists(name) {
    name = encodeURIComponent(name);
    const regexp = new RegExp(`(?:^${name}|;\\s*${name})=(.*?)(?:;|$)`, 'g');
    const exists = regexp.test(document.cookie);
    return exists;
  }

  /**
   * Retrieves value of cookie for given input name.
   * @param {string} name name for the "cookie".
   * @returns {any} stored value/object(serialized), null if cookie does not exists
   */
  static get(name) {
    let cookieValue = null;
    if (this.cookieExists(name)) {
      const regexp = new RegExp(`(?:^${encodeURIComponent(name)}|;\\s*${encodeURIComponent(name)})=(.*?)(?:;|$)`, 'g');
      const result = regexp.exec(document.cookie);
      cookieValue = decodeURIComponent(result[1]);
      try {
        cookieValue = JSON.parse(cookieValue);
      } catch (e) {
        // cookieValue = cookieValue; as part of sonar fix
      }
    }

    return cookieValue;
  }

  /**
   * Sets a value for given cookie key.
   * @param {string} name name for the "cookie".
   * @param {string} value value to be stored.
   * @param {days} days (Optional) Options object.
   */
  static set(name, value, days) {
    this.cookie = this.buildCookieString(name, value, days);
  }

  /**
   * Stores object (serializes the object) in cookie.
   * @param {string} name name for the "cookie".
   * @param {Object} value Object to be stored.
   * @param {days} days (Optional) Options object.
   */
  static setObject(name, value, days) {
    this.set(name, JSON.stringify(value), days);
  }

  static buildCookieString(name, value, days) {
    let expires;
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};path=${window.hostname}`;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }

    return cookieString;
  }

}
