import { render } from '@testing-library/react';
import React from 'react';

import Warehouses from './warehouses';

const warehouse = {
  warehouseId: '1',
  name: [
    {
      value: 'Seattle',
      localeCode: 'en-US',
    },
  ],
  distance: 0.00008351751223024175,
  distanceUnit: 'mi',
  type: {
    code: 'Warehouse',
    name: [
      {
        value: 'Warehouse',
        localeCode: 'en-US',
      },
    ],
  },
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
  timeZone: 'America/Los_Angeles',
  hours: [
    {
      title: [
        {
          value: 'Mon-Fri',
          localeCode: 'en-US',
        },
      ],
      weekDays: [2, 3, 4, 5, 6],
      hoursType: {
        code: 'open',
        name: [
          {
            value: 'open',
            localeCode: 'en-US',
          },
        ],
      },
      open: '10:00:00',
      close: '20:30:00',
    },
    {
      title: [
        {
          value: 'Sat',
          localeCode: 'en-US',
        },
      ],
      weekDays: [7],
      hoursType: {
        code: 'open',
        name: [
          {
            value: 'open',
            localeCode: 'en-US',
          },
        ],
      },
      open: '09:30:00',
      close: '18:00:00',
    },
    {
      title: [
        {
          value: 'Sun',
          localeCode: 'en-US',
        },
      ],
      weekDays: [1],
      hoursType: {
        code: 'open',
        name: [
          {
            value: 'open',
            localeCode: 'en-US',
          },
        ],
      },
      open: '10:00:00',
      close: '18:00:00',
    },
  ],
  services: [
    {
      code: 'food',
      name: [
        {
          value: 'Food Court',
          localeCode: 'en-US',
        },
      ],
      phone: '(206) 403-2005',
    },
    {
      code: 'gas',
      name: [
        {
          value: 'Gas Station',
          localeCode: 'en-US',
        },
      ],
      hours: [
        {
          title: [
            {
              value: 'Mon-Fri',
              localeCode: 'en-US',
            },
          ],
          weekDays: [2, 3, 4, 5, 6],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '06:00:00',
          close: '21:30:00',
        },
        {
          title: [
            {
              value: 'Sat',
              localeCode: 'en-US',
            },
          ],
          weekDays: [7],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '07:00:00',
          close: '19:00:00',
        },
        {
          title: [
            {
              value: 'Sun',
              localeCode: 'en-US',
            },
          ],
          weekDays: [1],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '07:00:00',
          close: '19:00:00',
        },
      ],
    },
    {
      code: 'hearing',
      name: [
        {
          value: 'Hearing Aids',
          localeCode: 'en-US',
        },
      ],
      phone: '(206) 674-1231',
    },
    {
      code: 'optical',
      name: [
        {
          value: 'Optical Department',
          localeCode: 'en-US',
        },
      ],
      phone: '(206) 682-8366',
    },
    {
      id: '4919835',
      code: 'pharmacy',
      name: [
        {
          value: 'Pharmacy',
          localeCode: 'en-US',
        },
      ],
      phone: '(206) 682-6244',
      hours: [
        {
          title: [
            {
              value: 'Mon-Fri',
              localeCode: 'en-US',
            },
          ],
          weekDays: [2, 3, 4, 5, 6],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '10:00:00',
          close: '20:30:00',
        },
        {
          title: [
            {
              value: 'Sat',
              localeCode: 'en-US',
            },
          ],
          weekDays: [7],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '09:30:00',
          close: '18:00:00',
        },
        {
          title: [
            {
              value: 'Sun',
              localeCode: 'en-US',
            },
          ],
          weekDays: [1],
          hoursType: {
            code: 'close',
            name: [
              {
                value: 'close',
                localeCode: 'en-US',
              },
            ],
          },
          open: '00:00:00',
          close: '00:00:00',
        },
      ],
    },
    {
      code: 'auto',
      name: [
        {
          value: 'Tire Service Center',
          localeCode: 'en-US',
        },
      ],
      phone: '(206) 403-2004',
      hours: [
        {
          title: [
            {
              value: 'Mon-Fri',
              localeCode: 'en-US',
            },
          ],
          weekDays: [2, 3, 4, 5, 6],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '10:00:00',
          close: '20:30:00',
        },
        {
          title: [
            {
              value: 'Sat',
              localeCode: 'en-US',
            },
          ],
          weekDays: [7],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '09:30:00',
          close: '18:00:00',
        },
        {
          title: [
            {
              value: 'Sun',
              localeCode: 'en-US',
            },
          ],
          weekDays: [1],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '10:00:00',
          close: '18:00:00',
        },
      ],
    },
    {
      code: 'photo',
      name: [
        {
          value: 'Photo Center',
          localeCode: 'en-US',
        },
      ],
      phone: '(206) 403-2006',
    },
    {
      code: 'carwash',
      name: [
        {
          value: 'Car Wash',
          localeCode: 'en-US',
        },
      ],
      hours: [
        {
          title: [
            {
              value: 'Mon-Fri',
              localeCode: 'en-US',
            },
          ],
          weekDays: [2, 3, 4, 5, 6],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '08:00:00',
          close: '20:00:00',
        },
        {
          title: [
            {
              value: 'Sat',
              localeCode: 'en-US',
            },
          ],
          weekDays: [7],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '08:00:00',
          close: '19:00:00',
        },
        {
          title: [
            {
              value: 'Sun',
              localeCode: 'en-US',
            },
          ],
          weekDays: [1],
          hoursType: {
            code: 'open',
            name: [
              {
                value: 'open',
                localeCode: 'en-US',
              },
            ],
          },
          open: '08:00:00',
          close: '19:00:00',
        },
      ],
    },
  ],
  regionCode: 'NW',
  openingDate: '1983-09-15',
};

describe('Warehouses test', () => {
  let warehouses;
  // let preferredWarehouse;
  let setPreferredWarehouse;
  let loadingWarehouses;
  // let width;
  // let height;
  // let locale;

  beforeAll(() => {
    warehouses = [warehouse];
    setPreferredWarehouse = jest.fn();
    loadingWarehouses = false;
  });

  it('Component renders', () => {
    const { getByText, getByTestId } = render(
      <Warehouses
        warehouses={warehouses}
        loadingWarehouses={loadingWarehouses}
        setPreferredWarehouse={setPreferredWarehouse}
      />
    );
    expect(getByTestId('SvgLocationPin')).toBeInTheDocument();
    expect(getByText('Seattle')).toBeInTheDocument();
    expect(getByText('0.00 mi')).toBeInTheDocument();
    expect(getByText('4401 4TH AVE S')).toBeInTheDocument();
    expect(getByText('SEATTLE WA 98134-2389')).toBeInTheDocument();
    expect(getByText('Get Directions')).toBeInTheDocument();
    expect(getByText('Store Details')).toBeInTheDocument();
    // expect(getByTestId('IconGasStation')).toBeInTheDocument();
    expect(getByText('Set as My Warehouse')).toBeInTheDocument();
  });
});
