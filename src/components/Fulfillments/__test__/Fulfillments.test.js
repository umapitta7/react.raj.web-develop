import React from 'react';
import { render } from '@testing-library/react';
import Fulfillments from '../Fulfillments';
import '@testing-library/jest-dom';
import { Utils } from '../../../utils';

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
});
test('render Buyinstore Component', () => {
  const props = {
      pageName: "pdp", // To Perform Lazy load of react Components 
      productType: "ProductBean", // List of types - BundleBean or ProductBean 
      programType: "InWarehouse", //  List[InWarehouse, 3rdPartyDelivery,   siteControlledInventory, locationControlledInventory, 2dayDelivery] Only highlighted is in scope
      buyInStoreOnly: {inventory: "available"},
      sameDayDelivery: { shortDes: ""}  
  };
  const { getByText } = render(<Fulfillments
    props={props}
  />);
});

test('render SameDay Delivery Component', () => {
  const props = {
    pageName: "pdp", // To Perform Lazy load of react Components 
    productType: "ProductBean", // List of types - BundleBean or ProductBean 
    programType: "3rdPartyDelivery", //  List[InWarehouse, 3rdPartyDelivery,   siteControlledInventory, locationControlledInventory, 2dayDelivery] Only highlighted is in scope
    buyInStoreOnly: {inventory: "unavailable"},
    sameDayDelivery: { shortDes: ""}  
  };
  const { getByText } = render(<Fulfillments props={props} />);
});

// test('test Page Name', () => {
//   expect(window.reactGlobal.pageName).toBe('pdp');
// });
// test('test product Type', () => {
//   expect(window.reactGlobal.productType).toBe('ProductBean');
// });
// test('test Program Type', () => {
//   expect(window.reactGlobal.programType).toBe('InWarehouse');
// });
// test('test inventory is available', () => {
//   expect(window.pdp.fulfilments.buyInStoreOnly.inventory).toBe('available');
// });
// test('test short description is available', () => {
//   expect(window.pdp.fulfilments.sameDayDelivery.shortDes).toBe('test');
// });
