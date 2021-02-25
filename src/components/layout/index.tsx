import React, { lazy, Suspense, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import MusicPlayer from 'components/music-player'
import LoginModal from 'components/login'
import UserInfoModal from 'components/user-info'
import ROUTES from 'constants/routes'

import Header from './header'
import Sidebar from './sidebar'
import styles from './index.module.scss'

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
const SongsDetail = lazy(() => import('views/songs-detail'))
const SongResultDetail = lazy(() => import('views/song-result-detail'))
const ArtistResultDetail = lazy(() => import('views/artist-result-detail'))
const AlbumsResultDetail = lazy(() => import('views/albums-result-detail'))

const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div className={styles['music-container']}>
        <Sidebar />
        <div id="music-content" className={styles['music-content']}>
          {children}
        </div>
      </div>
      <MusicPlayer />
      <LoginModal />
      <UserInfoModal />
    </Fragment>
  )
}

/**
 * 主路由即 Layout 下路由
 */
const HomeRoute = () => {
  return (
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
          <Route path={ROUTES.SONGS_DETAIL} component={SongsDetail} />
          <Route
            path={ROUTES.SONG_RESULT_DETAIL}
            component={SongResultDetail}
          />
          <Route
            path={ROUTES.ARTIST_RESULT_DETAIL}
            component={ArtistResultDetail}
          />
          <Route
            path={ROUTES.ALBUMS_RESULT_DETAIL}
            component={AlbumsResultDetail}
          />
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default HomeRoute
