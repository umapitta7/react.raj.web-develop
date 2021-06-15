import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import styled from 'styled-components';
import MyWarehouseIcon from 'forge-components/dist/components/Icon/svg-icons/LocationPin.js';
import DeliveryLocationIcon from 'forge-components/dist/components/Icon/svg-icons/BoxSolid.js';
import { useTranslation } from 'react-i18next';
import '../DeliveryLocationStyles.css';
import MyWarehouseSelection from '../../MyWarehouse/components/myWarehouseSelection';

const Wrapper = styled.div`
    width: 100%;
    margin-top: 4px;    
    font-size: 12px;
`;

const SetMyWarehouse = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;   
`;

const StoreHours = styled.div`
    color: #008000;
    font-size: 10px;
    margin-left: 15px;
`;

const Header = ({ onChangeDeliveryLocation, selectedZip, isGrocery, ...warehouse }) => {
    const { t } = useTranslation();

    return <>
        <Wrapper>
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={6} lg={6} xl={6}>
                        <Row className={"header-spacing"}>
                        <MyWarehouseSelection />  
                            <Grid fluid className="header-padding">
                            <Row>
                                {t("deliveryLocation")}
                            </Row>
                            <Row className="header-spacing">
                            <DeliveryLocationIcon className={"delivery-location-icon"} />
                            {selectedZip ? <a onClick={onChangeDeliveryLocation} className={"header-link"}>{selectedZip}</a> : <a onClick={onChangeDeliveryLocation} className={"header-link"}>{t("setDeliveryLocation")}</a>}
                            </Row>                       
                            </Grid>
                        </Row>
                    </Col>
                 </Row>
            </Grid>
        </Wrapper>
    </>
}

export default Header;