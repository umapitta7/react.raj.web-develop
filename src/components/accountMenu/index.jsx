/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent, Suspense } from 'react';
import './index.css';
import '../../translations/language';
import App from './app';

class Index extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { props: { signout } } = this.props;

    return (
      <div>
        <Suspense fallback="">
          <App signout={signout} />
        </Suspense>
      </div>
    );
  }
}

export default Index;
