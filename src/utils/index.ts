// 空方法
export const noop = () => {}

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
