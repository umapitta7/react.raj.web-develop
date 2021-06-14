import { render } from '@testing-library/react';

import useSkeletonGenerator from './useSkeletonGenerator';

describe('skeletonGenerator test', () => {
  it('Happy path (default)', () => {
    const skeleton = useSkeletonGenerator({});
    const { getAllByTestId } = render(skeleton);

    expect(
      getAllByTestId('skeleton')[0].className.includes('MuiSkeleton-root')
    ).toBeTruthy();
  });

  it('with custom style', () => {
    const skeleton = useSkeletonGenerator({
      variant: 'rect',
      animation: 'wave',
      width: '400px',
      height: '400px',
    });
    const { getAllByTestId } = render(skeleton);

    expect(
      getAllByTestId('skeleton')[0].className.includes('MuiSkeleton-rect')
    ).toBeTruthy();
    expect(
      getAllByTestId('skeleton')[0].className.includes('MuiSkeleton-rect')
    ).toBeTruthy();
    expect(getAllByTestId('skeleton')[0]).toHaveStyle({
      width: '400px',
      height: '400px',
    });
  });
});
