import { SvgIcon as MaterialSvgIcon } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconFoodCourt from "forge-components/dist/components/Icon/svg-icons/FoodCourtSolid";
import IconGasStation from "forge-components/dist/components/Icon/svg-icons/GasStationSolid";
import IconHearingAids from "forge-components/dist/components/Icon/svg-icons/HearingAid";
import IconOptical from "forge-components/dist/components/Icon/svg-icons/Optical";
import IconPharmacy from "forge-components/dist/components/Icon/svg-icons/PharmacySolid";
import IconTireCenter from "forge-components/dist/components/Icon/svg-icons/TireCenterSolid";
import { useTranslation } from "react-i18next";
import React from "react";
import PropTypes from "prop-types";
import { Flex } from "reflexbox";
import styled from "styled-components";
import { space } from "styled-system";
import Text from "forge-components/dist/components/Text";
import { ButtonsColorPrimaryDefaultBackground } from "cds-tokens/dist/js/cds-variables";
import { Grid, Col, Row } from "react-styled-flexboxgrid-v2";

// Color Hack.  Need to apply a theme from forge-components
const SvgIcon = styled(MaterialSvgIcon)`
  ${space}
  color: ${ButtonsColorPrimaryDefaultBackground};
`;

const StyledDiv = styled.div`
  width: 267px;
  height: 30px;
`;

const StyledCheckbox = withStyles({
  root: {
    '&[class*="MuiCheckbox-root"]': {
      paddingLeft: "4px !important",
      paddingRight: "8px !important",
    },
  },
})(Checkbox);

const useStyles = makeStyles({
  changeLink: {
    color: ButtonsColorPrimaryDefaultBackground,
    hover: "true",
    cursor: "pointer",
  },
});

const IconLabel = ({ label, name, svg, handleChange }) => {
  const classes = useStyles();

  return (
    <div>
      <FormControlLabel
        value="true"
        control={
          <StyledCheckbox
            color="primary"
            name={name}
            value="true"
            onClick={handleChange}
          />
        }
        label={
          <Flex>
            <SvgIcon
              pr="sm"
              style={{ paddingLeft: "0px", paddingRight: "4px" }}
            >
              {svg}
            </SvgIcon>
            <Text as="div" variant="t6" style={{ lineHeight: "24px" }}>
              {label}
            </Text>
          </Flex>
        }
      />
    </div>
  );
};

IconLabel.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  svg: PropTypes.node.isRequired,
  classes: PropTypes.shape({}),
  handleChange: PropTypes.func.isRequired,
};

const FilterOptions = ({ visibility, setVisibility, setFilter, style }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const changeVisibility = () => {
    if (visibility) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setFilter((prev) => {
        prev[name] = checked;
        return prev;
      });
    } else {
      setFilter((prev) => {
        delete prev[name];
        return prev;
      });
    }
  };

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <Grid style={{ ...style, paddingLeft: "0px" }}>
      <Row>
        <Col
          className={classes.changeLink}
          tabIndex="-1"
          role="link"
          onClick={changeVisibility}
          style={{ paddingLeft: "8px" }}
        >
          {!visibility ? (
            <>{t("Show Filter Options")}</>
          ) : (
            <>{t("Hide Filter Options")}</>
          )}
        </Col>
      </Row>

      {visibility ? (
        <Row p="2">
          <FormGroup aria-label="position" id="locator_search_filter">
            <Row style={{ marginLeft: "0px" }}>
              <Col style={{ width: "160px" }}>
                <StyledDiv>
                  <IconLabel
                    label={t("Gas Station")}
                    name="gas"
                    svg={<IconGasStation />}
                    handleChange={handleChange}
                  />
                </StyledDiv>
                <StyledDiv>
                  <IconLabel
                    label={t("Tire Center")}
                    name="auto"
                    svg={<IconTireCenter />}
                    handleChange={handleChange}
                  />
                </StyledDiv>
                <StyledDiv>
                  <IconLabel
                    label={t("Food Court")}
                    name="food"
                    svg={<IconFoodCourt />}
                    handleChange={handleChange}
                  />
                </StyledDiv>
                <StyledDiv>
                  <IconLabel
                    label={t("Hearing Aids")}
                    name="hearing"
                    svg={<IconHearingAids />}
                    handleChange={handleChange}
                  />
                </StyledDiv>
              </Col>
              <Col style={{ width: "160px" }}>
                {" "}
                <StyledDiv>
                  <IconLabel
                    label={t("Optical")}
                    name="optical"
                    svg={<IconOptical />}
                    handleChange={handleChange}
                  />
                </StyledDiv>
                <StyledDiv>
                  <IconLabel
                    label={t("Pharmacy")}
                    name="pharmacy"
                    svg={<IconPharmacy />}
                    handleChange={handleChange}
                  />
                </StyledDiv>
              </Col>
            </Row>
          </FormGroup>
        </Row>
      ) : null}
    </Grid>
  );
  /* eslint-enable jsx-a11y/click-events-have-key-events */
};

export default FilterOptions;

FilterOptions.propTypes = {
  visibility: PropTypes.bool,
  setVisibility: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
};
FilterOptions.defaultProps = {
  visibility: true,
  style: {},
};
