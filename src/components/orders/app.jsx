import React, { lazy, Suspense } from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
// import { makeStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { Box, Flex } from "reflexbox"
import styled from "styled-components"

import useSkeletonGenerator from "../../customHooks/useSkeletonGenerator"

import BreadCrumb from "./breadCrumb"
import PageTitle from "./pageTitle"
import OrderFilter from "./ordersFilter"
// Lazy load these components.
const OnlineOrders = lazy(() => import("./onlineOrders"))
const WarehousePurchases = lazy(() => import("./warehousePurchases"))

const StyledFlex = styled(Flex)`
  flex-direction: column;
  width: 725px;
  height: 100%;
`

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const OrdersAndPurchases = () => {
  const { t } = useTranslation()

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <StyledFlex>
      <BreadCrumb
        style={{
          paddingLeft: "16px",
          paddingTop: "25px",
          paddingRight: "366px",
        }}
      />
      <PageTitle
        style={{
          paddingLeft: "16px",
          paddingTop: "21px",
          paddingRight: "498px",
        }}
      />

      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="tabs"
        style={{
          paddingLeft: "16px",
          paddingTop: "16px",
        }}
      >
        <Tab label={t("Online")} {...a11yProps(0)} />
        <Tab label={t("In-Warehouse")} {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <OrderFilter
          style={{
            width: "724px",
            height: "107px",
          }}
        />
        <Suspense
          fallback={useSkeletonGenerator({
            variant: "rect",
            animation: "wave",
            width: "724px",
            height: "1400px",
          })}
        >
          <OnlineOrders width={724} height={900} />
        </Suspense>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <OrderFilter style={{ width: "724px" }} />
        <Suspense
          fallback={useSkeletonGenerator({
            variant: "rect",
            animation: "wave",
            width: "724px",
            height: "1400px",
          })}
        >
          <WarehousePurchases width={724} height={900} />
        </Suspense>
      </TabPanel>
    </StyledFlex>
  )
}

export default OrdersAndPurchases

OrdersAndPurchases.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
}

OrdersAndPurchases.defaultProps = {}
