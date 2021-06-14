import React from 'react';
// import PropTypes from "prop-types"
import { useTranslation } from 'react-i18next';
import { Box } from 'reflexbox';
import styled from 'styled-components';

const StyledTitle = styled(Box)`
  height: 32px;
  width: 250px;
  color: #333333;
  font-family: "Helvetica Neue";
  font-size: 28px;
  letter-spacing: 0;
  line-height: 32px;
`;

const PageTitle = ({ style }) => {
  const { t } = useTranslation();

  return (
    <div style={{ ...style }}>
      <StyledTitle>{t('Orders & Purchases')}</StyledTitle>
    </div>
  );
};

export default PageTitle;

PageTitle.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
};

PageTitle.defaultProps = {};
