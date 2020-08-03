export type fieldType = 'text' | 'number' | 'date' | 'password'| 'select'| 'subgrid' |'custom' |'uuid' | 'time'
export class selectOption{
  constructor(
    public id:string,
    public txt:string = id
  ){}
}

export class ModelField<T> {
    public id: keyof T
    public label: string
    public inputType: fieldType = 'text'
    public fieldWidth: string = '30%'

    public inSearch: boolean = true
    public inList: boolean = true
    public inAdd: boolean = true
    public inEdit: boolean = true

    public refModel:string  = ''
    public refField:string =''

    public componentInList?:any 
    public subGridOption ?:any
    public selectOptions ?: selectOption[] 
    public dateFormat?: string 
}

export const createField = <T>(partial:Partial<ModelField<T>>) =>({...new ModelField<T>(),...partial})