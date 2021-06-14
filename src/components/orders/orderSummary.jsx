import React from "react"
// import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import Typography from "@material-ui/core/Typography"
import { Flex } from "reflexbox"
import styled from "styled-components"
import CdsButton from "forge-components/dist/components/Button/"

// import useSkeletonGenerator from "../../customHooks/useSkeletonGenerator"

const StyledOrderNumber = styled.div`
  height: 24px;
  width: 88px;
  color: #0060a9;
  font-family: "Helvetica Neue";
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 13px;
  margin-left: 12px;
  margin-right: 45px;
  margin-bottom: 29px;
`

const StyledOrderDate = styled.div`
  height: 24px;
  width: 103px;
  color: #333333;
  font-family: "Helvetica Neue";
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 13px;
  margin-right: 36px;
  margin-bottom: 29px;
`

const StyledOrderTotal = styled.div`
  height: 24px;
  width: 37px;
  color: #333333;
  font-family: "Helvetica Neue";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 13px;
  margin-right: 7px;
  margin-bottom: 29px;
`
const StyledOrderTotalAmount = styled.div`
  height: 24px;
  width: 50px;
  color: #333333;
  font-family: "Helvetica Neue";
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 13px;
  margin-right: 72px;
  margin-bottom: 29px;
`

const StyledButton = styled(CdsButton)`
  height: 40px;
  width: 264px !important;
  border: 1px solid #3071a9;
  border-radius: 3px;
  background-color: #ffffff;
  margin-top: 13px;
  margin-right: 12px;
  margin-bottom: 13px;
`

const OrderSummary = ({ style }) => {
  const { t } = useTranslation()
  /*
  const Skeleton = useSkeletonGenerator({
    variant: "rect",
    animation: "wave",
    width: "724px",
    height: "66px",
  })
  */

  return (
    <Flex style={{ ...style }} flexDirection="Row">
      <StyledOrderNumber>XXXXXXXXX</StyledOrderNumber>
      <StyledOrderDate>
        <Typography>MM/DD/YYYY</Typography>
      </StyledOrderDate>
      <StyledOrderTotal>
        <Typography>Total</Typography>
      </StyledOrderTotal>
      <StyledOrderTotalAmount>
        <Typography>$X.XX</Typography>
      </StyledOrderTotalAmount>
      <StyledButton
        onClick={function noRefCheck() {}}
        variant="primary-outline"
      >
        <Typography>{t("View Order Details")}</Typography>
      </StyledButton>
    </Flex>
  )
}

export default OrderSummary

OrderSummary.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
}

OrderSummary.defaultProps = {}
