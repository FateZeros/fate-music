import React from 'react'
import cn from 'classnames'
import { useHistory } from 'react-router-dom'

import ROUTES from 'constants/routes'
import { ISearchSuggestResponse } from 'interfaces/search'

import styles from './index.result.module.scss'

interface IProps {
  searchWord: string
  searchResultValue: ISearchSuggestResponse
  onHideSearchList: () => void
}

/**
 * 搜索结果 - 简要结果 海阔天空
 */
const SearchResult: React.FC<IProps> = ({
  searchWord,
  searchResultValue = {},
  onHideSearchList
}) => {
  const history = useHistory()
  const {
    artists = [],
    playlists = [],
    albums = [],
    songs = [],
    order = []
  } = searchResultValue
  const typeObj = {
    artists: '歌手',
    playlists: '歌单',
    albums: '专辑',
    songs: '歌曲'
  }

  const getSongArtistName = (artists, alias = []) => {
    let artistName: string[] = alias
    if (Array.isArray(artists) && artistName.length === 0) {
      artists.forEach(item => {
        artistName.push(item.name)
      })
    }
    return artistName.join('/')
  }

  const matchSearchWord = name => {
    const reg = new RegExp(`(${searchWord})`, 'g')
    let macthName = ''
    if (name) {
      macthName = name.replace(reg, '<span>$1</span>')
    }
    return macthName
  }

  const handleGoResultDetail = (type, info) => {
    onHideSearchList()
    switch (type) {
      case 'artists': {
        history.push({
          pathname: ROUTES.ARTIST_RESULT_DETAIL
        })
        break
      }
      case 'playlists': {
        history.push({
          pathname: ROUTES.SONGS_DETAIL,
          search: `id=${info.id}&type=3`
        })
        break
      }
      case 'albums': {
        history.push({
          pathname: ROUTES.ALBUMS_RESULT_DETAIL
        })
        break
      }
      case 'songs': {
        history.push({
          pathname: ROUTES.SONG_RESULT_DETAIL,
          search: `word=${searchWord}&type=1`
        })
        break
      }
      default:
        break
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles['search-word-row']}>
        搜 <span>{searchWord}</span> 相关结果 {'>'}
      </div>
      {order.map(item => {
        return (
          <div className={styles['search-result-type']} key={item}>
            <div
              className={cn(
                styles['search-result-title'],
                styles[`title-${item}`]
              )}
            >
              {typeObj[item]}
            </div>
            {item === 'artists' ? (
              <ul className={styles['search-result-list']}>
                {artists.map(artistsItem => (
                  <li
                    key={artistsItem.id}
                    dangerouslySetInnerHTML={{
                      __html: matchSearchWord(artistsItem.name)
                    }}
                    onClick={() => handleGoResultDetail(item, artistsItem)}
                  />
                ))}
              </ul>
            ) : null}
            {item === 'songs' ? (
              <ul className={styles['search-result-list']}>
                {songs.map(songItem => (
                  <li
                    key={songItem.id}
                    dangerouslySetInnerHTML={{
                      __html: `${matchSearchWord(
                        `${songItem.name} - ${getSongArtistName(
                          songItem.artists,
                          songItem.alias
                        )}`
                      )}`
                    }}
                    onClick={() => handleGoResultDetail(item, songItem)}
                  />
                ))}
              </ul>
            ) : null}
            {item === 'albums' ? (
              <ul className={styles['search-result-list']}>
                {albums.map(albumsItem => (
                  <li
                    key={albumsItem.id}
                    dangerouslySetInnerHTML={{
                      __html: matchSearchWord(
                        `${albumsItem.name} - ${albumsItem.artist &&
                          albumsItem.artist.name}`
                      )
                    }}
                    onClick={() => handleGoResultDetail(item, albumsItem)}
                  />
                ))}
              </ul>
            ) : null}
            {item === 'playlists' ? (
              <ul className={styles['search-result-list']}>
                {playlists.map(playlistsItem => (
                  <li
                    key={playlistsItem.id}
                    dangerouslySetInnerHTML={{
                      __html: matchSearchWord(playlistsItem.name)
                    }}
                    onClick={() => handleGoResultDetail(item, playlistsItem)}
                  />
                ))}
              </ul>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default SearchResult
