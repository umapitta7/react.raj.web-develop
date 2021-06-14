import React from 'react';
import { render, screen } from '@testing-library/react';

import UserInfo from './userInfo';

describe('UserInfo', () => {
  test('renders UserInfo component', () => {
    render(<UserInfo />);
    screen.getByText('Welcome!');
  });
});
