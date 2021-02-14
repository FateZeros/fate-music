import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'qs'

import LinkTitle from 'components/link-title'
// import ROUTES from 'constants/routes'
import VideoPlayer from 'components/mv-player'
import * as videoApis from 'apis/video'
import useAsyncRequest from 'hooks/useAsyncRequest'
import CommonButtonNum from 'components/common-button-num'
import CommentInput from 'components/comment-input'
import PlayCount from 'components/play-count'
import { formatSongTime } from 'utils'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

const { useEffect, useState } = React
/**
 * MV 详情
 * [参考](https://segmentfault.com/a/1190000009395289)
 */
const MvDetail = () => {
  const history = useHistory()
  const { search } = useLocation()
  const { id } = qs.parse(search.substr(1))

  const [mvState, getMvDetail] = useAsyncRequest(videoApis.getMvDetail)
  const mvValue: any = mvState.value || {}
  const [mvUrlState, getMvUrl] = useAsyncRequest(videoApis.getMvUrl)
  const mvUrlValue: any = mvUrlState.value || {}
  const [mvDetailInfoState, getMvDetailInfo] = useAsyncRequest(
    videoApis.getMvDetailInfo
  )
  const mvDetailInfo: any = mvDetailInfoState.value || {}
  const [mvSimiState, getSimiMv] = useAsyncRequest(videoApis.getSimiMv)
  const mvSimiList: any = mvSimiState.value || []
  const [artistImg, setArtistImg] = useState('')
  const [artistNames, setArtistNames] = useState('')

  useEffect(
    () => {
      if (id) {
        getMvDetail({
          mvid: id
        })
        getMvUrl({
          id
        })
        getMvDetailInfo({
          mvid: id
        })
        getSimiMv({
          mvid: id
        })
      }
    },
    [id, getMvDetail, getMvUrl, getMvDetailInfo, getSimiMv]
  )

  useEffect(
    () => {
      if (mvValue.artists && mvValue.artists.length) {
        let artistImg: any = ''
        const artistNames: string[] = []
        mvValue.artists.forEach((i, index) => {
          if (index === 0) {
            artistImg = i.img1v1Url
          }
          artistNames.push(i.name)
        })
        setArtistImg(artistImg)
        setArtistNames(artistNames.join('/'))
      }
    },
    [mvValue.artists, setArtistNames]
  )

  const handleChangeMvDetail = id => {
    history.push({
      pathname: ROUTES.MV_DETAIL,
      search: `id=${id}`
    })
  }

  return (
    <div className={styles['mv-detail']}>
      <div className={styles['detail-content']}>
        <LinkTitle title="MV详情" />
        <VideoPlayer url={mvUrlValue.url} poster={mvValue.cover} />
        <div className={styles['mv-artist-info']}>
          <div className={styles['artist-img']}>
            <img src={artistImg} loading="lazy" alt="" />
          </div>
          <div className={styles['artist-names']}>{artistNames}</div>
        </div>
        <div className={styles['mv-name']}>{mvValue.name}</div>
        <div className={styles['mv-other-row']}>
          发布：{mvValue.publishTime}
        </div>
        <div className={styles['video-action-row']}>
          <CommonButtonNum
            name="thumb"
            word="赞"
            num={mvDetailInfo.likedCount}
          />
          <CommonButtonNum
            name="collect-songs"
            word="收藏"
            num={mvValue.subCount}
          />
          <CommonButtonNum name="share" word="分享" num={mvValue.shareCount} />
        </div>
        <div className={styles['comment-wrap']}>
          <div className={styles['comment-title']}>
            听友评论
            <span>(已有{mvDetailInfo.commentCount}条评论)</span>
          </div>
          <CommentInput hasBorderTop={false} />
        </div>
      </div>
      <div className={styles['recomment-mv']}>
        <div className={styles['recomment-title']}>相关推荐</div>
        <ul className={styles['recomment-list']}>
          {mvSimiList.map(item => {
            return (
              <li key={item.id}>
                <div
                  className={styles['recomment-img']}
                  onClick={() => handleChangeMvDetail(item.id)}
                >
                  <PlayCount count={item.playCount} />
                  <img src={item.cover} loading="lazy" alt="" />
                  <div className={styles['video-time']}>
                    {formatSongTime(item.duration)}
                  </div>
                </div>
                <div className={styles['recomment-info']}>
                  <div className={styles['info-name']}>{item.name}</div>
                  <div className={styles['info-art']}>by {item.artistName}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default MvDetail
