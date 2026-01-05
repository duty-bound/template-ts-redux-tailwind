import { configureStore } from '@reduxjs/toolkit'
import { ui, uiInitialState, IUI } from './ui-slice'

export interface IState {
  ui: IUI
}

export const initialState: IState = {
  ui: uiInitialState,
}

export const store = configureStore({
  reducer: { ui },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export * from './ui-slice'

export { useAppSelector, useAppDispatch } from './hooks'
