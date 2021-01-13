import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ROUTES from 'constants/routes'

const { Suspense, lazy } = React

const Recommendation = lazy(() => import('./recommendation'))
const Songlist = lazy(() => import('./song-list'))
const AnchorFM = lazy(() => import('./anchor-fm'))
const LeaderBoard = lazy(() => import('./leaderboard'))
const Singer = lazy(() => import('./singer'))
const LatestSongs = lazy(() => import('./latest-songs'))

const Discovery = () => {
  return (
    <Fragment>
      <Suspense fallback={null}>
        <Switch>
          <Route
            exact
            path={ROUTES.DISCOVERY_RECOMMENDATION}
            component={Recommendation}
          />
          <Route exact path={ROUTES.DISCOVERY_SONGLIST} component={Songlist} />
          <Route exact path={ROUTES.DISCOVERY_ANCHOR_FM} component={AnchorFM} />
          <Route
            exact
            path={ROUTES.DISCOVERY_LEADERBOARD}
            component={LeaderBoard}
          />
          <Route exact path={ROUTES.DISCOVERY_SINGER} component={Singer} />
          <Route
            exact
            path={ROUTES.DISCOVERY_LATEST_SONGS}
            component={LatestSongs}
          />
          <Redirect
            from={`${ROUTES.DISCOVERY}`}
            to={ROUTES.DISCOVERY_RECOMMENDATION}
          />
        </Switch>
      </Suspense>
    </Fragment>
  )
}

export default Discovery
