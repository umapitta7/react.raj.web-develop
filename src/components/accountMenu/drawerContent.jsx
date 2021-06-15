import { Divider } from '@material-ui/core';
import styled from 'styled-components';
import { Box } from 'reflexbox';
import PropTypes from 'prop-types';
import React from 'react';
import '../../translations/language';
import './index.css';
import UserInfo from './userInfo';
import MenuList from './menuList';
import Signout from './signOut';
import { SignOutShape } from '../common/propTypes';

const StyledBox = styled(Box)`
  width: 280px;
  height: 100%;
  list-style-position: inside;
`;

const DrawerContent = ({
  signout, iconColor, showDivider, onClose
}) => (
  <StyledBox>
    <UserInfo onClose={onClose} />
    <Divider />
    <div style={{ paddingBottom: 8 }}>
      <MenuList style={{ paddingBottom: 10 }} iconColor={iconColor} showDivider={showDivider} />
    </div>
    <Divider />
    <Signout signout={signout} iconColor={iconColor} />
  </StyledBox>
);

DrawerContent.propTypes = {
  iconColor: PropTypes.bool,
  showDivider: PropTypes.bool,
  onClose: PropTypes.func,
  signout: PropTypes.shape(SignOutShape).isRequired
};

DrawerContent.defaultProps = {
  iconColor: true, showDivider: false, onClose: null
};

export default DrawerContent;
