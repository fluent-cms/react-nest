import { ModelActionTypes, GetModelRequest, DeleteModelRequest, CreateModelRequest, UpdateModelRequest } from "./modelActions"
import { FetchRequest } from "../fetch/fetchActions";
import { buildQueryParam } from "../../share/query/query-params";
import { rootStore } from './../store/store';
import { QueryResultsModel } from "../../share/query/query-results.model";
import { selectModelLoadAllState, selectModelLoadPageState } from './modelSelector';
import { BatchParamerter } from "share/query/batch-params";
import { myDispatch } from "core/utilities/myDispatch";

const getUrl = (modelType: string) => `model/${modelType}/`


export const modelMiddleware = ({ dispatch }: any) => (next: any) => (action: any) => {
  next(action);
  switch (action.type) {
    case ModelActionTypes.DeleteModelRequst: {
      const { payload: { repoName, ids } } = action as DeleteModelRequest
      const batchParam: BatchParamerter = {
        action:'delete',
        ids
      }
      
      myDispatch(dispatch,new FetchRequest(
        'PUT',
        getUrl(repoName),
        action.payload,
        batchParam,
        ModelActionTypes.ModelDeleted,
        ModelActionTypes.ModelDeleteError))
      break
    }

    case ModelActionTypes.GetModelRequest: {
      const { payload } = action as GetModelRequest
      const {repoName, query } = payload

      if (query.q === 'one') {
        const pageState = selectModelLoadPageState(rootStore.getState(),repoName)
        const item = pageState.items.find(x => x.id === query.id)
        if (item) {
          myDispatch(dispatch,{type:ModelActionTypes.ModelLoaded, payload:{...payload, result:new QueryResultsModel([item])}})
          break
        }
      } else if (query.q === 'all' && selectModelLoadAllState(rootStore.getState(), repoName).status==='Succeed' ) {
        break
      }
    

      myDispatch(dispatch,new FetchRequest(
          'GET',
          getUrl(repoName) + buildQueryParam(query),
          action.payload,
          null,
          ModelActionTypes.ModelLoaded,
          ModelActionTypes.ModelLoadError))
      break
    }
    case ModelActionTypes.CreateModelRequest: {
      const { payload: { repoName, model } } = action as CreateModelRequest
      myDispatch(dispatch,
        new FetchRequest(
          'POST',
          getUrl(repoName),
          action.payload,
          model,
          ModelActionTypes.ModelCreated,
          ModelActionTypes.ModelUpsertError)
      )
      break
    }
    case ModelActionTypes.UpdateModelRequest: {
      const { payload: { repoName, model } } = action as UpdateModelRequest
      myDispatch(dispatch,
        new FetchRequest(
          'PUT',
          getUrl(repoName) + model.id + "/",
          action.payload,
          model,
          ModelActionTypes.ModelUpdated,
          ModelActionTypes.ModelUpsertError)
      )
      break
    }
  }
}