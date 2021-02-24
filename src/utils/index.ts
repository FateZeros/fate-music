// 空方法
export const noop = () => {}

// 数量格式化
export const formatPlayCount = (num = 0) => {
  let result = ''

  if (num > Math.pow(10, 8)) {
    result = (num / Math.pow(10, 8)).toFixed(3) + '亿'
  } else if (num > Math.pow(10, 4)) {
    result = Math.round(num / Math.pow(10, 4)) + '万'
  } else {
    return num
  }

  return result
}

/**
 * @param num
 * @param n
 */
export const formatNum = (num: number | string, n = 2) => {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

// 歌曲时长 毫秒
export const formatSongTime = (duration?: number) => {
  const durationSec = Math.floor(duration || 0)
  const minute = formatNum(Math.floor(durationSec / 1000 / 60))
  const second = formatNum(Math.floor(durationSec / 1000) % 60)
  return `${minute}:${second}`
}

// 取有范围的随机数
export const randomNumber = (max: number = 1, min: number = 0) => {
  if (min < 0) {
    return max
  }
  return Math.floor(Math.random() * (max - min) + min)
}

// 生成 ID
export const getKey = (): number => {
  const id = (function*() {
    let mil = new Date().getTime()

    while (true) {
      yield (mil += 1)
    }
  })()
  return id.next().value
}

export const debounce = (fn: (...args: any[]) => void, interval: number) => {
  let timer: NodeJS.Timeout | null = null

  return function(...args: any[]) {
    const ctx = this

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(ctx, args)
    }, interval)
  }
}
