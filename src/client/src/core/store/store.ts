import {applyMiddleware, createStore, compose} from "redux";
import {reducers} from "./reducers";
import { modelMiddleware } from "../crud/modelMiddleware";
import { fetchMiddleware } from "../fetch/fetchMiddleware";
import { authMiddleware } from "../auth/authlMiddleware";

export const rootStore = createStore(
  reducers,
  compose(
    applyMiddleware(modelMiddleware,fetchMiddleware,authMiddleware ),
  )
);