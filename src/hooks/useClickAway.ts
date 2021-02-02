import { RefObject, useEffect, useRef } from 'react'

const defaultEvents = ['mousedown', 'touchstart']

export const on = (obj: any, ...args: any[]) => obj.addEventListener(...args)
export const off = (obj: any, ...args: any[]) =>
  obj.removeEventListener(...args)

const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  excludeRef?: RefObject<HTMLElement | null>,
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
        const { current: excludeEl } = excludeRef
        if (!excludeEl) {
          el && !el.contains(event.target) && savedCallback.current(event)
        }
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
    [events, ref, excludeRef]
  )
}

export default useClickAway
