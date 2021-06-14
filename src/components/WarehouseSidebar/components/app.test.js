import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import App from './app';

describe('App test', () => {
  let setState;
  beforeAll(() => {
    setState = jest.fn();
  });

  it('Component renders', () => {
    const { getByText } = render(<App setState={setState} />);
    expect(getByText('Find a Warehouse')).toBeInTheDocument();
    expect(getByText('Use My Current Location')).toBeInTheDocument();
  });
});
