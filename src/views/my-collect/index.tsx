import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ROUTES from 'constants/routes'

const { Suspense, lazy } = React

const MyCollectAlbum = lazy(() => import('./album'))
const MyCollectSingers = lazy(() => import('./singers'))
const MyCollectVideos = lazy(() => import('./videos'))
const MyCollectColumns = lazy(() => import('./columns'))

const MyCollect = () => {
  return (
    <Fragment>
      <Suspense fallback={null}>
        <Switch>
          <Route
            exact
            path={ROUTES.MY_COLLECT_ALBUM}
            component={MyCollectAlbum}
          />
          <Route
            exact
            path={ROUTES.MY_COLLECT_SINGERS}
            component={MyCollectSingers}
          />
          <Route
            exact
            path={ROUTES.MY_COLLECT_VIDEOS}
            component={MyCollectVideos}
          />
          <Route
            exact
            path={ROUTES.MY_COLLECT_COLUMNS}
            component={MyCollectColumns}
          />
          <Redirect
            from={`${ROUTES.MY_COLLECT}`}
            to={ROUTES.MY_COLLECT_ALBUM}
          />
        </Switch>
      </Suspense>
    </Fragment>
  )
}

export default MyCollect
