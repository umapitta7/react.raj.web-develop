import { Drawer } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DrawerContent from './drawerContent';
import { SignOutShape } from '../common/propTypes';

const AccountMenu = ({ signout }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const subscriptionRef = window.wioEventBus.subscribe('accountMenu', (data) => {
      setOpenDrawer(data.accountMenu);
    });

    return () => {
      // Clean up code
      if (subscriptionRef && typeof subscriptionRef.unsubscribe === 'function') {
        subscriptionRef.unsubscribe();
      }
    };
  });

  const handleClose = () => {
    window.wioEventBus.publish('accountMenu', { accountMenu: false });
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleClose}
        style={{ zIndex: '20012' }}
      >
        <DrawerContent signout={signout} showDivider />
      </Drawer>
    </div>
  );
};

AccountMenu.propTypes = {
  signout: PropTypes.shape(SignOutShape).isRequired
};

export default AccountMenu;
