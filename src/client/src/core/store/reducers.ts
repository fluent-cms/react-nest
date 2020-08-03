import  {combineReducers} from "redux"
import { modelReducer } from './../crud/modelReducer';
import {authReducer} from '../auth/authReducer'
export const reducers = combineReducers({modelReducer,authReducer});