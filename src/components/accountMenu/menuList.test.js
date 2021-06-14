import React from 'react';
import { render, screen } from '@testing-library/react';

import MenuList from './menuList';

describe('MenuList', () => {
  test('renders menuList component', () => {
    render(<MenuList />);
    screen.getByText('Payment Methods');
  });
});
