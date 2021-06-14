import React from 'react';
// import PropTypes from "prop-types"
import { useTranslation } from 'react-i18next';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

import useSkeletonGenerator from '../../customHooks/useSkeletonGenerator';

const StyledRow1 = styled(Flex)`
  flex-direction: row;
  width: 100%;
  height: 40px;
  // border-style: solid;
  // border-width: thin;
  // border-color: #909090;
`;

const StyledShowing = styled.div`
  height: 20px;
  width: 66px;
  color: #333333;
  font-family: "Helvetica Neue";
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: 10px;
  margin-right: 8px;
  margin-bottom: 10px;
`;

const StyledComboBox = styled(Flex)`
  box-sizing: border-box;
  height: 40px;
  width: 258px;
  border: 1px solid #909090;
  border-radius: 3px;
  background-color: #ffffff;
`;

const StyledComboBoxText = styled.div`
  height: 24px;
  width: 204px;
  color: #5f5f5f;
  font-family: "Helvetica Neue";
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 8px;
  margin-right: 0px;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const StyledIcon = styled.div`
  width: 24px;
  margin-top: 8px;
  margin-left: 7px;
  margin-bottom: 8px;
`;

const StyledRow2 = styled(Flex)`
  flex-direction: row;
  width: 100%;
  height: 66px;
`;

const StyledConfirmationMessage = styled.div`
  height: 20px;
  width: 369px;
  color: #333333;
  font-family: "Helvetica Neue";
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: 12px;
`;

const OrderFilter = ({ style }) => {
  const { t } = useTranslation();

  const Skeleton = useSkeletonGenerator({
    variant: 'rect',
    animation: 'wave',
    width: '24px',
    height: '24px',
  });

  return (
    <div style={{ ...style }}>
      <StyledRow1>
        <StyledShowing>
          {t('Showing')}
          :
        </StyledShowing>
        <StyledComboBox>
          <StyledComboBoxText>{t('Last Six Months')}</StyledComboBoxText>
          <StyledIcon>{Skeleton}</StyledIcon>
        </StyledComboBox>
      </StyledRow1>
      <StyledRow2>
        <StyledConfirmationMessage>
          {t('Your new orders will appear shortly after confirmation')}
          .
        </StyledConfirmationMessage>
      </StyledRow2>
    </div>
  );
  // return <div style={{ ...style }}>{Skeleton}</div>
};

export default OrderFilter;

OrderFilter.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
};

OrderFilter.defaultProps = {};
