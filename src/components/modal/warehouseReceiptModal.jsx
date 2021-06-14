import React from "react"
import PropTypes from "prop-types"
import '../../translations/language';
import { useTranslation } from "react-i18next"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Flex, Box } from "reflexbox"
// import { Grid, Col, Row } from "react-styled-flexboxgrid-v2"
import { SvgIcon as MaterialSvgIcon } from "@material-ui/core"
import { space, color } from "styled-system"
import Dialog from "@material-ui/core/Dialog"
import IconX from "forge-components/dist/components/Icon/svg-icons/X"
import styled from "styled-components"
import { useBarcode } from "react-barcodes"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import DialogContent from "@material-ui/core/DialogContent"
import CostcoLogo from "./costco-logo.svg"

import { ColorWhite, FontWeightDefault } from "cds-tokens/dist/js/cds-variables"
import CdsButton from "forge-components/dist/components/Button/"
import Text from "forge-components/dist/components/Text"

const StyledModalContent = styled.div`
  width: 375px;
  height: 500px;
  background-color: #fff;
`

const StyledModalHeader = styled.div`
  height: 52px;
  width: 375px;
  background-color: #3071a9;
  color: #fff;
`
const ButtonLink = styled.button`
  background: none !important;
  border: none;
  padding: 0 !important;
  font-family: arial, sans-serif;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
`

const StyledLogo = styled.img`
  width: 100%;
  fill: black;
  text-align: center;
  filter: grayscale(100%);
`

const StyledText = styled(Text)`
  color: #000;
  font-weight: regular;
  font-family: monospace;
`

const StyledButton = styled(CdsButton)`
  height: 40px;
  width: 100% !important;
  border-radius: 3px;
  color: #ffffff;
  background-color: #3071a9;
  margin-top: 33px;
`

const SvgIcon = styled(MaterialSvgIcon)`
  ${space}
  ${color}
`

const IconLabel = svg => (
  <SvgIcon
    style={{
      color: ColorWhite,
      width: "16px",
      height: "auto",
      cursor: "pointer",
      textShadow: `0 1px 0 ${ColorWhite}`,
    }}
  >
    {svg}
  </SvgIcon>
)

const StyledDialogContent = withStyles({
  root: {
    '&[class*="MuiDialogContent-root"]': {
      padding: "0px !important",
    },
  },
})(DialogContent)

const StyledTableCell = withStyles({
  root: {
    paddingTop: "0px",
    paddingBottom: "0px",
    borderBottom: "none",
  },
})(TableCell)

/* TODO: Remove code to generate sample data */
function createData(code, sku, name, price) {
  return {
    sku,
    code,
    name,
    price,
  }
}

const data = [
  createData("E", 8121, "Frozen yoghurt", 5.89),
  createData("E", 2323, "Ice cream sandwich", 2.99),
  createData("E", 1312, "Eclair", 2.62, 16),
  createData("E", 23323, "Cupcake", 4.3),
  createData("E", 74323, "Gingerbread", 3.9),
]
/* TODO: Remove code to generate sample data */

const useStyles = makeStyles({
  table: {
    minWidth: 10,
  },
  tableContainer: {
    boxShadow: "none",
  },
  tableHeader: {
    border: "none",
  },
  tableRow: {
    fontWeight: "bold",
    color: "red",
  },
})

const ReceiptDivider = ({ key, align, colSpan }) => (
  <TableRow key={key}>
    <StyledTableCell align={align} colSpan={colSpan}>
      <StyledText>- - - - - - - - - - - - - - - - - - - -</StyledText>
    </StyledTableCell>
  </TableRow>
)

// Component could be sourced from forge
const BarCode = ({ value, options, style, alt }) => {
  const { inputRef } = useBarcode({
    value,
    options,
  })

  return <img ref={inputRef} style={{ ...style, width: "100%" }} alt={alt} />
}

const transactionData = {
  documentType: "WarehouseReceipt",
  membercardnumber: 111895986235,
  Transaction: {
    transactionDate: "6/3/2021",
    transactionTimestamp: "6/3/2021 19:20",
    companyNumber: 1,
    warehouseNumber: "110",
    warehouseName: "Isaaquah",
    warehouseShortName: "Isaaquah",
    registerNumber: 5,
    transactionNumber: 202,
    transactionType: "Sales",
    transactionBarcode: "21011000801142104190930",
    total: 85.6,
  },
}

const WarehouseReceiptModal = ({
  onClose,
  open /* transactionData, warehouseDetails */,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const { membercardnumber, Transaction } = transactionData
  const {
    transactionDate, // Not used
    transactionTimestamp,
    companyNumber, // Not used
    warehouseNumber,
    warehouseName,
    warehouseShortName, // Not used
    registerNumber,
    transactionNumber,
    transactionType,
    transactionBarcode,
    total,
  } = Transaction

  const handleClose = () => {
    onClose()
  }

  const purchase = transactionType === "Sales"

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <StyledDialogContent>
          <StyledModalHeader>
            <Flex p="16px" style={{ height: "52px" }}>
              <Box width={15 / 16} style={{ height: "20px" }}>
                <Text variant="t5" style={{ fontWeight: FontWeightDefault }}>
                  In-Warehouse Receipt
                </Text>
              </Box>
              <Box width={1 / 16}>
                <ButtonLink onClick={handleClose}>
                  {IconLabel(<IconX />)}
                </ButtonLink>
              </Box>
            </Flex>
          </StyledModalHeader>

          <StyledModalContent>
            <Flex
              justifyContent="center"
              style={{ marginTop: "48px", marginBottom: "24px" }}
            >
              <Box
                style={{
                  width: "208px",
                }}
              >
                <StyledLogo src={CostcoLogo} alt="Costco Logo" />
              </Box>
            </Flex>
            <StyledText
              variant="t5"
              style={{ textAlign: "center", fontWeight: "600" }}
            >
              {warehouseName} #{warehouseNumber}
            </StyledText>
            <StyledText
              variant="t5"
              style={{ textAlign: "center", fontWeight: "400" }}
            >
              650 Gateway Center Dr
            </StyledText>
            <StyledText
              variant="t5"
              style={{ textAlign: "center", fontWeight: "400" }}
            >
              San Diego, CA 92102-4530
            </StyledText>
            <StyledText
              variant="t5"
              style={{ textAlign: "center", fontWeight: "400" }}
            >
              (650) 988-1841
            </StyledText>

            <BarCode
              value={transactionBarcode}
              options={{
                width: 2,
                height: 65,
                background: ColorWhite,
                fontSize: 14,
                marginLeft: 32,
                marginRight: 32,
                marginTop: 32,
              }}
              alt={transactionBarcode}
            />

            <TableContainer className={classes.tableContainer}>
              <Table
                className={classes.table}
                size="small"
                aria-label="simple table"
              >
                <TableHead className={classes.tableHeader}>
                  <TableRow
                    className={classes.tableRow}
                    style={{ color: "red" }}
                  >
                    <StyledTableCell align="left" colSpan={4}>
                      <StyledText>Member {membercardnumber}</StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(row => (
                    <TableRow key={row.name}>
                      <StyledTableCell align="left">
                        <StyledText>{row.code}</StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <StyledText>{row.sku}</StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="left" colSpan={2}>
                        <StyledText>{row.name.substring(0, 11)}</StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <StyledText>{row.price}</StyledText>
                      </StyledTableCell>
                    </TableRow>
                  ))}

                  <TableRow key="Subtotal">
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="left" colSpan={2}>
                      <StyledText>SUBTOTAL</StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <StyledText>109.99</StyledText>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow key="Tax1">
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="left" colSpan={2}>
                      <StyledText>TAX</StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <StyledText>22.95</StyledText>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow key="Total">
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="right">
                      <StyledText>****</StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="left" colSpan={2}>
                      <StyledText>TOTAL</StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <span
                        style={{
                          fontWeight: "regular",
                          fontFamily: "monospace",
                          backgroundColor: "#000",
                          color: "#FFFFFF",
                        }}
                      >
                        {total.toFixed(2)}
                      </span>
                    </StyledTableCell>
                  </TableRow>

                  <ReceiptDivider
                    key="ReceiptDivider1"
                    align="left"
                    colSpan={5}
                  />

                  <TableRow key="Card">
                    <StyledTableCell align="left" colSpan={3}>
                      <StyledText>XXXXXXXXXXXXX1234</StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="right" colSpan={2}>
                      <StyledText>CHIP read</StyledText>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow key="PurchaseApproval">
                    <StyledTableCell align="left" colSpan={3}>
                      <StyledText>APPROVED - PURCHASE</StyledText>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      colSpan={2}
                    ></StyledTableCell>
                  </TableRow>
                  <TableRow key="ChargedAmount">
                    <StyledTableCell align="left" colSpan={3}>
                      <StyledText>AMOUNT: ${total.toFixed(2)}</StyledText>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      colSpan={2}
                    ></StyledTableCell>
                  </TableRow>
                  <TableRow key="DateTimestamp1">
                    <StyledTableCell align="left" colSpan={4}>
                      <StyledText>
                        {transactionTimestamp} 143 11 72 50
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      colSpan={1}
                    ></StyledTableCell>
                  </TableRow>

                  {purchase ? (
                    <>
                      <TableRow key="CardApproved">
                        <StyledTableCell align="left" colSpan={2}>
                          <StyledText>Visa</StyledText>
                        </StyledTableCell>
                        <StyledTableCell align="right" colSpan={3}>
                          <StyledText>{total.toFixed(2)}</StyledText>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow key="Change">
                        <StyledTableCell align="left" colSpan={2}>
                          <StyledText>Change</StyledText>
                        </StyledTableCell>
                        <StyledTableCell align="right" colSpan={3}>
                          <StyledText>0.00</StyledText>
                        </StyledTableCell>
                      </TableRow>
                      <ReceiptDivider
                        key="ReceiptDivider2"
                        align="left"
                        colSpan={5}
                      />
                    </>
                  ) : (
                    <>
                      <ReceiptDivider
                        key="ReceiptDivider2"
                        align="left"
                        colSpan={5}
                      />
                      <TableRow key="CardApproved">
                        <StyledTableCell align="left">
                          <StyledText>RF</StyledText>
                        </StyledTableCell>
                        <StyledTableCell align="left" colSpan={2}>
                          <StyledText>Visa</StyledText>
                        </StyledTableCell>
                        <StyledTableCell align="right" colSpan={2}>
                          <StyledText>{total.toFixed(2)}</StyledText>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow key="Change">
                        <StyledTableCell align="left"></StyledTableCell>
                        <StyledTableCell align="left" colSpan={2}>
                          <StyledText>Change</StyledText>
                        </StyledTableCell>
                        <StyledTableCell align="right" colSpan={2}>
                          <StyledText>0.00</StyledText>
                        </StyledTableCell>
                      </TableRow>
                    </>
                  )}

                  <TableRow key="Tax2">
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="left" colSpan={2}>
                      <StyledText>A 10.25% Tax</StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="right" colSpan={2}>
                      <StyledText>0.00</StyledText>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow key="TaxAmount">
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="left" colSpan={2}>
                      <StyledText>Total Tax</StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="right" colSpan={2}>
                      <StyledText>0.00</StyledText>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow key="NumberOfItems">
                    <StyledTableCell align="left" colSpan={5}>
                      <StyledText>TOTAL NUMBER OF ITEMS SOLD = 7</StyledText>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow key="InstantSavings">
                    <StyledTableCell align="left" colSpan={3}>
                      <StyledText>INSTANT SAVINGS</StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="right" colSpan={2}>
                      <StyledText>$9.89</StyledText>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow key="DateTimestamp2">
                    <StyledTableCell align="left" colSpan={4}>
                      <span
                        style={{
                          fontWeight: "regular",
                          fontFamily: "monospace",
                          backgroundColor: "#000",
                          color: "#FFFFFF",
                        }}
                      >
                        {transactionTimestamp.split(" ")[0]}
                      </span>{" "}
                      <span
                        style={{
                          fontWeight: "regular",
                          fontFamily: "monospace",
                        }}
                      >
                        {transactionTimestamp.split(" ")[1]} 143 11 72 50
                      </span>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      colSpan={1}
                    ></StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Flex
              flexDirection="column"
              style={{ marginTop: "24px", marginBottom: "24px" }}
            >
              <Box>
                <StyledText
                  variant="t5"
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                  }}
                >
                  Thank You!
                </StyledText>
              </Box>
              <Box style={{ marginTop: "12px"}}>
                <StyledText
                  variant="t5"
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                  }}
                >
                  Please Come Again
                </StyledText>
              </Box>
            </Flex>
            <Flex
              flexDirection="row"
              justifyContent="space-evenly"
              style={{ marginTop: "24px", marginBottom: "24px" }}
            >
              <Box sx={{ paddingLeft: "16px" }}>
                <StyledText>Whse: 483</StyledText>
              </Box>
              <Box>
                <StyledText>Trm: {registerNumber}</StyledText>
              </Box>
              <Box>
                <StyledText>Trn: {transactionNumber}</StyledText>
              </Box>
              <Box sx={{ paddingRight: "16px" }}>
                <StyledText>OPT: 5</StyledText>
              </Box>
            </Flex>
            <Flex>
              <Box sx={{ paddingLeft: "16px" }}>
                <StyledText variant="t4">Items Sold: 7</StyledText>
              </Box>
            </Flex>
            <Flex>
              <Box sx={{ paddingLeft: "16px" }}>
                <StyledText variant="t4">P7 {transactionTimestamp}</StyledText>
              </Box>
            </Flex>
            <Flex style={{ padding: "16px", paddingTop: "24px", paddingBottom: "24px" }} flexDirection="Column">
              <StyledButton
                style={{ marginTop: "0px", shadow: "outer" }}
                onClick={() => handleClose()}
                variant="primary-outline"
              >
                <Typography>{t("Close")}</Typography>
              </StyledButton>
            </Flex>
          </StyledModalContent>
        </StyledDialogContent>
      </Dialog>
    </div>
  )
}

WarehouseReceiptModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default WarehouseReceiptModal
