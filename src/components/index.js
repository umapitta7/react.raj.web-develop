import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import {
  MuiCostcoTheme,
  StyledCostcoTheme,
} from 'forge-components/dist/global/CostcoTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import { AppInit } from './bootstraping/lazyloading';
import { Utils } from './utils';
import './translations/language';
import { siblingComponentList } from './bootstraping/bootstrapping';

/* Customized Bootstrapping process for WIO and No check-ins allowed in this file */
/* For Any modifications Reach out Nithyanandan c_nsathiyaathan@costo.com */

const componentList = siblingComponentList();
const widegets = document.querySelectorAll('[data-module]');
if (!Utils.isEmpty(widegets)) {
  widegets.forEach((value, key) => {
    const module = widegets[key].getAttribute('data-module');
    // eslint-disable-next-line dot-notation
    const ComponentName = componentList[module];
    const selector = value.getAttribute('id');
    const { reactObj } = window;
    const reactProps = {};
    const componentJSON = window.reactObj[module];
    if (!Utils.isEmpty(componentJSON)) {
      Object.assign(reactProps, componentJSON);
    }

    if (!Utils.isEmpty(reactObj.global)) {
      Object.assign(reactProps, reactObj.global);
    }

    if (!Utils.isEmpty(module) && !Utils.isEmpty(ComponentName) && !Utils.isEmpty(selector)) {
      ReactDOM.render(
        <React.StrictMode>
          <Suspense fallback={(
            // <div className="skeleton-card">
            //   <div className="skeleton-description">
            //     <div className="skeleton-line skeleton-line-1" />
            //     <div className="skeleton-line skeleton-line-2" />
            //     <div className="skeleton-line skeleton-line-3" />
            //   </div>
            // </div>
            <div />
          )}
          >
            <StyledThemeProvider theme={StyledCostcoTheme}>
              <MuiThemeProvider theme={MuiCostcoTheme}>
                <ComponentName props={reactProps} />
              </MuiThemeProvider>
            </StyledThemeProvider>
          </Suspense>
        </React.StrictMode>,
        document.getElementById(selector)
      );
      console.log(`${module} component initialized ${selector}`);
    } else {
      console.log(`${module} Problem in initializing ${selector}`);
    }
  });
} else {
  console.log('Exception occurred in DOM');
}

// console.log(currentPage);
// if (!Utils.isEmpty(currentPage) && !Utils.isEmpty(bootstrapConfig)) {
//   console.log('bootstrapConfig', bootstrapConfig);
//   // Important Please do not Modify any logics here.
//   bootstrapConfig.forEach((value, key) => {
//     console.log(`${value.selector} component initialized ${key}`);
//     const ComponentName = value.lazyComponent;
//     const { selector } = value;
//     // Important Please do not Modify any logics here.
//     ReactDOM.render(
//       <React.StrictMode>
//         <Suspense fallback={<div>loading</div>}>
//           <StyledThemeProvider theme={StyledCostcoTheme}>
//             <MuiThemeProvider theme={MuiCostcoTheme}>
//               <ComponentName />
//             </MuiThemeProvider>
//           </StyledThemeProvider>
//         </Suspense>
//       </React.StrictMode>,
//       document.getElementById(selector)
//     );
//   });

// ReactDOM.render(
//   <React.StrictMode>
//     <App2 />
//   </React.StrictMode>,
//   document.getElementById('root1')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
