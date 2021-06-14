import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';

import { Utils } from '../../../utils';

const LEGACY_INTEGRATION = 'false';

const StoreDetails = ({ warehouse }) => {
  const { t } = useTranslation();

  if (LEGACY_INTEGRATION === 'true') {
    return (
      <>
        <a
          style={{ textDecoration: 'none' }}
          href={`https://www.costco.com/warehouse-locations/${Utils.getSlug(
            warehouse
          )}.html`}
        >
          {t('Store Details')}
        </a>
      </>
    );
  }

  return (
    <>
      <a style={{ textDecoration: 'none' }} href={`/sl/${Utils.getSlug(warehouse)}`}>{t('Store Details')}</a>
    </>
  );
};

StoreDetails.propTypes = {
  warehouse: PropTypes.shape({}).isRequired,
};

export default StoreDetails;
