// 空方法
export const noop = () => {}

// 播放量
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
