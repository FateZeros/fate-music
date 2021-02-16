import React, { useReducer } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { ReducerContext, reducers } from 'reducers'
import ROUTES from 'constants/routes'
import HomeRoute from 'components/layout'
import MiniMusicPlayer from 'components/mini-music-player'
import MvDetail from 'views/mv-detail'

import styles from './app.module.scss'

const App = () => {
  const initState = reducers()
  const reducer = useReducer(reducers, initState)

  return (
    <Router>
      <ReducerContext.Provider value={reducer}>
        <div className={styles['fate-music']}>
          <Switch>
            <Route path={ROUTES.HOME} component={HomeRoute} />
            <Route path={ROUTES.MV_DETAIL} component={MvDetail} />
            <Route
              path={ROUTES.MINI_MUSIC_PLAYER}
              component={MiniMusicPlayer}
            />
            <Redirect exact from={ROUTES.ROOT} to={ROUTES.DISCOVERY} />
          </Switch>
        </div>
      </ReducerContext.Provider>
    </Router>
  )
}

export default App
