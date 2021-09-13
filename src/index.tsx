/* eslint-disable */

import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { Provider } from 'react-redux'
import store from './store'

// import { OidcConfig } from './configs/oidc-config';


// let oidc= { ...OidcConfig };
// let url =
//     ((window as any)._env_.REACT_APP_APIURL || process.env.REACT_APP_APIURL) ??
//     undefined;

// oidc.authority =
//     ((window as any)._env_.REACT_APP_AUTHORITY ||
//         process.env.REACT_APP_AUTHORITY) ??
//     oidc.authority;
// oidc.redirect_uri =
//     ((window as any)._env_.REACT_APP_REDIRECTURL ||
//         process.env.REACT_APP_REDIRECTURL) ??
//     oidc.redirect_uri;
// oidc.client_id =
//     ((window as any)._env_.REACT_APP_CLIENTID ||
//         process.env.REACT_APP_CLIENTID) ??
//     oidc.client_id;
// oidc.response_type =
//     ((window as any)._env_.REACT_APP_RESPONSETYPE ||
//         process.env.REACT_APP_RESPONSETYPE) ??
//     oidc.response_type;
// oidc.scope =
//     ((window as any)._env_.REACT_APP_SCOPE || process.env.REACT_APP_SCOPE) ??
//     oidc.scope;
// oidc.post_logout_redirect_uri =
//     ((window as any)._env_.REACT_APP_POSTLOGOUTREDIRECTURL ||
//         process.env.REACT_APP_POSTLOGOUTREDIRECTURL) ??
//     oidc.post_logout_redirect_uri;
// oidc.silent_redirect_uri =
//     ((window as any)._env_.REACT_APP_SLIENTREDIRECTURL ||
//         process.env.REACT_APP_SLIENTREDIRECTURL) ??
//     oidc.silent_redirect_uri;
// oidc.automaticSilentRenew =
//     (window as any)._env_.REACT_APP_AUTOMATICSILENTRENEW !== undefined
//         ? (window as any)._env_.REACT_APP_AUTOMATICSILENTRENEW.toUpperCase() ===
//           'TRUE'
//         : process.env.REACT_APP_AUTOMATICSILENTRENEW !== undefined
//         ? process.env.REACT_APP_AUTOMATICSILENTRENEW.toUpperCase() === 'TRUE'
//         : oidc.automaticSilentRenew;
// oidc.loadUserInfo =
//     (window as any)._env_.REACT_APP_LOADUSERINFO !== undefined
//         ? (window as any)._env_.REACT_APP_LOADUSERINFO.toUpperCase() === 'TRUE'
//         : process.env.REACT_APP_LOADUSERINFO !== undefined
//         ? process.env.REACT_APP_LOADUSERINFO.toUpperCase() === 'TRUE'
//         : oidc.loadUserInfo;

// React.icons = icons

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
