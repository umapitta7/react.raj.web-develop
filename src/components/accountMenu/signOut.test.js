import React from 'react';
import { render, screen } from '@testing-library/react';

import SignOut from './signOut';

describe('SignOut', () => {
  test('renders SignOut component', () => {
    render(<SignOut />);
    screen.getByText('Sign Out');
  });
});
