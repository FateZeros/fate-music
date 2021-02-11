const ROOT = '/'

// 发现音乐
const DISCOVERY = '/discovery'
const DISCOVERY_RECOMMENDATION = `${DISCOVERY}/recommendation`
const DISCOVERY_SONGLIST = `${DISCOVERY}/song-list`
const DISCOVERY_ANCHOR_FM = `${DISCOVERY}/anchor-fm`
const DISCOVERY_LEADERBOARD = `${DISCOVERY}/leaderboard`
const DISCOVERY_SINGER = `${DISCOVERY}/singer`
const DISCOVERY_LATEST_SONGS = `${DISCOVERY}/latest-songs`

// 私人FM
const FM = '/fm'

// 视频
const VIDEOS = '/videos'
const VIDEOS_LIST = `${VIDEOS}/list`
const VIDEOS_MV = `${VIDEOS}/mv`

const ALL_MVS = '/all-mvs'

// 朋友
const FIRENDS = '/firends'

// iTunes 音乐
const ITUNES = '/itunes'

// 下载
const DOWNLOAD = '/download'
const DOWNLOAD_SONGS = `${DOWNLOAD}/songs`
const DOWNLOAD_FILES = `${DOWNLOAD}/files`
const DOWNLOAD_DOWNING = `${DOWNLOAD}/downing`

// 我的云盘
const MY_CLOUD = '/my-cloud'

// 我的电台
const MY_FM = '/my-fm'

// 我的收藏
const MY_COLLECT = '/my-collect'
const MY_COLLECT_ALBUM = `${MY_COLLECT}/album`
const MY_COLLECT_SINGERS = `${MY_COLLECT}/singers`
const MY_COLLECT_VIDEOS = `${MY_COLLECT}/videos`
const MY_COLLECT_COLUMNS = `${MY_COLLECT}/columns`

const SETTING = '/setting'

// 每日推荐歌单
const DAILY_SONGS = '/daily-songs'

// 歌单详情
const SONGS_DETAIL = '/songs-detail'

const ROUTES = {
  ROOT,
  DISCOVERY,
  DISCOVERY_RECOMMENDATION,
  DISCOVERY_SONGLIST,
  DISCOVERY_ANCHOR_FM,
  DISCOVERY_LEADERBOARD,
  DISCOVERY_SINGER,
  DISCOVERY_LATEST_SONGS,
  FM,
  VIDEOS,
  VIDEOS_LIST,
  VIDEOS_MV,
  FIRENDS,
  ITUNES,
  DOWNLOAD,
  DOWNLOAD_SONGS,
  DOWNLOAD_FILES,
  DOWNLOAD_DOWNING,
  MY_CLOUD,
  MY_FM,
  MY_COLLECT,
  MY_COLLECT_ALBUM,
  MY_COLLECT_SINGERS,
  MY_COLLECT_VIDEOS,
  MY_COLLECT_COLUMNS,
  SETTING,
  DAILY_SONGS,
  ALL_MVS,
  SONGS_DETAIL
}

export default ROUTES
