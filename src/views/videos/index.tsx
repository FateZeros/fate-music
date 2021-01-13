import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ROUTES from 'constants/routes'

const { Suspense, lazy } = React

const VideoList = lazy(() => import('./list'))
const VideoMV = lazy(() => import('./mv'))

const Videos = () => {
  return (
    <Fragment>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path={ROUTES.VIDEOS_LIST} component={VideoList} />
          <Route exact path={ROUTES.VIDEOS_MV} component={VideoMV} />
          <Redirect from={`${ROUTES.VIDEOS}`} to={ROUTES.VIDEOS_LIST} />
        </Switch>
      </Suspense>
    </Fragment>
  )
}

export default Videos
