import { Client } from 'share/entities/client.entity';

import { createDisplayOption } from "core/crud/modelDisplay";
import { createField} from "core/crud/modelField";
export const ClientDisplayOption = createDisplayOption<Client>({
  modelTitle:'Client',
  modelContructor:Client,
  fields:[
    createField<Client>({id:'name', label:'Name'}),
    createField<Client>({id:'phoneNumbers', label:'Phone Numbers'})
  ]
})