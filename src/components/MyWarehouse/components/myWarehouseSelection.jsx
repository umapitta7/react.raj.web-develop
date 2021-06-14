import { useTranslation } from 'react-i18next';
import React from 'react';
import styled from 'styled-components';
import { Row, Grid } from 'react-flexbox-grid';
import MyWarehouseIcon from 'forge-components/dist/components/Icon/svg-icons/LocationPin';
import OpenTill from 'forge-components/dist/components/Surfaces/OpenTill';
import { getInLocal } from '../../../utils/storage';
import agent from '../../../utils/agent';
import useLocation from '../../../customHooks/useLocation';
import { CookieHandler } from '../../../utils/CookieHandler';
import { Utils } from '../../../utils';
import '../MyWarehouseStyles.css';

const SetMyWarehouse = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const StoreHours = styled.div`
    color: #008000;    
    margin-left: 15px;
`;

const getContext = (payload) => {
  if (payload) {
    return payload.context;
  }
  return null;
};

const MyWarehouseSelection = () => {
  const storageKey = 'WAREHOUSEDELIVERY_WHS';

  const { t } = useTranslation();
  const [filter] = React.useState({});
  const [count, setCount] = React.useState(0);
  const [whscookie, setWhscookie] = React.useState(() => CookieHandler.get(storageKey));
  const [prefWarehouse, setprefWarehouse] = React.useState(JSON.parse(getInLocal('preferredWarehouse')));
  const locale = getInLocal('i18nextLng') || 'en-US';

  const loadWarehouses = async ({ location, limit, selectedWarehouse }) => {
    const payload = await agent.getWarehousesByLatLng(
      location.latitude,
      location.longitude,
      filter,
      limit,
      locale
    );
    const context = getContext(payload);
    if (
      context.statusMessage.statusCode === 'Success'
      && payload?.warehouses.length > 0
    ) {
      const updatedWarehouses = new Map();
      payload.warehouses = payload.warehouses.filter(
        (warehouse) => warehouse.regionCode !== 'BD'
      );
      payload.warehouses.forEach((warehouse, idx) => {
        updatedWarehouses.set(warehouse.warehouseId, warehouse);
        if (selectedWarehouse) {
          if (warehouse.warehouseId === selectedWarehouse) {
            setprefWarehouse(warehouse);
          }
        } else if (idx === 0) {
          setCount(count + 1);
          populateWarehouseCookie(warehouse);
          setprefWarehouse(warehouse);
          setWhscookie(CookieHandler.get(storageKey));
        }
      });
    }
  };
  const populateWarehouseCookie = (warehouse) => {
    let cookie;
    if (CookieHandler.cookieExists(storageKey)) {
      cookie = CookieHandler.get(storageKey);
      if (JSON.stringify(cookie).includes('National')) {
        CookieHandler.delete(storageKey);
        cookie = {
          storeLocation: (warehouse.address.postalCode).split('-')[0],
          nearestWarehouse: {
            city: warehouse.address.city,
            catalog: `${warehouse.warehouseId}-wh`,
          },
        };
      } else {
        cookie = {
          storeLocation: (warehouse.address.postalCode).split('-')[0],
          nearestWarehouse: {
            city: warehouse.address.city,
            catalog: `${warehouse.warehouseId}-wh`,
          },
        };
      }
    } else {
      cookie = {
        storeLocation: (warehouse.address.postalCode).split('-')[0],
        nearestWarehouse: {
          city: warehouse.address.city,
          catalog: `${warehouse.warehouseId}-wh`,
        },
      };
    }
    CookieHandler.set(storageKey, JSON.stringify(cookie, Utils.WarehouseJsonOrder));
  };

  const handleKeyUp = (e) => {
    // TODO: Need to flush out and implement
    console.log(e);
  };

  const userLocation = useLocation();
  let selectedWarehouse;

  if (CookieHandler.cookieExists(storageKey)) {
    const cookie = CookieHandler.get(storageKey);
    if (cookie.nearestWarehouse && cookie.nearestWarehouse.catalog) {
      const selectedWhs = (cookie.nearestWarehouse.catalog).split('-');
      // eslint-disable-next-line prefer-destructuring
      selectedWarehouse = selectedWhs[0];
    }
  }

  React.useEffect(() => {
    // Have location, then load warehouses.
    if (userLocation) {
      const location = userLocation;
      loadWarehouses({ location, limit: 50, selectedWarehouse });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  const openSideBar = () => {
    window.wioEventBus.publish('openWarehouseSideBar');
  };

  let warehouseCity = null;
  if (whscookie && whscookie.nearestWarehouse && whscookie.nearestWarehouse.city) {
    warehouseCity = Utils.capitalizeFirstLetter(whscookie.nearestWarehouse.city);
  }

  return (
    <Grid
      fluid
      style={{
        paddingLeft: '4px',
        paddingRight: '14px'
      }}
    >
      <Row>
        <div>{t('My Warehouse')}</div>
      </Row>
      <Row className="header-spacing">
        <SetMyWarehouse>
          <MyWarehouseIcon />
          <span
            className="header-link"
            tabIndex="-1"
            role="link"
            onKeyUp={handleKeyUp}
            onClick={() => openSideBar()}
          >
            {count > 0 || warehouseCity
              ? warehouseCity
              : t('Set My Warehouse')}
          </span>
        </SetMyWarehouse>
      </Row>
      <Row>
        <StoreHours>
          {prefWarehouse
            ? (
              <OpenTill
                message={t('Open until')}
                closingTime={Utils.openTill(prefWarehouse)}
                formatTime={Utils.formatTime}
                locale={locale}
                style={{
                  fontSize: '12px',
                  lineHeight: '20px'
                }}
              />
            ) : null }
        </StoreHours>
      </Row>
    </Grid>
  );
};

export default MyWarehouseSelection;
