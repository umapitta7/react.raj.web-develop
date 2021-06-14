import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchField from './searchField';

describe('SearchField test', () => {
  let options;
  let loading;
  let charWidth;
  let label;
  let variant;
  let locationDescription;
  let handleSubmit;

  beforeEach(() => {
    options = [{ name: 'Seattle, Washington' }, { name: 'Portland, Oregon' }];
    loading = false;
    charWidth = 475;
    label = 'City, State or Zip';
    variant = 'outlined';
    locationDescription = '';
    handleSubmit = jest.fn();
  });

  test('Renders properly', () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchField
        options={options}
        loading={loading}
        getOptionSelected={jest.fn()}
        getOptionLabel={jest.fn(() => '')}
        onInputChange={jest.fn()}
        charWidth={charWidth}
        label={label}
        variant={variant}
        value={locationDescription}
        handleSubmit={handleSubmit}
      />
    );

    expect(getByText('Find')).toBeInTheDocument();
    expect(getByPlaceholderText('City, State or Zip')).toBeInTheDocument();
  });

  test('Input is required before clicking Find', async () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchField
        options={options}
        loading={loading}
        getOptionSelected={jest.fn()}
        getOptionLabel={jest.fn(() => '')}
        onInputChange={jest.fn()}
        charWidth={charWidth}
        label={label}
        variant={variant}
        value={locationDescription}
        handleSubmit={handleSubmit}
      />
    );

    const button = getByText('Find');
    await fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    // Focus should be back on the input field and placeholder test should exist.
    expect(getByPlaceholderText('City, State or Zip')).toBeInTheDocument();
  });

  // TODO: Need to finish this test
  test('Selection of location is available after enter zipCode and clicking Find', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <SearchField
        options={options}
        loading={loading}
        getOptionSelected={jest.fn()}
        getOptionLabel={jest.fn(() => '')}
        onInputChange={jest.fn()}
        charWidth={charWidth}
        label={label}
        variant={variant}
        value={locationDescription}
        handleSubmit={handleSubmit}
      />
    );

    /*
    userEvent.type(getByPlaceholderText('City, State or Zip'), 'Port');
    await waitFor(() => {
      expect(getByPlaceholderText('City, State or Zip')).toHaveValue('Port');
    });
    */

    const autocomplete = getByTestId('autocomplete');

    autocomplete.focus();
    // assign value to input field
    userEvent.type(getByPlaceholderText('City, State or Zip'), 'Port');
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });
    const button = getByText('Find');
    fireEvent.click(button);
    // await waitFor(() => {
    //  expect(getByPlaceholderText('City, State or Zip')).toHaveValue('Portland, Oregon');
    // });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    // Focus should be back on the input field and placeholder test should exist.
    // rerender();
    // console.log(autocomplete.value);
    // expect(getByText('Portland, Oregon')).toBeInTheDocument();
  });
});
