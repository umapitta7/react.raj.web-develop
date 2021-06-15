import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import DrawerContent from '../accountMenu/drawerContent';
import { SignOutShape } from '../common/propTypes';

const Layout = ({ children, signout }) => (
  <Box display="Flex">
    <DrawerContent signout={signout} iconColor={false} />
    {children}
  </Box>
);

Layout.propTypes = {
  signout: PropTypes.shape(SignOutShape).isRequired
};

export default Layout;
