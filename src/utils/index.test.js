import '@testing-library/jest-dom/extend-expect';

import { Utils } from './index';

describe('Locator test', () => {
  let warehouse;
  beforeEach(() => {
    warehouse = {
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
  });

  it('formatLng', () => {
    expect(Utils.formatLng('en-US')).toEqual('enUS');
  });

  it('formatLng undefined value', () => {
    expect(Utils.formatLng()).toBeUndefined();
  });

  it('formatLng null value', () => {
    expect(Utils.formatLng(null)).toBeNull();
  });

  it('formatTime', () => {
    expect(Utils.formatTime('10:00:00', 'en-US')).toEqual('10:00 AM');
  });

  it('formatTime fr-CA', () => {
    expect(Utils.formatTime('10:01:00', 'fr-CA')).toEqual('10 h 1 AM');
  });

  it('formatTime fr-CA, 00 minutes', () => {
    expect(Utils.formatTime('10:00:00', 'fr-CA')).toEqual('10 h 0 AM');
  });

  it('formatTime using defaultValue', () => {
    expect(Utils.formatTime('10:00:00')).toEqual('10:00 AM');
  });

  it('formatTime undefined value', () => {
    expect(Utils.formatTime(undefined, 'en-US')).toBeUndefined();
  });

  it('formatTime null value', () => {
    expect(Utils.formatTime(null, 'en-US')).toBeNull();
  });

  it('formatTime undefined fr-CA', () => {
    expect(Utils.formatTime(undefined, 'fr-CA')).toBeUndefined();
  });

  it('formatTime null fr-CA', () => {
    expect(Utils.formatTime(null, 'fr-CA')).toBeNull();
  });

  it('getPinNumber', () => {
    warehouse.pinNumber = '1';
    expect(Utils.getPinNumber(warehouse)).toEqual('1');
  });

  it('getPinNumber missing pin number', () => {
    expect(Utils.getPinNumber(warehouse)).not.toEqual('1');
    expect(Utils.getPinNumber(warehouse)).toBeUndefined();
  });

  it('getWarehouseId', () => {
    expect(Utils.getWarehouseId(warehouse)).toEqual('1');
  });

  it('getWarehouseName', () => {
    expect(Utils.getWarehouseName(warehouse)).toEqual('Seattle');
  });

  it('getSlug', () => {
    expect(Utils.getSlug(warehouse)).toEqual('seattle-wa-1');
  });

  it('getDistance', () => {
    expect(Utils.getDistance(warehouse)).toEqual('0.00');
  });

  it('getMeasure', () => {
    expect(Utils.getMeasure(warehouse)).toEqual('mi');
  });

  it('getWarehouseHours', () => {
    let hours = Utils.getWarehouseHours(warehouse, 'Mon-Fri');
    expect(hours.open).toEqual('10:00:00');
    expect(hours.close).toEqual('20:30:00');
    hours = Utils.getWarehouseHours(warehouse, 'Sat');
    expect(hours.open).toEqual('09:30:00');
    expect(hours.close).toEqual('18:00:00');
    hours = Utils.getWarehouseHours(warehouse, 'Sun');
    expect(hours.open).toEqual('10:00:00');
    expect(hours.close).toEqual('18:00:00');
  });

  it('getWarehouseHours missing hours', () => {
    expect(Utils.getWarehouseHours(warehouse, 'Everyday')).toBeUndefined();
  });

  it('hasGas', () => {
    expect(Utils.hasGas(warehouse) === true).toBeTruthy();
  });
  it('hasTires', () => {
    expect(Utils.hasTires(warehouse) === true).toBeTruthy();
  });
  it('hasFood', () => {
    expect(Utils.hasFood(warehouse) === true).toBeTruthy();
  });
  it('hasHearing', () => {
    expect(Utils.hasHearing(warehouse) === true).toBeTruthy();
  });
  it('hasOptical', () => {
    expect(Utils.hasOptical(warehouse) === true).toBeTruthy();
  });
  it('hasPharmacy', () => {
    expect(Utils.hasPharmacy(warehouse) === true).toBeTruthy();
  });
  it('isObjectEmpty', () => {
    expect(Utils.isObjectEmpty({}) === true).toBeTruthy();
  });
  it('getDeviceWidth', () => {
    expect(Utils.getDeviceWidth() === 0).toBeTruthy();
  });
});
