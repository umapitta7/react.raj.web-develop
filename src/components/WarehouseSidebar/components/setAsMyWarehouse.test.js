import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SetAsMyWarehouse from './setAsMyWarehouse';

describe('SetAsMyWarehouse test', () => {
  let city;
  let postalCode;
  let warehouse;
  let preferredWarehouse;
  let preferredWarehouseEventHandler;
  beforeAll(() => {
    city = 'Seattle';
    postalCode = '98101';
    warehouse = {
      warehouseId: '1',
    };
    preferredWarehouse = '3';
    preferredWarehouseEventHandler = jest.fn();
  });

  it('Component renders', () => {
    const { getByText } = render(
      <SetAsMyWarehouse
        city={city}
        postalCode={postalCode}
        warehouse={warehouse}
        preferredWarehouse={preferredWarehouse}
        preferredWarehouseEventHandler={preferredWarehouseEventHandler}
      />
    );
    expect(getByText('Set as My Warehouse')).toBeInTheDocument();
  });

  it('Component renders, button hidden', () => {
    const { container } = render(
      <SetAsMyWarehouse
        city={city}
        postalCode={postalCode}
        warehouse={warehouse}
        preferredWarehouse="1"
        preferredWarehouseEventHandler={preferredWarehouseEventHandler}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('Component renders, click button and set preferred warehouse', async () => {
    const { getByText } = render(
      <SetAsMyWarehouse
        city={city}
        postalCode={postalCode}
        warehouse={warehouse}
        preferredWarehouse={preferredWarehouse}
        preferredWarehouseEventHandler={preferredWarehouseEventHandler}
      />
    );
    const button = getByText('Set as My Warehouse');
    fireEvent.click(button);
    expect(preferredWarehouseEventHandler).toHaveBeenCalledTimes(1);
  });
});
