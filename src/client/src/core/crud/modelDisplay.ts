import { ModelField } from "./modelField"
import { MyBaseEntity } from 'share/entities/myBaseEntity';
import { SortType } from "share/query/query-params";

export class ModelDisplayOption<T extends MyBaseEntity> {
    public modelTitle: string
    public modelContructor: new () => T
    public fields: ModelField<T>[]

    public showAdd: boolean = true
    public showEdit: boolean = true
    public showDelete: boolean = true
    public relations:string[] =[]
    public parentField: string ='' 
    public editUrl:string =''

    public sortBy:keyof T = 'id'
    public sortDirection :SortType ='asc'

    public editForm?:any 
}
export const createDisplayOption = <T extends MyBaseEntity>(partial:Partial<ModelDisplayOption<T >>) => ({...new ModelDisplayOption<T>(),...partial})