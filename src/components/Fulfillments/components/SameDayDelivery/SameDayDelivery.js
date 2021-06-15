import React from 'react';
import './samedaydelivery.css';
import { useTranslation } from 'react-i18next';
import Text from 'forge-components/dist/components/Text/';
import CsdButton from 'forge-components/dist/components/Button/';
import instaCart from '../../../../assets/instacart.svg';
import { environment } from '../../../../config/environment';
import { CookieHandler } from '../../../../utils/CookieHandler';
import { Utils } from '../../../../utils';

function SameDayDelivery(props) {
  const { t } = useTranslation();
  const formUrl = () => {
    const { sameDayDelivery } = props;
    const wareHouseCookie = CookieHandler.get('WAREHOUSEDELIVERY_WHS');
    // eslint-disable-next-line max-len
    const shipToLocation = !Utils.isEmpty(wareHouseCookie?.shipToLocation) ? wareHouseCookie.shipToLocation : CookieHandler.get('invCheckPostalCode');
    const pageName = 'pdp';
    let shortDes = sameDayDelivery.shortDes.replace(/\./g, '%2E');
    shortDes = Utils.encodeUri(shortDes);
    const finalurl = `${environment.api.sameDayDeliveryUrl}store/costco/search_v3/${shortDes}?zipcode=${shipToLocation}&amp;utm_source=${pageName}`;
    Utils.pageRedirection(finalurl);
  };

  return (
    <div className="buyinstoreonly">
      <Text variant="t4">{t('samedaydelivery_header')}</Text>
      <div className="instacartimg"><img src={instaCart} alt="instacart" /></div>
      <Text as="p" className="bodyText1">{t('samedaydelivery_price_availability')}</Text>
      <div className="btnalign"><CsdButton onClick={formUrl} variant="primary-alternate">{t('samedaydelivery_btn')}</CsdButton></div>
    </div>
  );
}

export default SameDayDelivery;
