import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'components/layout'
import ROUTES from 'constants/routes'
import { ReducerContext, reducers } from 'reducers'

const { lazy, Suspense, useReducer } = React

const Discovery = lazy(() => import('views/discovery'))
const FM = lazy(() => import('views/fm'))
const Video = lazy(() => import('views/videos'))
const Friends = lazy(() => import('views/friends'))
const Itunes = lazy(() => import('views/itunes'))
const Download = lazy(() => import('views/download'))
const MyCloud = lazy(() => import('views/my-cloud'))
const MyFM = lazy(() => import('views/my-fm'))
const MyCollect = lazy(() => import('views/my-collect'))
const Setting = lazy(() => import('views/setting'))
const DailySongs = lazy(() => import('views/daily-songs'))
const AllMVs = lazy(() => import('views/all-mvs'))

const App = () => {
  const initState = reducers()
  const reducer = useReducer(reducers, initState)

  return (
    <Router>
      <ReducerContext.Provider value={reducer}>
        <Layout>
          <Suspense fallback={<div>加载中...</div>}>
            <Switch>
              <Route path={ROUTES.DISCOVERY} component={Discovery} />
              <Route path={ROUTES.FM} component={FM} />
              <Route path={ROUTES.VIDEOS} component={Video} />
              <Route path={ROUTES.FIRENDS} component={Friends} />
              <Route path={ROUTES.ITUNES} component={Itunes} />
              <Route path={ROUTES.DOWNLOAD} component={Download} />
              <Route path={ROUTES.MY_CLOUD} component={MyCloud} />
              <Route path={ROUTES.MY_FM} component={MyFM} />
              <Route path={ROUTES.MY_COLLECT} component={MyCollect} />
              <Route path={ROUTES.SETTING} component={Setting} />
              <Route path={ROUTES.DAILY_SONGS} component={DailySongs} />
              <Route path={ROUTES.ALL_MVS} component={AllMVs} />
              <Redirect from={ROUTES.ROOT} to={ROUTES.DISCOVERY} />
            </Switch>
          </Suspense>
        </Layout>
      </ReducerContext.Provider>
    </Router>
  )
}

export default App
