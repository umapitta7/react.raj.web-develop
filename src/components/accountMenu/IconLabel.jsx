import { SvgIcon as MaterialSvgIcon } from '@material-ui/core';
import PropTypes from 'prop-types';
import { color, space, width, height } from 'styled-system';
import styled from 'styled-components';
import { Flex } from 'reflexbox';

const SvgIcon = styled(MaterialSvgIcon)`${space} ${color} ${width} ${height}`;

const IconLabel = ({ id, svg, iconColor, width, height }) => {
  return (
    <div id={id}>
      <Flex justifyContent="center">
        <SvgIcon color={iconColor} width={width} height={height} pr="xs">
          {svg}
        </SvgIcon>
      </Flex>
    </div>
  );
};

IconLabel.propTypes = { id: PropTypes.string, svg: PropTypes.element.isRequired, iconColor: PropTypes.string, width: PropTypes.number, height: PropTypes.number };

IconLabel.defaultProps = { id: "icon", iconColor: 'gray.500', width: 22, height: 22 };

export default IconLabel;
