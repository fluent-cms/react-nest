import { createSelector } from 'reselect'
import { getState, ModelState } from './modelReducer'
export const getModelState = (state:any) => state.modelReducer

export const selectModelLoadOneState = createSelector(
  getModelState,
  (s:any, repoName:string) => repoName,
  (states: ModelState[], repoName:string) => {
      return getState(states, repoName).loadOneState
  }
)

export const selectModelLoadAllState = createSelector(
  getModelState,
  (s:any, repoName:string) => repoName,
  (states: ModelState[], repoName:string) => {
      return getState(states, repoName).loadAllState
  }
)

export const selectModelLoadPageState = createSelector(
  getModelState,
  (s:any, repoName:string) => repoName,
  (states: ModelState[], repoName:string) => {
      return getState(states, repoName).loadPageState
  }
)

export const selectModelUpsertState = createSelector(
  getModelState,
  (s:any, repoName:string) => repoName,
  (states: ModelState[], repoName:string) => {
      return getState(states, repoName).upsertState
  }
)

export const selectModelDeleteState = createSelector(
  getModelState,
  (s:any, modelType:string) => modelType,
  (states: ModelState[], modelType:string) => {
      return getState(states, modelType).deleteState
  }
)
