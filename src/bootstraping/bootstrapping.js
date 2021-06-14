import React from 'react';

export function siblingComponentList() {
  return {
    accountMenu: React.lazy(() => import('../components/accountMenu')),
    accountHome: React.lazy(() => import('../components/accountHome')),
    leftNav: React.lazy(() => import('../components/accountMenu/drawerContent')),
    orders: React.lazy(() => import('../components/orders')),

    warehouseSidebar: React.lazy(() => import('../components/WarehouseSidebar')),
    fulfillments: React.lazy(() => import('../components/Fulfillments/Fulfillments')),
    deliveryLocation: React.lazy(() => import('../components/DeliveryLocation/DeliveryLocation')),
    myWarehouse: React.lazy(() => import('../components/MyWarehouse/myWarehouse'))
  };
}
