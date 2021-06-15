import Text from 'forge-components/dist/components/Text/';
import { useTranslation } from 'react-i18next';
import { Utils } from '../../../../utils';

const Availability = (props) => {
  const { t } = useTranslation();
  const availabilityJson = {
    available: {
      translationKey: 'instock',
      color: '#008000',
    },
    unavailable: {
      translationKey: 'outofstock',
      color: '#d32029',
    },
  };

  const { wareHouseInfo } = props;
  let translationKey = '';
  let color = '';
  const data = availabilityJson[wareHouseInfo.inventory];
  if (!Utils.isEmpty(wareHouseInfo?.inventory) && !Utils.isEmpty(data)) {
    translationKey = data.translationKey;
    color = data.color;
  }

  return (
    <Text as="p" className="bodyText">
      <span style={{ color }}>
        {t(translationKey)}
        {' '}
      </span>
      {t('buyinstore_at_text')}
      {' '}
      {wareHouseInfo?.warehouseName}
    </Text>
  );
};

export default Availability;
