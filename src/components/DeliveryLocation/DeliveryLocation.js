import React from "react";
import '../../translations/language';
import Drawer from "@material-ui/core/Drawer";
import { sessionStorage } from "reactive-localstorage";
import axios from "axios";
import SidePanel from "./components/SidePanel";
import Header from "./components/Header";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { invokeRESTApi, RestService } from "../../services/Gateway/restService";
import { CookieHandler } from "../../utils/CookieHandler";
import { getInLocal } from '../../utils/storage';

import {
  MuiCostcoTheme,
  StyledCostcoTheme,
} from "forge-components/dist/global/CostcoTheme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import agent from "../../utils/agent";

const locale = getInLocal('i18nextLng') || 'en-US';
const storageKey = "WAREHOUSEDELIVERY_WHS";
const zipCodeKey = "invCheckPostalCode";

const useStyles = makeStyles({
  list: {
    width: 320,
  },
  fullList: {
    width: "auto",
  },
});


export const updateCookieWithLocationCatalog = (locationCatalogData) => {
  // const locationCatalogData = agent.getLocationCatalog(code);
  // console.log(locationCatalogData)
  let cookie;
  if (CookieHandler.cookieExists(storageKey)) {
    cookie = CookieHandler.get(storageKey);
    cookie.distributionCenters = locationCatalogData.distributionCenters;
    cookie.groceryCenters = locationCatalogData.groceryCenters;
  } else {
    cookie = locationCatalogData;
  }
  CookieHandler.set(storageKey, JSON.stringify(cookie));
  window.location.reload();
};

//agent.getLocationCatalog("98052").then((response) => {
 // console.log(response)
//})
const DeliveryLocation = (props) => {

  const classes = useStyles();

  const [deliveryLocation, setDeliveryLocation] = React.useState({
    shipToLocation: 0,
  });

  const [state, setState] = React.useState({
    left: false,
  });

  // If user already has a selected zipCode, update the state 
  const setZip = () => {
    if (CookieHandler.cookieExists(zipCodeKey)) {
      const selectedZip = CookieHandler.get(zipCodeKey);
      setDeliveryLocation({
        shipToLocation: selectedZip,
      });
    }
    else {
      CookieHandler.set(zipCodeKey, "");
    }
  }

  const changeDeliveryLocation = (newZip) => {
    setDeliveryLocation(() => {
      let cookie;
      if (CookieHandler.cookieExists(storageKey)) {
        cookie = CookieHandler.get(storageKey);
        cookie.shipToLocation = newZip;
      } else {
        cookie = {
          shipToLocation: newZip,
        };
      }
      CookieHandler.set(storageKey, JSON.stringify(cookie));
      CookieHandler.set(zipCodeKey, newZip);
    });
    setDeliveryLocation({
      shipToLocation: newZip,
    });
    agent.getLocationCatalog(newZip).then((response) => {
      updateCookieWithLocationCatalog(response);
    });
    //window.location.reload();
  };

  // CookieHandler.set("selectedLanguage", JSON.stringify("-25"));


  React.useEffect(() => {
    const fn = (key, value) => {
      if (key === "deliveryLocation") {
        setState((prevState) => ({
          ...prevState,
          left: value === "true",
        }));
      }
    };

    // Listen for changes
    sessionStorage.on("change", fn);

    //updateCookieWithLocationCatalog("98052");
    setZip();
    return () => {
      // Clean up
      sessionStorage.off("change", fn);
      window.sessionStorage.setItem("deliveryLocation", "false");
    };
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    window.sessionStorage.setItem("deliveryLocation", open.toString());
    setState({ ...state, [anchor]: open });
  };

  const drawerContent = (anchor) => (
    <div
      style={{
        float: "left",
      }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <StyledThemeProvider theme={StyledCostcoTheme}>
        <MuiThemeProvider theme={MuiCostcoTheme}>
          <SidePanel
            locale={locale}
            onUpdateDeliveryLocation={changeDeliveryLocation}
            onPanelClose={toggleDrawer(anchor, false)}
          />
        </MuiThemeProvider>
      </StyledThemeProvider>
    </div>
  );

  return (
    <>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Header
            locale={locale}
            onChangeDeliveryLocation={toggleDrawer(anchor, true)}
            selectedZip={deliveryLocation.shipToLocation}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            style={{ zIndex: '20012'}}
          >
            {drawerContent(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default DeliveryLocation;
