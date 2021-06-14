import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const useSkeletonGenerator = ({
  variant, animation, width, height
}) => (

  <Skeleton
    data-testid="skeleton"
    {...(variant && { variant })}
    {...(animation && { animation })}
    {...(width && { width })}
    {...(height && { height })}
  />
);

export default useSkeletonGenerator
