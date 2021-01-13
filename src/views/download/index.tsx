import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ROUTES from 'constants/routes'

const { Suspense, lazy } = React

const DownloadSongs = lazy(() => import('./songs'))
const DownloadFiles = lazy(() => import('./files'))
const DownloadDowning = lazy(() => import('./downing'))

const Download = () => {
  return (
    <Fragment>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path={ROUTES.DOWNLOAD_SONGS} component={DownloadSongs} />
          <Route exact path={ROUTES.DOWNLOAD_FILES} component={DownloadFiles} />
          <Route
            exact
            path={ROUTES.DOWNLOAD_DOWNING}
            component={DownloadDowning}
          />
          <Redirect from={`${ROUTES.DOWNLOAD}`} to={ROUTES.DOWNLOAD_SONGS} />
        </Switch>
      </Suspense>
    </Fragment>
  )
}

export default Download
