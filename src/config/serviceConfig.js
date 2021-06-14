/* Configuration
Setting service parameters. To handle if any future updates in service params
*/
export function getServiceConfig() {
  return {
    defaults: {
      headers: {
        'Content-Type': 'application/json',
      },
      cacheTimeout: 86400000,
    },
    getDeliveryDate: {
      method: 'GET',
      mockEnabled: false,
      url: 'test'
    },
  };
}
