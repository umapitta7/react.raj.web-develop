import React, { lazy } from 'react';

const BreadCrumb = lazy(() => import('./breadCrumb'));
const MenuGrid = lazy(() => import('./menuGrid'));

// TODO: need to use breadcrumbs from forge-components
const AccountHome = () => (
  <div style={{ marginRight: 50 }}>
    <BreadCrumb />
    <MenuGrid />
  </div>
);

export default AccountHome;
