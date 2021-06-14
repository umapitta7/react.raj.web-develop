import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import Typography from "@material-ui/core/Typography"
import { Box, Flex } from "reflexbox"
import styled from "styled-components"
import CdsButton from "forge-components/dist/components/Button/"
// import useSkeletonGenerator from "../../customHooks/useSkeletonGenerator"
import WarehouseReceiptModal from "../../components/modal/warehouseReceiptModal"

const StyledWarehouseText = styled.div`
  height: 24px;
  width: 100%;
  color: #333333;
  font-family: "Helvetica Neue";
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 13px;
  margin-right: 321px;
`
const StyledDateTimeText = styled.div`
  height: 20px;
  width: 100%;
  font-family: "Helvetica Neue";
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
`

const StyledTotalText = styled(Box)`
  height: 20px;
  font-family: "Helvetica Neue";
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 20px;
  Flex
  width={1/2}
`

const StyledDollarAmountText = styled(StyledTotalText)`
  font-weight: normal;
  padding-left: 6px;
`
const StyledButton = styled(CdsButton)`
  height: 40px;
  width: 264px !important;
  border-radius: 3px;
  color: #ffffff;
  background-color: #3071a9;
  margin-top: 33px;
  margin-right: 13px;
`

const WarehousePurchase = ({ style }) => {
  const { t } = useTranslation()

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Flex style={{ ...style }} flexDirection="Row">
      <Flex
        style={{
          width: "430px",
          height: "109px",
          marginLeft: "13px",
        }}
        flexDirection="Column"
      >
        <StyledWarehouseText>SE San Diego Warehouse</StyledWarehouseText>
        <StyledDateTimeText>01/172021 - 12:10pm</StyledDateTimeText>
        <Flex flexDirection="Row">
          <StyledTotalText>Total:</StyledTotalText>
          <StyledDollarAmountText>$58.23</StyledDollarAmountText>
        </Flex>
      </Flex>

      <Flex style={{ height: "106px", width: "264px" }} flexDirection="Column">
        <StyledButton
          onClick={() => handleClickOpen()}
          variant="primary-outline"
        >
          <Typography>{t("Warehouse Receipt")}</Typography>
        </StyledButton>
      </Flex>

      <WarehouseReceiptModal open={open} onClose={handleClose} />
    </Flex>
  )
}

export default WarehousePurchase

WarehousePurchase.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
  displayReceipt: PropTypes.func,
}

WarehousePurchase.defaultProps = {}
