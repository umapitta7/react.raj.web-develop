import React from 'react';
import { render, screen } from '@testing-library/react';

import MenuGrid from './menuGrid';

describe('MenuGrid', () => {
  test('renders MenuItem component', () => {
    render(<MenuGrid />);
    screen.getByText('Payment Methods');
  });
});
