import { Utils } from '../utils';
import { environmentDev } from './environment_dev';
import { environmentProd } from './environment_prod';

/* Envionment data will be recieved from WCS through window object */
const envJSON = {
  DEV: environmentDev,
  PROD: environmentProd
};
let env = envJSON[window.reactObj.global.environment];
if (Utils.isEmpty(env)) {
  env = envJSON.PROD;
}

console.log('env', env);

export const environment = {
  mockEnabled: env.mockEnabled,
  appId: env.appId,
  api: {
    name: env.name,
    mockurl: env.mockurl,
    endpointUrl: env.api.endpointUrl,
    sameDayDeliveryUrl: env.api.sameDayDeliveryUrl,
    headers: env.headers,
  },
};
