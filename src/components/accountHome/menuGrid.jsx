import React from "react"
import Grid from "@material-ui/core/Grid";
import styled from "styled-components"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { myOrdersUrl, accountDetailsUrl, businessDetailsUrl, renewMembershipUrl, addressBookUrl, paymentMethodsUrl, costcoPayurl, myListsUrl, communicationPreferenceUrl } from '../common/myAccount/accountLinks';
import { MembershipCard, Orders, AccountDetails, BusinessCenter, Renew, LocationSpecific, PaymentMethods, Lists, Settings, CostcoPay } from 'forge-components/dist/icons';

import IconLabel from "../accountMenu/IconLabel";

const bdMenuList = [
  {
    id: 2,
    label: "Orders & Purchases",
    icon: <Orders />,
    description:
      "Track orders, view in-warehouse purchases, return items or buy again.",
    link: myOrdersUrl,
  },

  {
    id: 3,
    label: "Account Details",
    icon: <AccountDetails />,
    description:
      "View and make changes to your personal information, view your membership details, and change your password.",
    link: accountDetailsUrl,
  },
  {
    id: 4,
    label: "Business Details",
    icon: <BusinessCenter />,
    description:
      "View and make changes to your business information including licenses and additional people on your membership.",
    link: businessDetailsUrl,
  },
  {
    id: 5,
    label: "Renew Membership",
    icon: <Renew />,
    description: "View and manage your Costco membership renewal.",
    link: renewMembershipUrl,
  },
  {
    id: 6,
    label: "Address Book",
    icon: <LocationSpecific />,
    description: "View and manage your addresses.",
    link: addressBookUrl,
  },
  {
    id: 7,
    label: "Payment Methods",
    icon: <PaymentMethods />,
    description: "View and manage your payment method.",
    link: paymentMethodsUrl,
  },
  {
    id: 8,
    label: "Costco Pay",
    icon: <CostcoPay />,
    description:
      "Manage your Costco Pay fob or easily buy and track gas purchases at Costco gas station.",
    link: costcoPayurl,
  },
  {
    id: 9,
    label: "Lists",
    icon: <Lists />,
    description:
      "Create and  view lists of your favorite items or order items from your lists.",
    link: myListsUrl,
  },
  {
    id: 10,
    label: "Preferences",
    icon: <Settings />,
    description: "Manage your preferences for print and email communications.",
    link: communicationPreferenceUrl,
  },
  {
    id: 11,
    label: "Digital Membership Card",
    icon: <MembershipCard />,
    description: "Learn more about using your digital membership card.",
  },
]

const bcMenuList = [
  {
    id: 2,
    label: "Orders & Purchases",
    icon: <Orders />,
    link: myOrdersUrl,
    description:
      "Track orders, view in-warehouse purchases, return items or buy again.",
  },
  {
    id: 3,
    label: "Account Details",
    icon: <AccountDetails />,
    description:
      "View and make changes to your personal information, view your membership details, and change your password.",
  },
  {
    id: 6,
    label: "Address Book",
    icon: <LocationSpecific />,
    description: "View and manage your addresses.",
  },
  {
    id: 7,
    label: "Payment Methods",
    icon: <PaymentMethods />,
    description: "View and manage your payment method.",
  },
  {
    id: 9,
    label: "Lists",
    icon: <Lists />,
    description:
      "Create and  view lists of your favorite items or order items from your lists.",
  },
  {
    id: 10,
    label: "Preferences",
    icon: <Settings />,
    description: "Manage your preferences for print and email communications.",
  },
]

const menuGridConfig = {
  bc: bcMenuList,
  bd: bdMenuList,
}
const Styledlabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px !important;
  margin-top: 12px !important;
`

const StyledGridItem = styled.div`
  height: 100%;
  text-align: center;
  border: 1px solid #dbdbdb;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
  :hover {
    border: 2px solid #909090 !important;
    ${Styledlabel} {
      text-decoration: underline;
    }
  }
`
const StyledGridDescription = styled.div`
  padding-top: 12px;
  padding-bottom: 16px;
  text-decoration: none !important;
`

const MenuGrid = ({ type }) => {
  const { t } = useTranslation()

  return (
    <Grid
      style={{paddingLeft: 15, paddingBottom: 60 }}
      container
      spacing={4}
      alignItems="stretch"
    >
      {menuGridConfig[type].map(product => (
        <Grid
          key={`grid_${product.id}`}
          item
          xs={4}
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = product.link)}
        >
          <StyledGridItem>
            <Styledlabel as="p" variant="t7">
              {t(product.label)}
            </Styledlabel>
            <IconLabel
              id={`grid_${product.id}`}
              svg={product.icon}
              iconColor="red.500"
              width={60}
              height={60}
            />
            <StyledGridDescription style={{textDecoration :'none'}}>
              {t(product.description)}
            </StyledGridDescription>
          </StyledGridItem>
        </Grid>
      ))}
    </Grid>
  )
}
MenuGrid.propTypes = { type: PropTypes.oneOf(["bd", "bc"]) }

MenuGrid.defaultProps = { type: "bd" }

export default MenuGrid
