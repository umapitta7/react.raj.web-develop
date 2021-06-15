import React from "react"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import Text from "forge-components/dist/components/Text"

import IconLabel from "./IconLabel"

const StyledListItem = styled(ListItem)`
  &&.MuiListItem-root.Mui-selected,
  &&.MuiListItem-root.Mui-selected:hover {
    background-color: #f5f6fa !important;
    border-left: solid 5px;
    border-left-color: #2f4b7b;
  }
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
`

const MenuListItem = ({ iconColor, label, link, onClick, index, icon }) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledListItem
        button
        id={index}
        key={label}
        selected={label === window.sessionStorage.getItem("selectedMenuItem")}
        component="a"
        href={!onClick && (link || "/")}
        onClick={() => {
          window.sessionStorage.setItem("selectedMenuItem", label)
          window.wioEventBus.publish('accountMenu', { accountMenu: false });
          onClick && onClick();
        }}
      >
        <ListItemIcon style={{ minWidth: 0 }}>
          <IconLabel
            svg={icon}
            iconColor={iconColor ? "red.500" : "grey.500"}
          />
        </ListItemIcon>
        <ListItemText >
          <Text as="p" variant="t6">{t(label)}</Text>
        </ListItemText>
      </StyledListItem>
    </>
  )
}

MenuListItem.propTypes = {
  iconColor: PropTypes.bool,
  label: PropTypes.string,
  link: PropTypes.string,
  index: PropTypes.number,
  icon: PropTypes.element,
  onClick: PropTypes.func,
}

MenuListItem.defaultProps = { iconColor: true, onClick: null }

export default MenuListItem
