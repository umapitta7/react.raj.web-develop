import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import Address from './address';

describe('Address test', () => {
  let warehouse;
  beforeAll(() => {
    warehouse = {
      warehouseId: '1',
      name: [
        {
          value: 'Seattle',
          localeCode: 'en-US',
        },
      ],
      address: {
        line1: '4401 4TH AVE S',
        city: 'SEATTLE',
        territory: 'WA',
        postalCode: '98134-2389',
        countryName: 'US',
        latitude: 47.564661,
        longitude: -122.32941,
        geoText: '47.564661, -122.329410 WGS84',
      },
      phone: '(206) 622-3136',
    };
  });

  it('Component renders', () => {
    const { getByText } = render(<Address warehouse={warehouse} />);
    expect(getByText('Address')).toBeInTheDocument();
    expect(getByText('4401 4TH AVE S')).toBeInTheDocument();
    expect(getByText('SEATTLE WA 98134-2389')).toBeInTheDocument();
    expect(getByText('(206) 622-3136')).toBeInTheDocument();
  });

  it('Component renders without header', () => {
    const { queryByText } = render(
      <Address warehouse={warehouse} displayHeader={false} />
    );
    expect(queryByText('Address')).not.toBeInTheDocument();
  });

  it('Component renders without phone number', () => {
    const { queryByText } = render(
      <Address warehouse={warehouse} includePhone={false} />
    );
    expect(queryByText('(206) 622-3136')).not.toBeInTheDocument();
  });
});
