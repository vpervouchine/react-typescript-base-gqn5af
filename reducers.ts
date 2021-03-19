import { ActionType, createReducer } from 'typesafe-actions';
import { initialStoreState } from './state';
import * as actions from './actions';

export const reduce = createReducer(initialStoreState)
/*
  .handleAction(
    actions.incrementCounter,
    (state, action) => ({
      ...state,
      count: state.count + action.inc
    })
  )
  .handleAction(
    actions.updateDate,
    (state, action) => ({
      ...state,
      date: action.date
    })
  )
  */
  .handleAction(
    actions.addTask,
    (state, action) => ({
      ...state,
      taskList: [
        ...(state.taskList),
        {
          name: action.task,
          desc: action.desc
        }
      ]
    })
  )
;