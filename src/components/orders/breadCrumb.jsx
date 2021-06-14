import React from 'react';
// import PropTypes from "prop-types"

import useSkeletonGenerator from '../../customHooks/useSkeletonGenerator';

const BreadCrumb = ({ style }) => {
  const Skeleton = useSkeletonGenerator({
    variant: 'rect',
    animation: 'wave',
    width: '381px',
    height: '16px',
  });

  return <div style={{ ...style }}>{Skeleton}</div>;
};

export default BreadCrumb;

BreadCrumb.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
};

BreadCrumb.defaultProps = {};
