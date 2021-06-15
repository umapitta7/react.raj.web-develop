import { CookieHandler } from "./CookieHandler";

it('check cookie is getting set', () => {
  const KEY = 'foo';
  const userPreference = {
    zipcode: '12345'
  }
  CookieHandler.setObject('WAREHOUSEDELIVERY_WHS', userPreference, 1);
});


it('check delete cookie', () => {
  CookieHandler.delete('WAREHOUSEDELIVERY_WHS');
});

