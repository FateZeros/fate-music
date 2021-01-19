/**
 * [redux combineReducers](https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts)
 */
import React from 'react'
import { loginState, loginReducer } from './login'

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

  return (_, action) => {
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

const initState = {
  login: loginState
}

const ReducerContext = React.createContext<any>({})

export { ReducerContext, reducers, initState }
