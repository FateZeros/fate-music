import { RefObject, useEffect, useRef } from 'react'

const defaultEvents = ['mousedown', 'touchstart']

export const on = (obj: any, ...args: any[]) => obj.addEventListener(...args)
export const off = (obj: any, ...args: any[]) =>
  obj.removeEventListener(...args)

/**
 * @param ref
 * @param onClickAway
 * @param events
 * 目标元素已显示
 * 1. 目标元素以外的元素 & 不是触发显示的元素 点击则隐藏
 * 2. 目标元素以外的元素 & 是触发显示的元素 点击不触发 clickAway
 */
const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway)

  useEffect(
    () => {
      savedCallback.current = onClickAway
    },
    [onClickAway]
  )

  useEffect(
    () => {
      const handler = (event: any) => {
        const { current: el } = ref
        // 目标元素内的元素点击事件，不触发 clickAway
        el && !el.contains(event.target) && savedCallback.current(event)
      }

      for (const eventName of events) {
        on(document, eventName, handler)
      }

      return () => {
        for (const eventName of events) {
          off(document, eventName, handler)
        }
      }
    },
    [events, ref]
  )
}

export default useClickAway
