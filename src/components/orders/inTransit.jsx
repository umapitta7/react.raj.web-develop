import React from "react"
// import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { Box, Flex } from "reflexbox"
import styled from "styled-components"
import CdsButton from "forge-components/dist/components/Button/"
import Image from "./image"

const StyledPlacedText = styled.div`
  height: 24px;
  width: 71px;
  color: #333333;
  font-family: "Helvetica Neue";
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 13px;
  margin-left: 13px;
`

const StyledButton = styled(CdsButton)`
  height: 40px;
  width: 264px !important;
  border-radius: 3px;
  color: #ffffff;
  background-color: #3071a9;
  margin-top: 13px;
  margin-right: 13px;
  margin-left: 363px;
  margin-bottom: 0px;
`

const StyledEstimatedDelivery = styled(Box)`
  height: 20px;
  font-family: "Helvetica Neue";
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
  Flex
  width={1/2}
`

const StyledEstimatedDeliveryDate = styled(StyledEstimatedDelivery)`
  color: #008000;
  font-weight: bold;
  padding-left: 6px;
`

const StyledShippingTerms = styled.div`
  height: 20px;
  width: 100%;
  color: #0060a9;
  font-family: "Helvetica Neue";
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
`

const InTransit = ({ style }) => {
  const { t } = useTranslation()

  return (
    <Flex style={{ ...style }} flexDirection="Column">
      <Flex style={{ height: "53px" }} flexDirection="Row">
        <StyledPlacedText>{t("Shipped")}</StyledPlacedText>
        <StyledButton
          onClick={function noRefCheck() {}}
          variant="primary-outline"
        >
          {t("Cancel Order")}
        </StyledButton>
      </Flex>
      <Flex
        style={{
          width: "100%",
          height: "109px",
          marginLeft: "13px",
        }}
        flexDirection="Column"
      >
        <Flex flexDirection="Row">
          <StyledEstimatedDelivery>
            {t("Estimated Delivery")}
          </StyledEstimatedDelivery>
          <StyledEstimatedDeliveryDate>
            Weekday, Month XX, YYYY
          </StyledEstimatedDeliveryDate>
        </Flex>
        <StyledShippingTerms>{t("Shipping Terms")}</StyledShippingTerms>
        <Flex
          style={{
            height: "53px",
            marginTop: "13px",
            marginBottom: "13px",
          }}
          flexDirection="Row"
        >
          <Image
            style={{
              width: "40px",
              height: "40px",
              marginLeft: "13px",
            }}
          />
          <Image
            style={{
              width: "40px",
              height: "40px",
              marginLeft: "13px",
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default InTransit

InTransit.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
}

InTransit.defaultProps = {}
