import { useSelector, useDispatch } from "react-redux"
import { QueryParamsModel } from "../../share/query/query-params"
import { selectModelLoadAllState } from "../../core/crud/modelSelector"
import { GetModelRequest } from "../../core/crud/modelActions"
import { ModelField } from "../../core/crud/modelField"
import { useEffect } from "react"
import { LoadAllState } from "../../core/crud/modelReducer"
import { MyBaseEntity } from "share/entities/myBaseEntity"
import { myDispatch } from "core/utilities/myDispatch"

export const useAllRequest =(field:ModelField<MyBaseEntity>, item:any) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (field.refField && field.refModel)
        {
            const query = new QueryParamsModel('all', 'asc', field.refField)
            const req = new GetModelRequest({ repoName: field.refModel, query })
            myDispatch(dispatch,req)
        }
    }, [field, dispatch])

    let loadAllState = useSelector(state => selectModelLoadAllState(state, field.refModel))
    if (!field.refModel)
    {
        loadAllState = new LoadAllState('Succeed','',field.selectOptions)
    }

    let defaultItem: any = ''
    if (loadAllState.status === "Succeed" && item) {
        defaultItem = item[field.id]
        if (field.refField && !field.id.includes('id')) {
           if (defaultItem) {
                defaultItem = loadAllState.items.find(x => x.id === defaultItem.id)
            }
        }
    }
    return { loadAllState, defaultItem }
}