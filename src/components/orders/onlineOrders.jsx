import React, { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Box, Flex } from "reflexbox"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import TableFooter from "@material-ui/core/TableFooter"
import TablePagination from "@material-ui/core/TablePagination"

import useSkeletonGenerator from "../../customHooks/useSkeletonGenerator"
// Lazy load these components.
const OrderSummary = lazy(() => import("./orderSummary"))
const OrderPlaced = lazy(() => import("./orderPlaced"))
const InTransit = lazy(() => import("./inTransit"))

const Row = ({ index, style }) => (
  <Flex flexDirection="Column">
    <Suspense
      fallback={useSkeletonGenerator({
        variant: "rect",
        animation: "wave",
        width: "724px",
        height: "66px",
      })}
    >
      <OrderSummary
        style={{
          width: "724px",
          height: "66px",
          borderStyle: "solid",
          borderWidth: "thin",
          borderColor: "#909090",
        }}
      />
    </Suspense>
    <Suspense
      fallback={useSkeletonGenerator({
        variant: "rect",
        animation: "wave",
        width: "724px",
        height: "106px",
      })}
    >
      <OrderPlaced
        style={{
          width: "724px",
          height: "106px",
          borderStyle: "solid",
          borderWidth: "thin",
          borderColor: "#909090",
        }}
      />
    </Suspense>
    <Suspense
      fallback={useSkeletonGenerator({
        variant: "rect",
        animation: "wave",
        width: "724px",
        height: "162px",
      })}
    >
      <InTransit
        style={{
          width: "724px",
          height: "162px",
          borderStyle: "solid",
          borderWidth: "thin",
          borderColor: "#909090",
        }}
      />
    </Suspense>
  </Flex>
)

// Create some dummy records for the table
const rows = new Array(11).fill({}).reduce((accumulator, value, index) => {
  accumulator[index] = Row(index)
  return accumulator
}, [])

const useStyles = makeStyles({
  divChangeLink: {
    hover: "true",
    cursor: "pointer",
  },
  spanChangeLink: {
    color: "#3071a9",
    textDecorationLine: "underline",
    hover: "true",
    cursor: "pointer",
  },
  table: {
    minWidth: 724,
  },
  tableCell: {
    '&[class*="MuiTableCell-root"]': {
      padding: "0 !important",
      paddingBottom: "23px !important",
    },
  },
})

const numOfRowsPerPage = parseInt(process.env.REACT_APP_ROWS_PER_PAGE, 10)

const OnlineOrders = ({ width, height }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(numOfRowsPerPage)

  // const emptyRows =
  //  rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, numOfRowsPerPage))
    setPage(0)
  }

  return (
    <div style={{ width, height }}>
      <TableContainer>
        <Table className={classes.table} aria-label="orders table">
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  {row}
                </TableCell>
              </TableRow>
            ))}

            {/* TODO: Not sure we actually need this.
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={1} />
              </TableRow>
            )}
            */}
          </TableBody>

          <TableFooter>
            <TableRow>
              <Box style={{ width: "724px", height: "63px" }}>
                <div
                  style={{
                    marginTop: "23px",
                    width: "450px",
                    height: "20px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: t("UPS My Choice", {
                      link: '<a href="https://www.costcotireappointments.com" class="external">manage your deliever using UPS My Choice&copy;</a>',
                    }),
                  }}
                />
              </Box>
            </TableRow>
            <TableRow
              style={{
                borderTop: "solid thin #909090",
                borderBottom: "solid thin #909090",
              }}
            >
              <TablePagination
                component="div"
                count={100}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  )
}

export default OnlineOrders
