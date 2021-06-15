import React from 'react';
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField"
import Button from 'forge-components/dist/components/Button';
import Text from 'forge-components/dist/components/Text';
import XIcon from "forge-components/dist/components/Icon/svg-icons/X.js"
import { Grid, Col, Row } from 'react-flexbox-grid';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import "../DeliveryLocationStyles.css";

const Espot = styled.div`
  background-color: #EFF7FB;
  border: 2px solid #3071A9;
  border-radius: 3px;
  color: #333333;
`


const SidePanel = ({ espot, onPanelClose, onUpdateDeliveryLocation, locale }) => {
  // TODO: configure espot api get request
  let espotContent = "Item availability varies by area. In order to view the products available in your area, please provide your ZIP code.";
  // const getEspot = (options) => {
  //   const requestObj = { "url": "wcs/resources/store/wcs.storeId/espot/{espotName}?langId=wcs.langId" };
  //   setTimeout(() => {
  //     axios(requestObj)
  //       .then((res) => {
  //         if (res.status === 200) {
  //           console.log(res)
  //           //   setDeliveryZipResp(res.data);
  //           espotContent = res.data.marketingContentDescription.marketingText;
  //         } else {
  //           const { errorModel } = this;
  //           errorModel.errCode = res.status;
  //           return errorModel;
  //         }
  //       })
  //       .catch((errors) => {
  //         return errors;
  //       });
  //   }, 2000);

  // }

  const [ error, setError ] = React.useState(false);

  const { t } = useTranslation();

  const limitZip = (e) => {
    return e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5);
  }

  let schema = yup.object().shape({
    zip: yup.number().min(10000).max(99999).required()
  });

  // Placeholder value
  const wcs = {
    storeId: "10301"
  };

  const isUS = wcs.storeId === "10301";

  const codeIsValid = (val) => {
    // Zip Code validation
    if(isUS) {
      setError(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(val));
      return error;
    }
    // Postal code validation
    else {
      setError(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(val));
      return error;
    }
  };

  // const validateZip = (val) => {
  //   if(!codeIsValid(val)) {
  //     setError(true)
  //   }
  //   else {
  //     setError(false)
  //   }
  // };

  const getZipCodeVal = (e) => {
    e.preventDefault();
      onPanelClose(e);
      return document.getElementById("zipCode").value;
  }

  return (
    <>
      <Grid fluid>
        <Row style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
          <Col xs={11} sm={11} md={11} lg={11}>
            <Text style={{ fontSize: "18px", color: "#333333" }}>{t("changeDeliveryLocation")}</Text>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1} style={{ display: "flex", justifyContent: "flex-end" }}>
            <span onClick={onPanelClose} style={{ cursor: "pointer", height: "16px" }}><XIcon /></span>
          </Col>
        </Row>
        <Row style={{ marginTop: "4px" }}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={"espot"}><Text >{t("itemAvailability")}</Text> </div>
          </Col>
        </Row>
        <form>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextField id="zipCode" 
                onInput={(e) => {
                  codeIsValid(e.target.value)
                  console.log(codeIsValid(e.target.value))
                }} 
                size="small" 
                // type="number" 
                style={{ width: "100%", marginTop: "16px"}} 
                variant="outlined" 
                label={t("zipCode")} 
                />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Button 
                type="submit" 
                onClick={(e) => {
                  if(codeIsValid(e.target.value)) {
                    onUpdateDeliveryLocation(getZipCodeVal(e))
                  }
                  else { e.preventDefault()}
                  }
                } 
                style={{ width: "100%", marginTop: "12px" }}
              >
                {t("changeDeliveryLocation")}
              </Button>
            </Col>
          </Row>
        </form>
      </Grid>
    </>
  )
}

export default SidePanel