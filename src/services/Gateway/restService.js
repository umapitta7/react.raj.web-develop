import axios from 'axios';
import { getServiceConfig } from '../../config/serviceConfig';
import { environment } from '../../config/environment';

export class RestService {
  constructor() {
    this.errorModel = {
      errCode: '',
      errMsg: '',
    };
  }

  static getRequestObj(params) {
    return this.formRequestObj(params);
  }

  /**  Function to Form the Request Object
   *  @memberof RestService
   * Static method to invoke only in the class
   */
  static formRequestObj(params) {
    const serviceConfig = getServiceConfig();
    const serviceEntry = serviceConfig[params.apiName];
    let url;
    let requestOptions = {};
    const methodName = serviceEntry.method;
    if (serviceEntry.url == null) {
      console.log(`Invalid service entry for ApiName : ${params.apiName}`);
    } else {
      url = this.createURL(params.apiName, serviceEntry);
      requestOptions = {
        method: methodName,
        headers: this.createHeader(serviceConfig),
        body: methodName.toLowerCase() !== 'get' ? params.body : null,
        url: url || '',
      };
    }
    return requestOptions;
  }

  /**
   * Function to Form the request URL
   * @memberof RestService
   * Static method to invoke only in the class
   */
  static createURL(serviceEntry) {
    let url;
    if (serviceEntry.mockEnabled) {
      url = 'test';
    } else {
      url = environment.api.endpointUrl + serviceEntry.url;
      // console.log('environment', environment);
      // console.log('environment', environment.api.endpointUrl);
    }
    return url;
  }

  /**  Function to Form the Request Object
   *  @memberof RestService
   * Static method to invoke only in the class
   */
  static createHeader(serviceConfig) {
    const { headers } = serviceConfig.defaults;
    return headers;
  }

  /**  Function to Form the Request Object
   *  @memberof RestService
   * Static method to invoke only in the class
   */
  static getServiceEntry(options) {
    let serviceConfig = getServiceConfig();
    serviceConfig = serviceConfig[options.serviceName] || {};
    return serviceConfig;
  }

  /**  Function to Form the Request Object
   *  @memberof RestService
   * static method to invoke from Saga
   */
  static invokeRESTApi(options) {
    const serviceEntry = this.getServiceEntry(options);

    const url = this.createURL(serviceEntry);
    // const requestObj = options.requestParams;
    return axios(url)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
        const { errorModel } = this;
        errorModel.errCode = res.status;
        return errorModel;
      })
      .catch((errors) => errors);
  }

  /**  Function to Handle Error
   *  @memberof RestService
   * Static method to invoke only in the class
   */
  static handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message);
    }
    // console.log(error.config);
    return error;
  }

  static getRedirectedUrl(url) {
    return axios.get(url);
  }
}
