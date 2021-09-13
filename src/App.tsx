/* eslint-disable */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { oidcLog,  AuthenticationProvider} from '@axa-fr/react-oidc-context';
import {OidcConfig} from './configs/oidc-config'
import './scss/style.scss';
import Loading from './reusable/Loading';
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

const App = () => {
  return (
    <>
          <BrowserRouter>
             <AuthenticationProvider
                configuration={OidcConfig}
                loggerLevel={oidcLog.DEBUG}
                callbackComponentOverride={Loading}
                isEnabled={true}
                authenticating={Loading}
              >
                <React.Suspense fallback={<Loading />} >
                  <Switch>
                    <Route path="/" render={(props: any) => <TheLayout {...props}/>} />
                  </Switch>
                </React.Suspense>
              </AuthenticationProvider>
            </BrowserRouter>
         </>
  )
}
export default App;