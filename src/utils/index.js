import { format, setHours, setMinutes } from 'date-fns';
import { enUS, frCA } from 'date-fns/locale'; // import locales we need

const locales = { enUS, frCA }; // TODO: This could be externalized.
const localeFormats = { enUS: 'p', frCA: "k 'h' m aaaaa" }; // TODO: This could be externalized. These are the dateFNS time formats

// Services.code's.
const GAS = 'gas';
const AUTO = 'auto';
const FOOD = 'food';
const HEARING = 'hearing';
const OPTICAL = 'optical';
const PHARMACY = 'pharmacy';

export const WarehouseJsonOrder = [
  'shipToLocation',
  'storeLocation',
  'distributionCenters',
  'groceryCenters',
  'nearestWarehouse',
];
export class Utils {
  /*
    Function checks for empty or null or undefined for string and Array
    @return - value
    */
  static isEmpty(val) {
    return (
      val === null
      || val === undefined
      || val === ''
      || (Array.isArray(val) && val.length === 0)
      || (Object.keys(val).length === 0 && val.constructor === Object)
    );
  }

  /**
   * To get device width based on user media usage
   * @returns
   * @memberOf Utils
   */
  static getDeviceWidth() {
    return 0; // Need to Make calculations
  }

  static isObjectEmpty(val) {
    return Object.keys(val).length === 0 && val.constructor === Object; // Need to add
  }

  /**
   * To convert single array to object. Basically to remove square brackets
   * @param {any} arr and key
   * @returns
   * @memberOf Utils
   */
  static arrayToObj(arr, key) {
    const obj = Object.assign({}, ...arr);
    const request = !Utils.isEmpty(obj) ? obj[key] : null;
    return request;
  }

  /**
   * To merge two arrays into single array
   * @param {any} arr1
   * @param {any} arr2
   * @param {any} _primaryId
   * @returns
   * @memberOf Utils
   */
  static async mergeTwoArrays(arr1, arr2) {
    return Array.prototype.push.apply(arr1, arr2);
  }

  /**
   * To remove duplicate entries in array with reference primarykey
   * @param {any} mergedArray
   * @param {any} primaryId
   * @returns
   * @memberOf Utils
   */
  static removeDuplicates(mergedArray, primaryId) {
    return Object.values(
      mergedArray.reduce(
        (acc, cur) => Object.assign(acc, { [primaryId.id]: cur }),
        {}
      )
    );
  }

  /**
   * To convert string to local
   * @param {any} str
   * @returns
   * @memberOf Utils
   */
  static toCamelCase(str) {
    return str
      .replace(/\s(.)/g, ($1) => $1.toUpperCase())
      .replace(/\s/g, '')
      .replace(/^(.)/, ($1) => $1.toLowerCase());
  }

  /**
   * To capitalizse first letter in string
   * @param {any} string
   * @returns
   * @memberOf Utils
   */
  static capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  /**
   * To get params from query string
   * No Params
   * @returns
   * @memberOf Utils
   */
  static getParams() {
    const params = {};
    const parser = document.createElement('a');
    parser.href = document.location.href;
    const query = parser.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i += 0) {
      const pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  /**
   * To form query string for hitting api
   * @param {any} url
   * @param {any} key
   * @param {any} value
   * @returns
   * @memberOf Utils
   */
  static formQueryString(url, key, value) {
    const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
    const uri = url?.toString();
    const separator = uri?.indexOf('?') !== -1 ? '&' : '?';
    if (uri?.match(re)) {
      return uri;
    }
    return `${uri + separator + key}=${value}`;
  }

  /**
   * Redirect the application to the new page using window open
   * @param {any} string
   * @returns
   * @memberOf Utils
   */
  static pageRedirection(url) {
    if (!this.isEmpty(url)) {
      window.open(url);
    }
  }

  static encodeUri(data) {
    if (!this.isEmpty(data)) {
      return encodeURIComponent(data);
    }
    return undefined;
  }

  static isDEV() {
    const env = false;
    if ((process.env.NODE_ENV === 'development') || (process.env.NODE_ENV === 'test')) {
      return true;
    }
    return env;
  }

  static formatLng(lng) {
    if (lng && lng.includes('-')) {
      const temp = lng.split('-');
      temp[1] = temp[1].toUpperCase();
      return temp.join('');
    }
    return lng;
  }

  static formatTime(time, lng = 'en-US') {
    const language = lng === 'en' ? 'en-US' : lng;

    if (time) {
      const hours = time.split(':')[0];
      const minutes = time.split(':')[1];

      let date = setHours(new Date(), hours);
      date = setMinutes(date, minutes);

      const formattedLng = Utils.formatLng(language);
      const locale = locales[formattedLng];
      const localeFormat = localeFormats[formattedLng];

      return format(date, localeFormat, { locale });
    }

    return time;
  }

  static getPinNumber(warehouse) {
    return warehouse.pinNumber ? warehouse.pinNumber : undefined;
  }

  static getWarehouseId(warehouse) {
    return warehouse.warehouseId;
  }

  static getWarehouseName(warehouse) {
    return warehouse.name[0].value;
  }

  static getWarehouseState(warehouse) {
    return warehouse.address.territory;
  }

  static getWarehouseHours(warehouse, title) {
    try {
      return warehouse.hours.find((hour) => hour.title[0].value === title);
    } catch (error) {
      // Just incase we have bad data for hours.
      return {
        open: '00:00:00',
        close: '00:00:00',
      };
    }
  }

  static openTill(warehouse) {
    const day = new Date().getDay() + 1;
    if (warehouse.hours) {
      return warehouse.hours.find((hour) => hour.weekDays.includes(day)).close;
    }
    return undefined;
  }

  static openNextDay(warehouse, todayDate) {
    let dayTomorrow = todayDate.getDay() + 2;
    if (dayTomorrow === 8) {
      dayTomorrow = 1;
    }
    const dateTomorrow = new Date(todayDate.setDate(todayDate.getDate() + 1));
    if (warehouse.hours) {
      if (warehouse.hours.find((hour) => hour.weekDays.includes(dayTomorrow))) {
        if (this.isHoliday(warehouse, dateTomorrow)) {
          // Recursive function call in case date is a holiday
          this.openNextDay(warehouse, dateTomorrow);
        } else {
          return dayTomorrow;
        }
      } else {
        // Recursive Function call in case if a day is  not in the days List
        this.openNextDay(warehouse, dateTomorrow);
      }
    }
    return dayTomorrow;
  }

  static openTimeNextDay(warehouse, todayDate) {
    const day = this.openNextDay(warehouse, todayDate);
    if (warehouse.hours) {
      return warehouse.hours.find((hour) => hour.weekDays.includes(day)).open;
    }
    return undefined;
  }

  static isHoliday(warehouse, dateToCompare) {
    const dd = String(dateToCompare.getDate()).padStart(2, '0');
    const mm = String(dateToCompare.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = dateToCompare.getFullYear();
    const todayString = `${yyyy}-${mm}-${dd}`;
    if (warehouse.holidays) {
      // Comparison of a holiday against the data in Warehouse APi formatted '2021-06-19'
      if (warehouse.holidays.find((holiday) => holiday.holidayDate === (todayString))) {
        return true;
      }
      return false;
    }
    return false;
  }

  static getSlug(warehouse) {
    return `${Utils.getWarehouseName(warehouse)
      .replace(/\s+/g, '-')
      .toLowerCase()}-${Utils.getWarehouseState(
      warehouse
    ).toLowerCase()}-${Utils.getWarehouseId(warehouse)}`;
  }

  static getDistance(warehouse) {
    return Number.parseFloat(warehouse.distance).toFixed(2);
  }

  static getMeasure(warehouse) {
    return warehouse.distanceUnit;
  }

  static getDirections(warehouse) {
    const warehouseAddress = encodeURIComponent(
      ['Costco']
        .concat(warehouse.address.line1.split(' '))
        .concat(warehouse.address.city.split(' '))
        .concat(warehouse.address.territory.split(' '))
        .concat(warehouse.address.countryName.split(' '))
        .join(' ')
    );
    if (warehouseAddress) {
      const win = window.open(
        `${window.location.protocol}//maps.google.com?saddr=Current+Location&daddr=${warehouseAddress}`,
        '_blank'
      );
      win.focus();
    }
  }

  // Array.some is used because it returns a boolean and it exits early.
  static hasGas(warehouse) {
    return warehouse.services?.some((service) => service.code === GAS);
  }

  static hasTires(warehouse) {
    return warehouse.services?.some((service) => service.code === AUTO);
  }

  static hasFood(warehouse) {
    return warehouse.services?.some((service) => service.code === FOOD);
  }

  static hasHearing(warehouse) {
    return warehouse.services?.some((service) => service.code === HEARING);
  }

  static hasOptical(warehouse) {
    return warehouse.services?.some((service) => service.code === OPTICAL);
  }

  static hasPharmacy(warehouse) {
    return warehouse.services?.some((service) => service.code === PHARMACY);
  }
}
