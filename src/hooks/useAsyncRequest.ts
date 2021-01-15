/*
 * hooks 异步调用 API
 */
import { useState, useCallback, useRef, DependencyList } from 'react'
import useMountedState from './useMountedState'

type AsyncRequestState<T> = {
  loading: boolean | false
  error?: undefined | Error
  value?: undefined | T
}

type AsyncRequestFn<Result = any, Args extends any[] = any[]> = [
  AsyncRequestState<Result>,
  (...args: Args) => Promise<Result | null>
]

interface IRequestOptions<Result> {
  initialState: AsyncRequestState<Result>
  deps: DependencyList
  successHandler?: (value: Result) => void
  errorHandler?: (error: Error) => void
}

export default function useAsyncRequest<
  Result = any,
  Args extends any[] = any[]
>(
  fn: (...args: any) => Promise<Result>,
  options: IRequestOptions<Result> = {
    initialState: { loading: false },
    deps: []
  }
): AsyncRequestFn<Result, Args> {
  const {
    initialState = { loading: false },
    deps = [],
    successHandler,
    errorHandler
  } = options
  const lastCallId = useRef(0)

  const [state, set] = useState<AsyncRequestState<Result>>(initialState)

  const isMounted = useMountedState()

  const callback = useCallback((...args: Args) => {
    const callId = ++lastCallId.current
    set({ loading: true })

    return fn(...args)
      .then(value => {
        // console.log(value, '=== 接口 200 返回 ===')
        const callback = args[args.length - 1]

        if (isMounted() && callId === lastCallId.current) {
          successHandler && successHandler(value)
          if (typeof callback === 'function') {
            callback()
          }
          set({ value, loading: false })
        }
        return value
      })
      .catch(error => {
        console.log(error, '=== useAsyncRequest ===')
        if (isMounted() && callId === lastCallId.current) {
          errorHandler && errorHandler(error)
          set({ error, loading: false })
        }
        return null
      })
  }, deps)

  return [state, callback]
}
