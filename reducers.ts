import { ActionType, createReducer } from 'typesafe-actions';
import { initialStoreState } from './state';
import * as actions from './actions';

export const reduce = createReducer(initialStoreState)
  .handleAction(
    actions.incrementCounter,
    (state, action) => ({
      ...state,
      count: state.count + 1
    })
  )
  .handleAction(
    actions.updateDate,
    (state, action) => ({
      ...state,
      date: action.date
    })
  )
;