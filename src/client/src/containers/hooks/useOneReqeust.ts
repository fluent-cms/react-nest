import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { QueryParamsModel } from "../../share/query/query-params"
import { GetModelRequest } from "../../core/crud/modelActions"
import { selectModelLoadOneState } from "../../core/crud/modelSelector"
import { myDispatch } from "core/utilities/myDispatch"

export const useOneRequest =(id:any,  repoName:string) =>{
  const dispatch = useDispatch()
  useEffect(() => {
    const query = { ...new QueryParamsModel('one'), id:+id }
    const request = new GetModelRequest({ repoName, query })
    myDispatch(dispatch,request)
  }, [id,dispatch])
  const loadOneState = useSelector(state => selectModelLoadOneState(state, repoName))
  return loadOneState
}