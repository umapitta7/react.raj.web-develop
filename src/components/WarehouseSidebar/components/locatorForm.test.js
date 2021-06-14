import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import LocatorForm from './locatorForm';

describe('LocatorForm test', () => {
  const userLocation = {
    latitude: 47.564661,
    longitude: -122.32941,
  };
  let searchForWarehouses;
  const filter = {};
  let setFilter;
  beforeAll(() => {
    searchForWarehouses = () => {};
    setFilter = () => {};
  });

  test('Renders properly', () => {
    const { getByText } = render(
      <LocatorForm
        location={userLocation}
        searchForWarehouses={searchForWarehouses}
        filter={filter}
        setFilter={setFilter}
      />
    );

    expect(getByText('Find')).toBeInTheDocument();
  });

  test('Functions properly - onChangeEvent', async () => {
    const { getByPlaceholderText } = render(
      <LocatorForm
        location={userLocation}
        searchForWarehouses={searchForWarehouses}
        filter={filter}
        setFilter={setFilter}
      />
    );

    expect(getByPlaceholderText('City, State or Zip')).toBeInTheDocument();

    userEvent.type(getByPlaceholderText('City, State or Zip'), 'S');
    await waitFor(() => {
      expect(
        getByPlaceholderText('City, State or Zip').value === 'S'
      ).toBeTruthy();
    });
  });

  test('Updates based on selection - onChangeEvent and handleSubmit', async () => {
    const { getByPlaceholderText } = render(
      <LocatorForm
        location={userLocation}
        searchForWarehouses={searchForWarehouses}
        filter={filter}
        setFilter={setFilter}
      />
    );

    expect(getByPlaceholderText('City, State or Zip')).toBeInTheDocument();

    userEvent.type(getByPlaceholderText('City, State or Zip'), 'Seat');
    await waitFor(() => {
      expect(getByPlaceholderText('City, State or Zip')).toHaveValue('Seat');
    });
  });

  // TODO: Add test for validation rules as they apply to bad characters.
});
