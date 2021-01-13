import ROUTES from 'constants/routes'

export const NAVBAR = {
  [ROUTES.DISCOVERY]: [
    {
      label: '个性推荐',
      route: ROUTES.DISCOVERY_RECOMMENDATION
    },
    {
      label: '歌单',
      route: ROUTES.DISCOVERY_SONGLIST
    },
    {
      label: '主播电台',
      route: ROUTES.DISCOVERY_ANCHOR_FM
    },
    {
      label: '排行榜',
      route: ROUTES.DISCOVERY_LEADERBOARD
    },
    {
      label: '歌手',
      route: ROUTES.DISCOVERY_SINGER
    },
    {
      label: '最新音乐',
      route: ROUTES.DISCOVERY_LATEST_SONGS
    }
  ],
  [ROUTES.VIDEOS]: [
    {
      label: '视频',
      route: ROUTES.VIDEOS_LIST
    },
    {
      label: 'MV',
      route: ROUTES.VIDEOS_MV
    }
  ],
  [ROUTES.FIRENDS]: [
    {
      label: '动态'
    }
  ],
  [ROUTES.ITUNES]: [
    {
      label: 'ITUNES'
    }
  ],
  [ROUTES.DOWNLOAD]: [
    {
      label: '已下载单曲',
      route: ROUTES.DOWNLOAD_SONGS
    },
    {
      label: '已下载节目',
      route: ROUTES.DOWNLOAD_FILES
    },
    {
      label: '正在下载',
      route: ROUTES.DOWNLOAD_DOWNING
    }
  ],
  [ROUTES.MY_CLOUD]: [
    {
      label: '我的音乐云盘'
    }
  ],
  [ROUTES.MY_FM]: [
    {
      label: '我的电台'
    }
  ],
  [ROUTES.MY_COLLECT]: [
    {
      label: '专辑',
      route: ROUTES.MY_COLLECT_ALBUM
    },
    {
      label: '歌手',
      route: ROUTES.MY_COLLECT_SINGERS
    },
    {
      label: '视频',
      route: ROUTES.MY_COLLECT_VIDEOS
    },
    {
      label: '专栏',
      route: ROUTES.MY_COLLECT_COLUMNS
    }
  ]
}
