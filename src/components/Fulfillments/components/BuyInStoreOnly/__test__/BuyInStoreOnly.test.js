import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import BuyInStoreOnly from '../BuyInStoreOnly';
import '@testing-library/jest-dom';
import { Utils } from '../../../../../utils';

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
  const buyInStoreOnly = {
    inventory: 'unavailable'
  };

  // expect(window.wioEventBus.publish('notifiyVarientsChnage')).toHaveBeenCalledTimes(1);

  const { getByText } = render(<BuyInStoreOnly
    buyInStoreOnly={buyInStoreOnly}
    wareHouseCookie={warehouse}
  />);
  expect(getByText('buyinstore_header')).toBeInTheDocument();
});

test('buyinstore_change_Btn butotn Click', () => {
  const buyInStoreOnly = {
    inventory: 'unavailable'
  };

  const { getByText } = render(<BuyInStoreOnly
    buyInStoreOnly={buyInStoreOnly}
    wareHouseCookie={warehouse}
  />);
  const element = getByText('buyinstore_change_Btn');
  fireEvent.click(element);
  expect(warehouse.nearestWarehouse.city).toBe('Issaquah');
});

test('buyinstore_set_mywarehouse  butotn Click', () => {
  const buyInStoreOnly = {
    inventory: 'available'
  };

  const warehouseUpdate = {
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
      city: '', // Will be used in Buy In-store only component
      catalog: '100-wh'
    }
  };

  const { getByText } = render(<BuyInStoreOnly
    buyInStoreOnly={buyInStoreOnly}
    window={window}
    wareHouseCookie={warehouseUpdate}
  />);
  const element = getByText('buyinstore_set_mywarehouse');
  fireEvent.click(element);
});

test('publish notifyVaraintsChange  windows Click', async () => {
  const buyInStoreOnlyAvailable = {
    inventory: 'available'
  };
  await waitFor(() => {
    window.wioEventBus.publish('notifyVaraintsChange', buyInStoreOnlyAvailable);
    // const buyInStoreOnlyUnavailable = {
    //   inventory: 'unavailable'
    // };

    // window.wioEventBus.publish('notifiyVarientsChnage', buyInStoreOnlyUnavailable);
  });
});

