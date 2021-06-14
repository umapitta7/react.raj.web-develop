import { render } from '@testing-library/react';
import App from './App';

test('header renders with correct text', () => {
  // expect(window.wioEventBus.publish('notifiyVarientsChnage')).toHaveBeenCalledTimes(1);

  const { getByText } = render(<App />);
  expect(getByText('test')).toBeInTheDocument();
});
