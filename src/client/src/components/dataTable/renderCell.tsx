import React from 'react';
import { ModelField } from "../../core/crud/modelField"
import { myDateToString } from './../../share/utilities/myDate';
import { ModelDisplayOption } from 'core/crud/modelDisplay';
import { MyBaseEntity } from 'share/entities/myBaseEntity';

export const renderCell = (display:ModelDisplayOption<MyBaseEntity>, field: ModelField<MyBaseEntity>, item: any) => {
  if (field.inputType === 'custom') {
    const Com = field.componentInList
    return <Com field={field} item={item} display={display} />
  }
  else if (field.inputType === 'select') {
    let refObj = item && item[field.id]
    if (refObj) {
     
      if (field.refField) {
        const arr = field.refField.split('.')
        arr.forEach(f => {
          refObj = refObj[f]
          if (refObj == null) {
            return ''
          }
        })
      }else if(field.selectOptions){
        const find = field?.selectOptions?.find(x=>x.id === refObj)
        if (find)
        {
          return find.txt
        }
      }

      return refObj
    }
    return ''
  }
  else if(field.inputType==='date' && field.dateFormat) {
    return item && myDateToString(item[field.id],field.dateFormat) 

  }
  else {
    return item && item[field.id]
  }
}