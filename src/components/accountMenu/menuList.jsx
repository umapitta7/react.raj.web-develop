import React from "react"
import { Divider, List } from "@material-ui/core"
import PropTypes from "prop-types"
import { accountHomeUrl, myOrdersUrl, accountDetailsUrl, businessDetailsUrl, renewMembershipUrl, addressBookUrl, paymentMethodsUrl, costcoPayurl, myListsUrl, communicationPreferenceUrl } from '../common/myAccount/accountLinks';
import MenuListItem from "./MenuListItem"

import { MembershipCard, AccountSolid, Orders, AccountDetails, BusinessCenter, Renew, LocationSpecific, PaymentMethods, Lists, Settings, CostcoPay } from 'forge-components/dist/icons';


// TODO: need to place svg icons in forge-components and use.
const bdMenuList = [
  {
    id: 1,
    label: "Account Home",
    icon: <AccountSolid />,
    link: accountHomeUrl,
  },
  {
    id: 2,
    label: "Orders & Purchases",
    icon: <Orders />,
    link: myOrdersUrl,
  },
  {
    id: 3,
    label: "Account Details",
    icon: <AccountDetails />,
    link: accountDetailsUrl,
  },
  {
    id: 4,
    label: "Business Details",
    icon: <BusinessCenter />,
    link: businessDetailsUrl,
  },
  {
    id: 5,
    label: "Renew Membership",
    icon: <Renew />,
    link: renewMembershipUrl,
  },
  {
    id: 6,
    label: "Address Book",
    icon: <LocationSpecific />,
    link: addressBookUrl,
  },
  {
    id: 7,
    label: "Payment Methods",
    icon: <PaymentMethods />,
    link: paymentMethodsUrl,
  },
  {
    id: 8,
    label: "Costco Pay",
    icon: <CostcoPay />,
    link: costcoPayurl,
  },
  {
    id: 9,
    label: "Lists",
    icon: <Lists />,
    link: myListsUrl,
  },
  {
    id: 10,
    label: "Preferences",
    icon: <Settings />,
    link: communicationPreferenceUrl,
  },
  {
    id: 11,
    label: "Digital Membership Card",
    icon: <MembershipCard />,
  },
]

const bcMenuList = [
  {
    id: 1,
    label: "Account Home",
    icon: <AccountDetails />,
    link: accountHomeUrl,
  },
  {
    id: 2,
    label: "Orders & Purchases",
    icon: <Orders />,
    link: myOrdersUrl,
  },
  {
    id: 3,
    label: "Account Details",
    icon: <AccountDetails />,
    link: accountDetailsUrl,
  },
  {
    id: 6,
    label: "Address Book",
    icon: <LocationSpecific />,
    link: addressBookUrl,
  },
  {
    id: 7,
    label: "Payment Methods",
    icon: <PaymentMethods />,
    link: paymentMethodsUrl,
  },
  {
    id: 9,
    label: "Lists",
    icon: <Lists />,
    link: myListsUrl,
  },
  {
    id: 10,
    label: "Preferences",
    icon: <Settings />,
    link: communicationPreferenceUrl,
  },
]

const menuItemsConfig = {
  bc: bcMenuList,
  bd: bdMenuList,
}

const MenuList = ({ type, iconColor, showDivider }) => (
  <List disablePadding>
    {menuItemsConfig[type].map((text) => (
      <>
        <MenuListItem
          id={text.id}
          label={text.label}
          icon={text.icon}
          link={text.link}
          iconColor={iconColor}
        />
        {showDivider && <Divider />}
      </>
    ))}
  </List>
)

MenuList.propTypes = {
  type: PropTypes.oneOf(["bd", "bc"]),
  iconColor: PropTypes.bool,
  showDivider: PropTypes.bool
}

MenuList.defaultProps = { type: "bd", iconColor: true, showDivider: false }

export default MenuList
