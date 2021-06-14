import './fulfillments.css';
import React, { PureComponent } from 'react';
import SameDayDelivery from './components/SameDayDelivery/SameDayDelivery';
import BuyInStoreOnly from './components/BuyInStoreOnly/BuyInStoreOnly';
import { Utils } from '../../utils';

class Fulfilments extends PureComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const { props } = this.props;
    console.log('this.props', this.props);
    const {
      productType,
      programType,
      buyInStoreOnly,
      sameDayDelivery
    } = props;

    return (
      <div className="wio-fulfilments">
        {!Utils.isEmpty(buyInStoreOnly?.inventory) && !Utils.isEmpty(productType) && productType !== 'BundleBean' && !Utils.isEmpty(programType) && programType === 'InWarehouse' ? <BuyInStoreOnly buyInStoreOnly={buyInStoreOnly} /> : null }
        {!Utils.isEmpty(productType) && productType !== 'BundleBean' && !Utils.isEmpty(programType) && programType === '3rdPartyDelivery' ? <SameDayDelivery sameDayDelivery={sameDayDelivery} /> : null }
      </div>
    );
  }
}
export default Fulfilments;
