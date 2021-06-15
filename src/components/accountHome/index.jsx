import React, { Suspense } from 'react';
import App from './app';
import './index.css';
import '../../translations/language';

// Note I don't set a fallback value for Suspense but we should add something.
const Index = () => (
  <div>
    <Suspense fallback="">
      <App />
    </Suspense>
  </div>
);

export default Index;
