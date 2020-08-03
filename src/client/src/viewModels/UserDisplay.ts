import { User } from "share/entities/user.entity";
import { Client } from "share/entities/client.entity";
import { getRepoByConstructor } from "decorators/myTypeOrmDecorator";
import { createDisplayOption } from "core/crud/modelDisplay";
import { createField, selectOption } from "core/crud/modelField";

export const UserDisplayOption = createDisplayOption({
  modelTitle:'Users',
  modelContructor: User,
  relations:['client'],
  fields:[
    createField<User>({id:'client', label:'Client', inSearch:false, inputType:'select', refModel: getRepoByConstructor(Client), refField:'name'}),
    createField<User>({id:"username", label:'User Name'}),
    createField<User>({id:'password', label:'Password', inSearch:false, inputType:'password', inEdit:false, inList:false}),
    createField<User>({id:"firstname", label:'First Name'}),
    createField<User>({id:"lastname", label:'Last Name'}),
    createField<User>({id:"isAdmin", label:'Is Administrator', inSearch:false, inputType:'select', selectOptions:[
        new selectOption('admin','Administrator'), 
        new selectOption('noadmin','Not Administrator')
    ]}),
  ]
})