import { makeStyles } from "@material-ui/core/styles";
import Text from "forge-components/dist/components/Text";
import MyWarehouse from "forge-components/dist/components/Surfaces/MyWarehouse";
import WarehouseNameAndDistance from "forge-components/dist/components/Surfaces/WarehouseNameAndDistance";
import WarehouseAddress2 from "forge-components/dist/components/Surfaces/WarehouseAddress2";
import OpenTill from "forge-components/dist/components/Surfaces/OpenTill";
import WarehouseSidebarLinks from "forge-components/dist/components/Surfaces/WarehouseSidebarLinks";
import SvgCheckMarkCircle from "forge-components/dist/icons/CheckmarkCircle";
import SvgLocationPin from "forge-components/dist/icons/LocationPin"
import SvgGasStationSolid from "forge-components/dist/icons/GasStationSolid";
import SvgTireCenterSolid from "forge-components/dist/icons/TireCenterSolid";
import SvgFoodCourtSolid from "forge-components/dist/icons/FoodCourtSolid";
import SvgHearingAidsSolid from "forge-components/dist/icons/HearingAid";
import SvgOpticalSolid from "forge-components/dist/icons/Optical";
import SvgPharmacySolid from "forge-components/dist/icons/PharmacySolid";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import React from "react";
import {
  NotificationsColorGeneralBackground,
  NotificationsColorSuccessBorder,
  ColorBlue500,
  ColorBlue600,
  ColorGray500,
  ButtonsColorPrimaryDefaultBackground,
  DividersColorBorder,
} from "cds-tokens/dist/js/cds-variables";
import { FixedSizeList as List } from "react-window";
import styled from "styled-components";
import { Grid, Row as FlexBoxGridRow } from "react-styled-flexboxgrid-v2";
import { Utils } from "../../../utils";
import IconLabel from "./iconLabel";

import StoreDetails from "./storeDetails";
import SetAsMyWarehouse from "./setAsMyWarehouse";

import useSkeletonGenerator from "../../../customHooks/useSkeletonGenerator";
import { CookieHandler } from "../../../utils/CookieHandler";
import { paddingBottom } from "styled-system";

// Key where our data will be stored in localStorage
const storageKey = "WAREHOUSEDELIVERY_WHS"; // Any name could be used, just be consistent.
const LEGACY_INTEGRATION = "true";

const StyledIconFlexBoxGridRow = styled(FlexBoxGridRow)`
  width: 320px;
  height: 22px;
`;

const SetAsMyWarehouseWrapper = styled(FlexBoxGridRow)`
  width: 300px;
  height: 75px;
  margin-top: 16px;
  margin-left: 0px;
  margin-bottom: 16px;
  padding-left: 52px;
  padding-right: 16px;
`;

const iconProps = {
  style: {
    height: '80%',
    width: 'auto',
    paddingLeft: '3',
    paddingRight: '4',
    marginBottom: '2'
  },
}

const useStyles = makeStyles({
  active: {
    background: "#f0f8ff",
    borderLeft: "2px solid",
    borderLeftColor: ColorBlue600,
  },
  divChangeLink: {
    hover: "true",
    cursor: "pointer",
  },
  spanChangeLink: {
    color: ButtonsColorPrimaryDefaultBackground,
    textDecorationLine: "underline",
    hover: "true",
    cursor: "pointer",
  },
  row: {
    borderTop: "solid",
    borderTopWidth: ".0005em",
    borderTopColor: DividersColorBorder,
  },
  list: {
    borderBottomWidth: "",
    borderLeftWidth: "",
    borderTopWidth: "",
  },
});

const eventHandler = (value) => {
  Utils.getDirections(value);
};

/* eslint-disable no-console */
const handleKeyUp = (e) => {
  // TODO: Need to flush out and implement
  console.log(e);
};
/* eslint-enable no-console */

const Warehouses = ({
  warehouses,
  preferredWarehouse,
  setPreferredWarehouse,
  loadingWarehouses,
  width,
  height,
  locale,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const preferredWarehouseEventHandler = (city, postalCode, warehouseId) => {
    setPreferredWarehouse(() => {
      let cookie;
      if (CookieHandler.cookieExists(storageKey)) {
        cookie = CookieHandler.get(storageKey);
        cookie.storeLocation = postalCode;
        cookie.nearestWarehouse.city = city;
        cookie.nearestWarehouse.catalog = `${warehouseId}-wh`;
      } else {
        cookie = {
          storeLocation: postalCode,
          nearestWarehouse: {
            city,
            catalog: `${warehouseId}-wh`,
          },
        };
      }
      CookieHandler.set(storageKey, JSON.stringify(cookie));
      window.location.reload();
    });
  };

  const Row = ({ index, style }) => {
    const warehouse = warehouses[index];

    return (
      <Grid
        key={warehouse.warehouseId}
        data-testid="data-row"
        {...(warehouse.warehouseId === preferredWarehouse
          ? {
              style: {
                backgroundColor: NotificationsColorGeneralBackground,
                borderLeft: `4px solid ${ColorBlue600}`,
                borderTop: `2px solid ${ColorBlue600}`,
                borderRight: `2px solid ${ColorBlue600}`,
                borderBottom: `2px solid ${ColorBlue600}`,
                paddingLeft: "0px",
                paddingRight: "0px",
                ...style,
              },
            }
          : {
              style: {
                borderTop: "solid",
                borderTopWidth: "0.0005em",
                borderTopColor: DividersColorBorder,
                paddingLeft: "0px",
                paddingRight: "0px",
                ...style,
              },
            })}
      >
        {warehouse.warehouseId === preferredWarehouse && (
          <MyWarehouse
            icon={
              <SvgCheckMarkCircle {...iconProps} color={NotificationsColorSuccessBorder} />
            }
            message={
              <Text
                style={{ color: NotificationsColorSuccessBorder }}
                variant="t3"
              >
                My Warehouse
              </Text>
            }
            style={{
              height: "16px",
              maxWidth: "260px",
              marginLeft: "0px",
              marginBottom: "8px",
              paddingLeft: "0px",
              paddingTop: "12px",
            }}
          />
        )}

        <WarehouseNameAndDistance
          distance={`${Utils.getDistance(warehouse)} ${Utils.getMeasure(
            warehouse
          )}`}
          icon={
            LEGACY_INTEGRATION === "true" ? (
              <a
                href={`https://www.costco.com/warehouse-locations/${Utils.getSlug(
                  warehouse
                )}.html`}
              >
                <SvgLocationPin data-testid="SvgLocationPin" color={ColorBlue500} width="24px" height="24px" title={warehouse.warehouseId}/>
              </a>
            ) : (
              <a href={`/sl/${Utils.getSlug(warehouse)}`}>
                <SvgLocationPin data-testid="SvgLocationPin" color={ColorBlue500} width="24px" height="24px" title={warehouse.warehouseId}/>
              </a>
            )
          }
          name={
            LEGACY_INTEGRATION === "true" ? (
              <a
                style={{ textDecoration: "none" }}
                href={`https://www.costco.com/warehouse-locations/${Utils.getSlug(
                  warehouse
                )}.html`}
              >
                {Utils.getWarehouseName(warehouse)}
              </a>
            ) : (
              <a
                style={{ textDecoration: "none" }}
                href={`/sl/${Utils.getSlug(warehouse)}`}
              >
                {Utils.getWarehouseName(warehouse)}
              </a>
            )
          }
          style={{
            height: "16px",
            maxWidth: "260px",
            marginLeft: "0px",
            paddingLeft: "0px",
            marginTop: "16px",
            marginBottom: "8px",
          }}
        />

        <WarehouseAddress2
          CityStateZip={`${warehouse.address.city} ${warehouse.address.territory} ${warehouse.address.postalCode}`}
          StreetAddress={warehouse.address.line1}
          style={{
            height: "40px",
            marginLeft: "0px",
            marginBottom: "8px",
            maxWidth: "260px",
            paddingLeft: "52px",
          }}
        />

        <OpenTill
          message="Open until"
          closingTime={Utils.openTill(warehouse)}
          formatTime={Utils.formatTime}
          locale={locale}
          style={{
            height: "16px",
            marginBottom: "8px",
            maxWidth: "240px",
            paddingLeft: "52px",
          }}
        />

        <WarehouseSidebarLinks
          style={{
            
            marginLeft: "0px",
            marginBottom: "8px",
            maxWidth: "320px",
            paddingLeft: "52px",
          }}
          links={[
            <span
              className={classes.spanChangeLink}
              tabIndex="-1"
              role="link"
              onKeyUp={handleKeyUp}
              onClick={() => {
                eventHandler(warehouse);
              }}
              style={{ textDecoration: "none" }}
            >
              {t("Get Directions")}
            </span>,
            <StoreDetails warehouse={warehouse} />,
          ]}
        />

        <StyledIconFlexBoxGridRow
          style={{
            marginTop: "16px",
            marginLeft: "0px",
            marginBottom: "0px",
            paddingLeft: "52px",
          }}
        >
          {Utils.hasGas(warehouse) && <IconLabel svg={<SvgGasStationSolid data-testid="SvgGasStationSolid"/>} />}
          {Utils.hasTires(warehouse) && <IconLabel svg={<SvgTireCenterSolid data-testid="SvgTireCenterSolid"/>} />}
          {Utils.hasFood(warehouse) && <IconLabel svg={<SvgFoodCourtSolid data-testid="SvgFoodCourtSolid"/>} />}
          {Utils.hasHearing(warehouse) && (
            <IconLabel svg={<SvgHearingAidsSolid data-testid="SvgHearingAidsSolid"/>} />
          )}
          {Utils.hasOptical(warehouse) && <IconLabel svg={<SvgOpticalSolid  data-testid="SvgOpticalSolid"/>} />}
          {Utils.hasPharmacy(warehouse) && <IconLabel svg={<SvgPharmacySolid data-testid="SvgPharmacySolid"/>} />}
        </StyledIconFlexBoxGridRow>

        {warehouse.address.countryName === "US" ||
        warehouse.address.countryName === "CA" ? (
          <SetAsMyWarehouseWrapper>
            <SetAsMyWarehouse
              city={warehouse.address.city}
              postalCode={warehouse.address.postalCode}
              warehouse={warehouse}
              preferredWarehouse={preferredWarehouse}
              preferredWarehouseEventHandler={preferredWarehouseEventHandler}
            />
          </SetAsMyWarehouseWrapper>
        ) : null}
      </Grid>
    );
  };

  Row.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.shape({
      position: PropTypes.string.isRequired,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.string.isRequired,
    }).isRequired,
  };

  Row.defaultProps = {};

  // To reduce unnecessary re-renders when scrolling through the data list.
  const MemoRow = React.memo(Row, (prevProps, nextProps) => {
    if (
      prevProps.index !== nextProps.index &&
      warehouses[prevProps.index].warehouseId !==
        warehouses[nextProps.index].warehouseId &&
      prevProps.style !== nextProps.style
    ) {
      return false;
    }
    return true;
  });

  const ListSkeleton = useSkeletonGenerator({
    variant: "rect",
    animation: "wave",
    width,
    height,
  });

  const itemSize = 240; // TODO: Height of each row.  Source from configs.
  const itemCount = warehouses.length;

  const itemKey = (index) => warehouses[index].warehouseId;

  return (
    <>
      {loadingWarehouses ? (
        ListSkeleton
      ) : (
        <List
          style={{
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: ColorGray500,
          }}
          className={classes.list}
          width={width}
          height={height}
          itemCount={itemCount}
          itemSize={itemSize}
          itemKey={itemKey}
        >
          {MemoRow}
        </List>
      )}
    </>
  );
};

export default Warehouses;

Warehouses.propTypes = {
  warehouses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  preferredWarehouse: PropTypes.string,
  setPreferredWarehouse: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  locale: PropTypes.string,
};

Warehouses.defaultProps = {
  preferredWarehouse: undefined,
  width: 565,
  height: 692,
  locale: "en-US",
};
