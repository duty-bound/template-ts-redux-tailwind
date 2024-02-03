import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { ui, uiInitialState, IUI } from './ui-slice'

export interface IState {
  ui: IUI
}

const initialState: IState = {
  ui: uiInitialState
}

const reducer = {
  ui
}

const initStore = (preloadedState = initialState): EnhancedStore => configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export const store = initStore(initialState)

export type AppDispatch = typeof store.dispatch

export { useAppSelector, useAppDispatch } from './hooks'
