import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
// import SvgIcon from 'forge-components/dist/components/Icon/SvgIcon';
import { SvgIcon as MaterialSvgIcon } from "@material-ui/core";
import IconX from "forge-components/dist/components/Icon/svg-icons/X";
import Text from "forge-components/dist/components/Text";
import { Grid, Col, Row } from "react-styled-flexboxgrid-v2";
import { Box } from "reflexbox";
import styled from "styled-components";
import { space, color } from "styled-system";
import PropTypes from "prop-types";
import { getInLocal } from "../../../utils/storage";
import agent from "../../../utils/agent";
import useLocation from "../../../customHooks/useLocation";
import useSkeletonGenerator from "../../../customHooks/useSkeletonGenerator";
import { CookieHandler } from "../../../utils/CookieHandler";
import {
  ColorGray900,
  ColorWhite,
  ColorBlue500,
  ColorBlue600,
  FontWeightDefault,
} from "cds-tokens/dist/js/cds-variables";
// import LocationPin from 'forge-components/src/icons/LocationPin';

// Lazy load these components, display skeleton while they are loading.
const LocatorForm = lazy(() => import("./locatorForm"));
const Warehouses = lazy(() => import("./warehouses"));

const getContext = (payload) => payload.context;

const SvgIcon = styled(MaterialSvgIcon)`
  ${space}
  ${color}
`;

const SvgLocationPin = (props) =>
  React.createElement(
    SvgIcon,
    props,
    <path d="M12.144 2C8.197 2 5 5.19 5 9.124c0 1.599.527 3.074 1.419 4.263l4.582 7.915c.027.051.053.102.086.149l.01.017.003-.001a1.284 1.284 0 002.021.078l.012.007.045-.078c.068-.09.126-.185.169-.291l4.489-7.755a7.08 7.08 0 001.451-4.303C19.287 5.19 16.09 2 12.143 2zm-.071 10.736a3.514 3.514 0 01-3.52-3.511c0-1.938 1.576-3.511 3.52-3.511s3.52 1.572 3.52 3.511a3.515 3.515 0 01-3.52 3.511z" />
  );

const ButtonLink = styled.button`
  background: none !important;
  border: none;
  padding: 0 !important;
  font-family: arial, sans-serif;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
`;

const IconLabel = (svg) => (
  <SvgIcon
    style={{
      color: ColorGray900,
      width: "75%",
      height: "auto",
      cursor: "pointer",
      textShadow: `0 1px 0 ${ColorWhite}`,
    }}
  >
    {svg}
  </SvgIcon>
);

const searchLimit = 50; // TODO: Source from configs
const storageKey = "WAREHOUSEDELIVERY_WHS"; // TODO: Source form configs.  Any name could be used, just be consistent.

const App = ({ setState }) => {
  const locale = getInLocal("i18nextLng") || "en-US"; // Private browsing won't provide a locale.
  const { t } = useTranslation();

  const userLocation = useLocation();

  const [warehouses, setWarehouses] = React.useState([]);
  const [loadingWarehouses, setLoadingWarehouses] = React.useState(false);
  const [filter, setFilter] = React.useState({});

  const [espotMessage, setEspotMessage] = React.useState();

  const currentLocationSearchHandler = async () => {
    const location = userLocation;
    setLoadingWarehouses(true);
    await loadWarehouses({ location, limit: searchLimit });

    setLoadingWarehouses(false);
  };

  const searchForWarehouses = async ({ location }) => {
    setLoadingWarehouses(true);
    await loadWarehouses({ location, limit: searchLimit });
    setLoadingWarehouses(false);
  };

  const [preferredWarehouse, setPreferredWarehouse] = React.useState(() => {
    if (CookieHandler.cookieExists(storageKey)) {
      const cookie = CookieHandler.get(storageKey);
      const catalog = cookie?.nearestWarehouse?.catalog;
      console.log(`catalog: ${catalog}`);
      if (catalog) {
        console.log(`preferredWarehouse: ${catalog.slice(0, -3)}`);
        return catalog.slice(0, -3);
      }
    }
    return undefined;
  });

  const movePreferredWarehouse = (warehouses, preferredWarehouse) => {
    const preferredWarehouseIndex = warehouses.findIndex(
      (warehouse) => warehouse.warehouseId === preferredWarehouse
    );
    const preferredWarehouseObject = warehouses[preferredWarehouseIndex];
    warehouses.splice(preferredWarehouseIndex, 1);
    warehouses.unshift(preferredWarehouseObject);
    return warehouses;
  };

  const loadWarehouses = async ({ location, limit }) => {
    let payload = await agent.getWarehousesByLatLng(
      location.latitude,
      location.longitude,
      filter,
      limit,
      locale
    );
    const context = getContext(payload);
    if (
      context.statusMessage.statusCode === "Success" &&
      payload?.warehouses.length > 0
    ) {
      payload.warehouses = payload.warehouses.filter(
        (warehouse) => warehouse.regionCode !== "BD"
      );
      if (
        preferredWarehouse &&
        payload.warehouses.find(
          (warehouse) => warehouse.warehouseId === preferredWarehouse
        )
      ) {
        setWarehouses(() => [
          ...movePreferredWarehouse(payload.warehouses, preferredWarehouse),
        ]);
      } else {
        setWarehouses(() => [...payload.warehouses]);
      }
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (userLocation) {
      setLoadingWarehouses(true);
      const location = userLocation;
      loadWarehouses({ location, limit: searchLimit });
      setLoadingWarehouses(false);

      // TODO: Service call for espot placeholder.
      //   setEspotMessage(...)
    }
  }, [userLocation]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const locatorFormSkeleton = useSkeletonGenerator({
    variant: "rect",
    animation: "wave",
    width: "320px",
    height: "78px",
  });

  const warehousesSkeleton = useSkeletonGenerator({
    variant: "rect",
    animation: "wave",
    width: "320px",
    height: "819px",
  });

  const closeEventHandler = () => {
    setState((prevState) => ({
      ...prevState,
      left: false,
    }));
  };

    return (
      <Grid
        style={{
          width: "320px",
          height: "896px",
          padding: "0px",
          float: "left",
        }}
      >
        <Col>
          <Row
            style={{
              paddingLeft: "0px",
              paddingTop: "12px",
              paddingBottom: "4px",
            }}
          >
            <Col
              style={{
                width: "84%",
              }}
            >
              <Text
                variant="t3"
                style={{ fontSize: "18px", fontWeight: FontWeightDefault }}
              >
                {t('Find a Warehouse')}
              </Text>
            </Col>
            <Col
              style={{
                width: "16%",
                float: "right",
              }}
            >
              <ButtonLink onClick={closeEventHandler}>
                {IconLabel(<IconX />)}
              </ButtonLink>
            </Col>
          </Row>

          {espotMessage && (
            <Box dangerouslySetInnerHTML={{ __html: espotMessage }} />
          )}

          <Row
            style={{
              paddingLeft: "0px",
              paddingTop: "16px",
              paddingBottom: "12px",
            }}
          >
            <Col
              style={{
                width: "24px",
                float: "right",
              }}
            >
              <ButtonLink onClick={currentLocationSearchHandler}>
                <SvgLocationPin color={ColorBlue500} />
              </ButtonLink>
            </Col>
            <Col
              style={{
                float: "right",
                marginLeft: "8px",
              }}
            >
              <ButtonLink
                style={{ textDecoration: "none" }}
                onClick={currentLocationSearchHandler}
              >
                <Text
                  variant="t3"
                  style={{ fontWeight: FontWeightDefault, color: ColorBlue600 }}
                >
                  {t('Use My Current Location')}
                </Text>
              </ButtonLink>
            </Col>
          </Row>
          <Row>
            <Suspense fallback={locatorFormSkeleton}>
              <LocatorForm
                location={userLocation}
                searchForWarehouses={searchForWarehouses}
                filter={filter}
                setFilter={setFilter}
                label={t('City, State or Zip')}
              />
            </Suspense>
          </Row>
          <Row>
            <Suspense fallback={warehousesSkeleton}>
              {warehouses.length > 0 && (
                <Warehouses
                  width={320}
                  height={819}
                  warehouses={warehouses}
                  preferredWarehouse={preferredWarehouse}
                  setPreferredWarehouse={setPreferredWarehouse}
                  loadingWarehouses={loadingWarehouses}
                  locale={locale}
                />
              )}
            </Suspense>
          </Row>
        </Col>
      </Grid>
    );
};

App.propTypes = {
  setState: PropTypes.func.isRequired,
};

export default App;
