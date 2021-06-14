import { SvgIcon as MaterialSvgIcon } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { space } from 'styled-system';
import {
  ButtonsColorPrimaryDefaultBackground
} from 'cds-tokens/dist/js/cds-variables';
// Color Hack.  Need to apply a theme from forge-components
const SvgIcon = styled(MaterialSvgIcon)`
  ${space}
  color: ${ButtonsColorPrimaryDefaultBackground};
  padding-right: 8px;
`;
const IconLabel = ({ svg }) => (
  <div>
    <Flex px={0}>
      <SvgIcon pr="sm">{svg}</SvgIcon>
    </Flex>
  </div>
);

export default IconLabel;

IconLabel.propTypes = {
  svg: PropTypes.node.isRequired,
};
