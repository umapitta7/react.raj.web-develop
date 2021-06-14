import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SameDayDelivery from '../SameDayDelivery';
import '@testing-library/jest-dom';
import { Utils } from '../../../../../utils';
import { CookieHandler } from '../../../../../utils/CookieHandler';

let window;
let warehouse;
beforeAll(() => {
  global.wioEventBus = {
    subscribers: {},
    subscribe(subscriptionKey, listener) {
      if (!this.subscribers[subscriptionKey]) {
        this.subscribers[subscriptionKey] = [];
      }
      const index = this.subscribers[subscriptionKey].push(listener) - 1;
      return {
        unSubscribe() {
          delete this.subscribers[subscriptionKey][index];
        }
      };
    },
    publish(subscriptionKey, data) {
      if (!this.subscribers[subscriptionKey]
        || this.subscribers[subscriptionKey].length < 1) return;
      this.subscribers[subscriptionKey].forEach((listener) => {
        listener(data || {});
      });
    }
  };
  warehouse = {
    shipToLocation: '37068',
    storeLocation: '98027',
    distributionCenters: [
      '110-wm',
      '115-3pl'
    ],
    groceryCenters: [
      '110-bd'
    ],
    nearestWarehouse: {
      city: 'Issaquah', // Will be used in Buy In-store only component
      catalog: '100-wh'
    }
  };
});

test('header renders with correct text', () => {
  const sameDayDelivery = {
    shortDes: 'test'
  };
  const { getByText } = render(<SameDayDelivery
    sameDayDelivery={sameDayDelivery}
    wareHouseCookie={warehouse}
  />);
  expect(getByText('samedaydelivery_header')).toBeInTheDocument();
  expect(getByText('samedaydelivery_price_availability')).toBeInTheDocument();
});

test('samedaydelivery_btn button Click', () => {
  const sameDayDelivery = {
    shortDes: 'test'
  };
  const userPreference = {
    shipToLocation: '37068',
    storeLocation: '98027',
    distributionCenters: [
      '110-wm',
      '115-3pl'
    ],
    groceryCenters: [
      '110-bd'
    ],
    nearestWarehouse: {
      city: 'Test', // Will this be language managed
      catalog: '100-wh'
    }
  };
  CookieHandler.setObject('WAREHOUSEDELIVERY_WHS', userPreference);
  const { getByText } = render(<SameDayDelivery
    sameDayDelivery={sameDayDelivery}
    wareHouseCookie={warehouse}
  />);
  global.open = jest.fn();
  const element = getByText('samedaydelivery_btn');
  fireEvent.click(element);
  expect(global.open).toBeCalled();
});
