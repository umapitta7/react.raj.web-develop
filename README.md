# react.costco.web

## Prereq's

- [Nodejs](https://nodejs.org/en/) installed (v14.15.1 at a minimum)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed
- [Yarn](https://yarnpkg.com/getting-started/install) installed
- Create React App (CRA) installed
  - _yarn global add create-react-app_
- VPN access to the corporate network for local development

## Installation

1. Logon to the corporate VPN
2. Clone source from the GitHub Enterprise repository
3. CD into project directory
4. Logoff the corporate VPN
5. Run the script "yarn install" to install the dependencies
6. Run "yarn custom-postinstall"
7. Logon to the corporate VPN
8. Run the script "yarn start"

A Browser tab will popup.

Try visiting http://localhost:3000/pdp.html

## Service Dependencies
- Warehouse Locator Service (Apigee)
  https://api-spt.costco.com/warehouseLocatorMobile/v1/warehouses.json
- Bing Maps Autosuggest
- Bing Maps Location
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors and warnings in the console.
### `yarn test --coverage --watchAll=false`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
