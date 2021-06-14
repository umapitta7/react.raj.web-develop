import { environmentDev } from './environment_dev';
import { environmentProd } from './environment_prod';

const env = process.env.NODE_ENV === 'production' ? environmentProd : environmentDev;

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
