import CdsButton from 'forge-components/dist/components/Button/index';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const CdsButtonWrapper = styled(CdsButton)`
  width: 252px;
  height: 44px;
`;

const SetAsMyWarehouse = ({
  city,
  postalCode,
  warehouse,
  preferredWarehouse,
  preferredWarehouseEventHandler,
}) => {
  const { t } = useTranslation();
  const handleEvent = () => {
    const truncatedPostalCode = postalCode.split('-')[0];
    preferredWarehouseEventHandler(city, truncatedPostalCode, warehouse.warehouseId);
  };

  if (warehouse.warehouseId === preferredWarehouse) {
    return null;
  }
  return (
    <CdsButtonWrapper variant="primary-outline" onClick={handleEvent}>
      {t('Set as My Warehouse')}
    </CdsButtonWrapper>
  );
};

export default SetAsMyWarehouse;

SetAsMyWarehouse.propTypes = {
  city: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  warehouse: PropTypes.shape({
    warehouseId: PropTypes.string.isRequired
  }).isRequired,
  preferredWarehouse: PropTypes.string,
  preferredWarehouseEventHandler: PropTypes.func.isRequired,
};

SetAsMyWarehouse.defaultProps = {
  preferredWarehouse: undefined,
};
