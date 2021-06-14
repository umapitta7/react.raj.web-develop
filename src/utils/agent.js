import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import localforage from 'localforage';
import isEmpty from 'lodash/isEmpty';
import * as rax from 'retry-axios';
import { v4 as uuidv4 } from 'uuid';
import mockResponse from "../components/DeliveryLocation/response.json";

// import { environment } from "../config/environment"

import { getServiceConfig } from '../config/serviceConfig';
const serviceConfigs = getServiceConfig();

/* eslint-disable prefer-destructuring */
const locatorServiceBaseUrl =
  'https://api-spt.costco.com/warehouseLocatorMobile/v1';
const locatorServiceClientId = '625c2285-b0f3-4b5a-9a64-d6011754df06';
const locatorServiceMaxWarehouses = 50;
const bingMapsKey =
  'Al5PkNvy_P_hu7r6z-HThiv5HOwtlPVFQggDpU_Yn71tBtgnULa-KUmpA9yW__9H';
const bingMapsAPIUrl = 'https://dev.virtualearth.net/REST/v1';
const bingAutosuggestMaxResults = '4';
const bingGetLocationMaxResults = '4';
const costcoSendingApplication = 'ecomm.warehouse.locator.reactjs';
const cacheDebug = false;
const openingDate = new Date().toISOString().slice(0, 10);
const locationCatalogAPIUrl = "https://services.vqa2.costco.com:9443/restInventory/location/distributionCenters";
/* eslint-enable prefer-destructuring */

const forageStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE], // List of drivers used
  name: 'CW_warehouseLocator', // Prefix all storage keys to prevent conflicts
});

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: parseInt(serviceConfigs.defaults.cacheTimeout || '86400000', 10), // Fallback if headers can't be read.  24 hours in milliseconds.
  store: forageStore, // Pass `localforage` store to `axios-cache-adapter`
  clearOnStale: true, // Clear cached item when it is stale.
  clearOnError: true, // Prevents size quota problems in `localStorage
  readOnError: true, // Determine if stale cache should be read when a network error occurs.
  readHeaders: false, // Adapter will attempt using response headers.  Parsing `cache-control` or `expires` headers.
  ignoreCache: false, // For testing
  invalidate: async (config, request) => {
    if (request.clearCacheEntry) {
      await config.store.removeItem(config.uuid);
    }
  },
  exclude: {
    query: false,
  },
  debug: cacheDebug === 'true', // For debugging the axios cache.  Debugging statements are routed to console.
});

const api = axios.create();

// Create `axios` instance passing the newly created `cache.adapter`
const cachedApi = axios.create({
  adapter: cache.adapter,
});

// Axios retry configurations
api.defaults.raxConfig = {
  instance: api,
  retry: 3,
  noResponseRetries: 2,
  retryDelay: 100,
  httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
  statusCodesToRetry: [
    [100, 199],
    [429, 429],
    [500, 599],
  ],
  backoffType: 'exponential',
  onRetryAttempt: (err) => {
    const cfg = rax.getConfig(err);
    /* eslint-disable no-console */
    console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
    /* eslint-enable no-console */
  },
};

rax.attach(api); // attache Axios retry mechanism
rax.attach(cachedApi); // attache Axios retry mechanism

// Response interceptor to modify the response or handle errors.  Handy for debugging the returning payload before processing.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error; // Throw error to handleError function below.
  }
);

// Returns data from Axios response.
const responseBody = (response) => response.data;

// Error handler
const handleError = (error) => {
  if (error.message === 'Network Error' && error.response === undefined) {
    /* eslint-disable no-console */
    console.log(
      'Network error.  Are you connected to the internet?  Is API your attempting to call unavailable?'
    );
    /* eslint-enable no-console */
    // navigate("/404")
    throw error;
  }
  const { status } = error.response;
  if (status === 401) {
    /* eslint-disable no-console */
    console.log('401 - Session expired and unauthorized access');
    /* eslint-enable no-console */
    // navigate("/") // Push back to root of app to force another auth?
  }
  if (status === 403) {
    /* eslint-disable no-console */
    console.log('403 - Unauthorized access');
    /* eslint-enable no-console */
    // navigate("/404")
  }
  if (status === 404) {
    /* eslint-disable no-console */
    console.log('404 - Page not found');
    /* eslint-enable no-console */
    // navigate("/404")
  }
  /* eslint-disable no-console */
  console.log(error);
  /* eslint-enable no-console */
  // TODO: Figure out how best to handle errors with this app. navigate("/404")?
};

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));
const delay = process.env.REACT_APP_axiosDelay || 0;

// Axios heavy lifting.  GET only requests for warehouse info.
const requests = {
  get: (url, config) =>
    api
      .get(url, config)
      .then(sleep(delay))
      .then(responseBody)
      .catch(handleError),
};

// Axios heavy lifting.  GET only requests for warehouse info.
const cachedRequests = {
  get: (url, config) =>
    cachedApi
      .get(url, config)
      .then(sleep(delay))
      .then(responseBody)
      .catch(handleError),
};

const round = (value, digits) => {
  const pow = 10 ** digits; // Math.pow
  return Math.round(value * pow) / pow;
};

const agent = {
  /* eslint-disable no-unused-vars */

  // API results cached in localStore
  getWarehousesByLatLng: (
    latitude,
    longitude,
    filters = [],
    limit = 10,
    locale,
    clearCacheEntry = false
  ) => {
    if (limit > locatorServiceMaxWarehouses) {
      /* eslint-disable no-param-reassign */
      limit = locatorServiceMaxWarehouses;
      /* eslint-enable no-param-reassign */
    }

    const filtersQueryParameter = !isEmpty(filters)
      ? `&filters=${Object.keys(filters).toString()}`
      : '';
    const url = `${locatorServiceBaseUrl}/warehouses.json?client_id=${locatorServiceClientId}&latitude=${round(
      latitude,
      3
    )}&longitude=${round(
      longitude,
      3
    )}${filtersQueryParameter}&limit=${limit}&openingDate=${openingDate}`;
    const config = {
      clearCacheEntry,
      headers: {
        'Accept-Language': locale,
        // TODO: Cost is currently filtering out data from request with our ecomm.warehouse.locator.reactjs.
        // "costco.LocaleCode": [locale],
        // "costco.SendingApplication":
        // costcoSendingApplication || "ecomm.warehouse.locator.reactjs",
        // "costco.TrackingId": uuidv4(),
        // "costco.UserId": "client browser",
        // "costco.Timestamp": Date.now(),
      },
    };
    return cachedRequests.get(url, config);
  },
  /* eslint-enable no-unused-vars */

  // API call Not cached
  autoSuggest: (q, ul) => {
    // Details at: https://docs.microsoft.com/en-us/bingmaps/rest-services/autosuggest
    const url = `${bingMapsAPIUrl}/Autosuggest?query=${q}&includeEntityTypes=Place&ul=${ul}&maxResults=${bingAutosuggestMaxResults}&key=${bingMapsKey}`;
    const config = {
      headers: {},
    };
    return requests.get(url, config);
  },

  // API call Not cached
  getLocation: (q) => {
    const url = `${bingMapsAPIUrl}/Locations?q=${q}&maxResults=${bingGetLocationMaxResults}&key=${bingMapsKey}`;
    const config = {
      headers: {},
    };
    return requests.get(url, config);
  },

  // API call for getting location catalog
  getLocationCatalog: (code) => {
    const url = `${locationCatalogAPIUrl}`;
    const config = {
      headers: {
        "costco.env": "QA6",
        "costco.service": "restInventory",
      },
      params: {
        destinationPostalCode: code
      }
    };
    return requests.get(url, config);
    //return mockResponse;
  },
};

export default agent;
