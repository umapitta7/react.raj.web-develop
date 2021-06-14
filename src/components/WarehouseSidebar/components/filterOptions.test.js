import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import FilterOptions from './filterOptions';

describe('FilterOptions test', () => {
  let visibility;
  let setVisibility;
  let setFilter;
  beforeEach(() => {
    visibility = false;
    setVisibility = jest.fn((value) => {
      visibility = value;
    });
    setFilter = jest.fn(() => {
      // let filter = value; // TODO: Need to work through invoking this method...
    });
  });

  it('Component renders but not visible', () => {
    const { getByText, queryByText } = render(
      <FilterOptions
        visibility={visibility}
        setVisibility={setVisibility}
        setFilter={setFilter}
      />
    );

    expect(getByText('Show Filter Options')).toBeInTheDocument();
    expect(queryByText('Gas Station')).not.toBeInTheDocument();
  });

  it('Component renders, made visible, make it not visiable', async () => {
    const { getByText, queryByText, rerender } = render(
      <FilterOptions
        visibility={visibility}
        setVisibility={setVisibility}
        setFilter={setFilter}
      />
    );

    let element = getByText('Show Filter Options');
    fireEvent.click(element);
    await waitFor(() => {
      expect(setVisibility).toHaveBeenCalledTimes(1);
    });

    rerender(
      <FilterOptions
        visibility={visibility}
        setVisibility={setVisibility}
        setFilter={setFilter}
      />
    );

    expect(getByText('Hide Filter Options')).toBeInTheDocument();
    expect(queryByText('Gas Station')).toBeInTheDocument();
    expect(queryByText('Tire Center')).toBeInTheDocument();
    expect(queryByText('Food Court')).toBeInTheDocument();
    expect(queryByText('Hearing Aids')).toBeInTheDocument();
    expect(queryByText('Optical')).toBeInTheDocument();
    expect(queryByText('Pharmacy')).toBeInTheDocument();

    element = getByText('Gas Station');
    fireEvent.click(element);

    await waitFor(() => {
      expect(setFilter).toHaveBeenCalledTimes(1);
    });

    element = getByText('Gas Station');
    fireEvent.click(element);

    await waitFor(() => {
      expect(setFilter).toHaveBeenCalledTimes(2);
    });

    element = getByText('Hide Filter Options');
    fireEvent.click(element);

    await waitFor(() => {
      expect(setVisibility).toHaveBeenCalledTimes(2);
    });

    rerender(
      <FilterOptions
        visibility={visibility}
        setVisibility={setVisibility}
        setFilter={setFilter}
      />
    );

    expect(getByText('Show Filter Options')).toBeInTheDocument();
    expect(queryByText('Gas Station')).not.toBeInTheDocument();
  });
});
