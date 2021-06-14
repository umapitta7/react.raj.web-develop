import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FontWeightDefault
} from 'cds-tokens/dist/js/cds-variables';
import { Grid, Col, Row } from 'react-styled-flexboxgrid-v2';

const Address = ({
  warehouse, displayHeader, includePhone, style
}) => {
  const { t } = useTranslation();
  return (
    <Grid style={{ ...style }}>
      {displayHeader && <h2 style={{ fontWeight: FontWeightDefault }}>{t('Address')}</h2>}
      {includePhone ? (
        <Col>
          <Row>{warehouse.address.line1}</Row>
          <Row>
            {`${warehouse.address.city} ${warehouse.address.territory} ${warehouse.address.postalCode}`}
          </Row>
          <Row>{warehouse.phone}</Row>
        </Col>
      ) : (
        <Col style={{ ...style }}>
          <Row>{warehouse.address.line1}</Row>
          <Row>{`${warehouse.address.city} ${warehouse.address.territory}`}</Row>
          <Row>{warehouse.address.postalCode}</Row>
        </Col>
      )}
    </Grid>
  );
};

export default Address;

Address.propTypes = {
  warehouse: PropTypes.shape({
    address: PropTypes.shape({
      line1: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      territory: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
    }).isRequired,
    phone: PropTypes.string,
  }).isRequired,
  displayHeader: PropTypes.bool,
  includePhone: PropTypes.bool,
  style: PropTypes.shape({}),
};
Address.defaultProps = {
  displayHeader: true,
  includePhone: true,
  style: {},
};
