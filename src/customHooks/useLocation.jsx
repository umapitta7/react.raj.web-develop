import React from "react";
import agent from "../utils/agent";

import { CookieHandler } from "../utils/CookieHandler";

// TODO: Move constants to environment config file
const wcsCookie = "WAREHOUSEDELIVERY_WHS";
const akamaiCookie = "client-zip-short";
const latitude = 47.564661;
const longitude = -122.32941;

const fallbackLocation = {
  latitude,
  longitude,
};

const getAddressLocation = async (q) => {
  const results = await agent.getLocation(q);
  const { resources } = results.resourceSets[0];
  const resource = resources.find((element) => element.confidence === "High");
  return {
    latitude: resource.point.coordinates[0],
    longitude: resource.point.coordinates[1],
  };
};

const useLocation = () => {
  let location = fallbackLocation;
  let postalCode;

  if (CookieHandler.cookieExists(wcsCookie)) {
    const cookie = CookieHandler.get(wcsCookie);
    if (cookie.storeLocation) {
      postalCode = cookie.storeLocation;
    }
  } else {
    const cookie = CookieHandler.get(akamaiCookie);
    if (cookie) {
      postalCode = cookie;
    }
  }

  React.useEffect(() => {
    const getLocation = async (postalCode) => {
      if (postalCode) {
        location = await getAddressLocation(postalCode);
      }
    };

    getLocation(postalCode);
  }, [postalCode]);

  return location;
};

export default useLocation;
