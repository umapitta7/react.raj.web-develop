import React from 'react';
import { render, screen } from '@testing-library/react';

import BreadCrumb from './breadCrumb';

describe('BreadCrumb', () => {
  test('renders BreadCrumb component', () => {
    render(<BreadCrumb />);
    screen.getByText('Home');
  });
});
