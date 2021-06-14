import React from "react"
// import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import Typography from "@material-ui/core/Typography"
import { Flex } from "reflexbox"
import styled from "styled-components"
import CdsButton from "forge-components/dist/components/Button/"
import Image from "./image"
// import useSkeletonGenerator from "../../customHooks/useSkeletonGenerator"

const StyledPlacedText = styled.div`
  height: 24px;
  width: 114px;
  color: #333333;
  font-family: "Helvetica Neue";
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 13px;
  margin-left: 13px;
  margin-right: 321px;
`

const StyledButton = styled(CdsButton)`
  height: 40px;
  width: 264px !important;
  border-radius: 3px;
  color: #ffffff;
  background-color: #3071a9;
  margin-top: 12px;
  margin-right: 13px;
`

const OrderPlaced = ({ style }) => {
  const { t } = useTranslation()

  return (
    <Flex style={{ ...style }} flexDirection="Column">
      <Flex style={{ height: "53px" }} flexDirection="Row">
        <StyledPlacedText>{t("Order Placed")}</StyledPlacedText>
        <StyledButton
          onClick={function noRefCheck() {}}
          variant="primary-outline"
        >
          <Typography>{t("Cancel Order")}</Typography>
        </StyledButton>
      </Flex>
      <Flex
        style={{
          height: "53px",
        }}
        flexDirection="Row"
      >
        <Image
          style={{
            width: "40px",
            height: "40px",
            marginLeft: "13px",
            marginBottom: "13px",
          }}
        />
        <Image
          style={{
            width: "40px",
            height: "40px",
            marginBottom: "13px",
            marginLeft: "16px",
          }}
        />
        <Image
          style={{
            width: "40px",
            height: "40px",
            marginBottom: "13px",
            marginLeft: "16px",
          }}
        />
        <Image
          style={{
            width: "40px",
            height: "40px",
            marginBottom: "13px",
            marginLeft: "16px",
          }}
        />
        <Image
          style={{
            width: "40px",
            height: "40px",
            marginBottom: "13px",
            marginLeft: "16px",
          }}
        />
      </Flex>
    </Flex>
  )
}

export default OrderPlaced

OrderPlaced.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
}

OrderPlaced.defaultProps = {}
