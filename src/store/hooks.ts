import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import type { IState } from '.'

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>

export const useAppDispatch = (): any => useDispatch<TypedDispatch<IState>>()
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector

// the above solution is from:
//  - https://github.com/reduxjs/redux-thunk/issues/333#issuecomment-1286695992
//  - without it, when using dispatch, such as `dispatch(signedInToDrive(clientToken))` would cause TS to complain:
//    - "Argument of type 'AsyncThunkAction<string, string, AsyncThunkConfig>' is not assignable to parameter of type 'AnyAction'.ts(2345)"
