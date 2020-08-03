import { ValidationError } from "class-validator/types/validation/ValidationError"
import { validate } from "class-validator"
import { mergeObject } from "../../share/utilities/arrayUtility"

export async function validateEntity<T extends Object>(type: new()=>T ,source: any,fields: string[]) {
  const item = new type()
  Object.assign(item,source)
  let errs :ValidationError[] = await validate(item)
  errs = errs.filter(x=>fields.includes(x.property))
  
  const error = new Map<string,string>() 
  errs.forEach(e=>{
    var msg = mergeObject(e.constraints)
    error.set(e.property,msg)
  })
  return error
}