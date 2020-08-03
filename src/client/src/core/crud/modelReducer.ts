import { ModelActionTypes, GetModelRequest,  DeleteModelRequest, CreateModelRequest, UpdateModelRequest, ResetCRUDState } from "./modelActions"
import { QueryParamsModel } from "../../share/query/query-params";
import { QueryResultsModel } from "../../share/query/query-results.model";

export type StateStatusEnum = 'Init' | 'Loading' | 'Succeed' | 'Fail'

export class BaseState{
  constructor(
    public status : StateStatusEnum,
    public error: string = ''
  ){}
}

export class LoadAllState extends BaseState{
  constructor(
    public status : StateStatusEnum ='Init',
    public error: string = '',
    public items:any[] =[]
  ){super(status,error)}
}

export class LoadPageState extends BaseState{
  constructor(
    public status : StateStatusEnum ='Init',
    public error: string = '',
    public items:any[]=[],
    public totalCount: number = 0,
    public query: QueryParamsModel|null  =null
  ){super(status,error)}
}

export class LoadOneState extends BaseState{
  constructor(
    public status : StateStatusEnum ='Init',
    public error: string = '',
    public item:any = null
  ){super(status,error)}
}

export class UpsertState extends BaseState{
  constructor(
    public status : StateStatusEnum ='Init',
    public error: string = '',
  ){super(status,error)}
}

export class DeleteState extends BaseState{
  constructor(
    public status : StateStatusEnum ='Init',
    public error: string = '',
    public item:any = null
  ){super(status,error)}
}

export class ModelState {
  repoName: string = ''
  loadAllState = new LoadAllState()
  loadPageState = new LoadPageState()
  loadOneState = new LoadOneState()
  upsertState = new UpsertState()
  deleteState = new DeleteState()
}

function getInitialState(repoName: string): ModelState {
  return { ...new ModelState(), repoName }
}

export function getState(stateArray: ModelState[], repoName: string): ModelState {
  let find = stateArray.find(x => x.repoName === repoName);
  if (find == null) {
    find = getInitialState(repoName);
  }
  return find;
}

function pushState(arr: ModelState[], state: ModelState): ModelState[] {
  return [...arr.filter(x => x.repoName !== state.repoName), state];
}

export const modelReducer = (states = [], action:{type:string, payload:any}) => {
  switch (action.type) {
   case ModelActionTypes.ModelLoaded: {
      const {payload:{ repoName, query} } = action as GetModelRequest
      const { items, totalCount } = action.payload.result as QueryResultsModel

      let state = getState(states, repoName)
      if (query.q === 'all') {
        const loadAllState = new LoadAllState('Succeed','',items)
        state = { ...state,loadAllState}

      }else if (query.q === 'one'){
        const loadOneState = new LoadOneState('Succeed','',items[0])
        state = { ...state,loadOneState}
      }else if (query.q ==='page'){
        const loadPageState = new LoadPageState('Succeed','',items,totalCount,query)
        state = { ...state, loadPageState }
      }
      return pushState(states, state)
    }

    case ModelActionTypes.ModelLoadError: {
      const { payload:{repoName,query} } = action as GetModelRequest
      const {error} = action.payload
      let state = getState(states, repoName)

      switch(query.q){
        case 'all':{
          const loadAllState = new LoadAllState('Fail',error)
          state = { ...state,loadAllState}
          break
        }
        case 'one':{
          const loadOneState = new LoadOneState('Fail',error)
          state = { ...state,loadOneState}
          break
        }
        case 'page':{
          const loadPageState = new LoadPageState('Fail',error)
          state = { ...state, loadPageState }
          break
        }
      }
      return pushState(states, state)
    }
     case ModelActionTypes.GetModelRequest: {
      const { payload:{repoName,query} } = action as GetModelRequest
      let state = getState(states, repoName)

      switch(query.q){
        case 'all':{
          if (state.loadAllState.status ==='Succeed')
          {
            return states
          }
          const loadAllState = new LoadAllState('Loading')
          state = { ...state,loadAllState}
          break
        }
        case 'one':{
          const loadOneState = new LoadOneState('Loading')
          state = { ...state,loadOneState}
          break
        }
        case 'page':{
          const loadPageState = new LoadPageState('Loading')
          state = { ...state, loadPageState }
          break
        }
      }
      return pushState(states, state)
    }
 
    case ModelActionTypes.ResetUpsertSatus: {
      const { payload:{repoName} } = action as ResetCRUDState
      let state = getState(states, repoName)
      const upsertState = new UpsertState()
      const deleteState = new DeleteState()
      state = { ...state, upsertState, deleteState}
      return pushState(states, state)
    }
    case ModelActionTypes.ModelDeleteError: 
    {
      const { repoName,error } = action.payload
      let state = getState(states, repoName)
      const deleteState = new DeleteState('Fail',error)
      state = { ...state, deleteState}
      console.log(state)
      return pushState(states, state)
    }
    case ModelActionTypes.ModelUpsertError: 
    {
      const { repoName,error } = action.payload
      let state = getState(states, repoName)
      const upsertState = new UpsertState('Fail',error)
      state = { ...state, upsertState}
      return pushState(states, state)
    }


    case ModelActionTypes.ModelDeleted:{
      const {payload:{ repoName,ids}} = action as DeleteModelRequest
      let state = getState(states, repoName)
      let {items} = state.loadPageState
      items = items.filter(x=>!ids.includes(x.id))
      const loadPageState = {...state.loadPageState, items,totocount: state.loadPageState.totalCount -1}
      const deleteState = new DeleteState('Succeed')

      state = { ...state, loadPageState, deleteState}
      return pushState(states, state)
    }

    case ModelActionTypes.ModelCreated: {
      const { payload:{repoName} } = action as CreateModelRequest
      const {result} = action.payload

      let state = getState(states, repoName)
      let {loadPageState} = state
      loadPageState = {...loadPageState, items:[...loadPageState.items, result]}
      const upsertState = new UpsertState('Succeed')
      state = { ...state, loadPageState, upsertState}
      return pushState(states, state)
    }

    case ModelActionTypes.ModelUpdated: {
      console.log('in model updated')
      const {payload:{ model,repoName} } = action as UpdateModelRequest
      console.log(model)
      console.log(repoName)
      let state = getState(states, repoName)
      let {loadPageState,loadOneState} = state
      const items = [...loadPageState.items]
      const index = items.findIndex(x=>x.id === model.id)
      const newItem = {...items[index],...model}
      items.splice(index,1,newItem)
      loadPageState = {...loadPageState, items}

      let item = loadOneState.item
      if (item && item.id === model.id)
      {
          item = {...item,...model}
      }
      loadOneState = {...loadOneState, item}
      const upsertState = new UpsertState('Succeed')
      state = { ...state,loadPageState, loadOneState,upsertState} 
      console.log(upsertState)
      console.log(state)
      return pushState(states, state)
    }
    case ModelActionTypes.CreateModelRequest: 
    case ModelActionTypes.UpdateModelRequest:
    {
      const { repoName } = action.payload
      let state = getState(states, repoName)
      state = { ...state, upsertState : new UpsertState('Loading')}
      return pushState(states, state)
    }
    case ModelActionTypes.DeleteModelRequst:
      {

      const { repoName } = action.payload
      let state = getState(states, repoName)
      state = { ...state, deleteState : new DeleteState('Loading')}
      return pushState(states, state)
      }

    default:
      return states
  }
}