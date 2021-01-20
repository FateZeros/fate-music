/**
 * [redux combineReducers](https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts)
 * https://github.com/StringLiu2/hooks-useReducer-integration
 * https://github.com/zouxiaomingya/blog/blob/master/src/connect.js
 */
import React from 'react'
import loginReducer from './login'

const combineReducer = reducers => {
  const reducerKeys = Object.keys(reducers)
  let objInitState = {}

  reducerKeys.forEach(key => {
    const initState = reducers[key](undefined, { type: '' })
    if (initState === 'undefined') {
      throw new Error(`${key} does not return state.`)
    }
    objInitState[key] = initState
  })

  return (action?: any) => {
    if (action) {
      reducerKeys.forEach(key => {
        const previousState = objInitState[key]
        objInitState[key] = reducers[key](previousState, action)
      })
    }

    return { ...objInitState }
  }
}

// combineReducer 合并 reducer
const reducers = combineReducer({
  login: loginReducer
})

const ReducerContext = React.createContext<any>({})

export { ReducerContext, reducers }
