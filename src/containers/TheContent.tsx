/* eslint-disable */

import React, { Suspense } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { useReactOidc } from '@axa-fr/react-oidc-context';

// routes config
import routes from '../routes'
import Home from '../views/Home';

const LLoading = () => {
  return(
      <>
        <div className="pt-3 text-center">
          <div className="sk-spinner sk-spinner-pulse"></div>
        </div>
      </>
  )

}

const TheContent = () => {
  const { oidcUser} = useReactOidc();

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={<LLoading />}>
          <Switch>
            <Route path="/authentication/callback" component={Home} />
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={(props:any) => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)