import PropTypes from 'prop-types';
import React from 'react';

import { Grid, Col, Row } from 'react-styled-flexboxgrid-v2';
import { Utils } from '../../../utils/index';

const LEGACY_INTEGRATION = 'false';

const WarehouseName = ({ warehouse }) => (
  <Grid style={{ paddingLeft: '12px' }}>
    <Row style={{ paddingLeft: '0px', justifyContent: 'start' }}>
      <Col
        style={{
          paddingLeft: '0px',
        }}
      >
        {LEGACY_INTEGRATION === 'true' ? (
          <a
            href={`https://www.costco.com/warehouse-locations/${Utils.getSlug(
              warehouse
            )}.html`}
          >
            {Utils.getWarehouseName(warehouse)}
          </a>
        ) : (
          <a href={`/sl/${Utils.getSlug(warehouse)}`}>
            {Utils.getWarehouseName(warehouse)}
          </a>
        )}
      </Col>
      <Col style={{ paddingLeft: '0px' }}>
        (
        {Utils.getDistance(warehouse)}
        {' '}
        {Utils.getMeasure(warehouse)}
        )
      </Col>
    </Row>
  </Grid>
);

WarehouseName.propTypes = {
  warehouse: PropTypes.shape({}).isRequired,
};

export default WarehouseName;
