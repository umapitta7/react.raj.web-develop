import './buyInstoreonly.css';
import Text from 'forge-components/dist/components/Text/';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CookieHandler } from '../../../../utils/CookieHandler';
import Availability from './Availability';
import { Utils } from '../../../../utils';

function BuyInStoreOnly(props) {
  const { t } = useTranslation();
  const [wareHouseInfo, setWareHouseInfo] = useState(null);

  /**
   * This click handler is used to handle set My Ware house button click
   * No Arguments padded to this function
   * @returns true if cookie Exists, false otherwise
   */
  const handleSetClick = () => {
    window.wioEventBus.publish('openWarehouseSideBar');
  };

  const handleChnageClick = () => {
    window.wioEventBus.publish('openWarehouseSideBar');
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.wioEventBus.subscribe('notifyVaraintsChange', (data) => {
      let inventory = '';
      inventory = data.inventory;
      init(inventory);
    });

    const init = (inventory) => {
      let wareHouseCookie = CookieHandler.get('WAREHOUSEDELIVERY_WHS');
      if (props.wareHouseCookie) {
        wareHouseCookie = props.wareHouseCookie;
      }
      if (!Utils.isEmpty(wareHouseCookie) && !Utils.isEmpty(wareHouseCookie.nearestWarehouse)
        && !Utils.isEmpty(wareHouseCookie.nearestWarehouse.city) && !Utils.isEmpty(inventory)) {
        setWareHouseInfo({
          warehouseName: wareHouseCookie.nearestWarehouse.city,
          inventory,
        });
      } else {
        setWareHouseInfo({
          warehouseName: '',
          inventory,
        });
      }
    };
    const { buyInStoreOnly } = props;
    const { inventory } = buyInStoreOnly;
    init(inventory);
  }, [props]);

  return (
    <div className="buyinstoreonly">
      <Text variant="t4">{t('buyinstore_header')}</Text>
      {wareHouseInfo?.warehouseName
        ? (
          <>
            <Availability wareHouseInfo={wareHouseInfo} />
            <div><button className="chnagebtn" type="button" onClick={handleChnageClick}>{t('buyinstore_change_Btn')}</button></div>
          </>
        )
        : (
          <>
            <Text as="p" className="bodyText">{t('buyinstore_set_warehouse')}</Text>
            <button className="setbtn" type="button" onClick={handleSetClick}>{t('buyinstore_set_mywarehouse')}</button>
          </>
        )}
    </div>
  );
}
export default BuyInStoreOnly;
