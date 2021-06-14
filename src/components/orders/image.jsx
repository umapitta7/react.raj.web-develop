import React from 'react';
// import PropTypes from "prop-types"

import useSkeletonGenerator from '../../customHooks/useSkeletonGenerator';

const Image = ({ style }) => {
  const Skeleton = useSkeletonGenerator({
    variant: 'rect',
    animation: 'wave',
    height: style.height,
    width: style.width,
  });

  return <div style={{ ...style }}>{Skeleton}</div>;
};

export default Image;

Image.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
};

Image.defaultProps = {};
