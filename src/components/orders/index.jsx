/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent, Suspense } from 'react';
import '../../translations/language';
import App from './app';
import Layout from '../Layout/Layout';

class Index extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { props: { signout } } = this.props;

    return (
      <div>
        <Suspense fallback="">
          <Layout signout={signout}>
            <App />
          </Layout>
        </Suspense>
      </div>
    );
  }
}

export default Index;
