
import React  from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { ModelField} from '../../core/crud/modelField';
import { useDispatch } from 'react-redux';
import { UpdateModelRequest } from '../../core/crud/modelActions';
import { useAllRequest } from '../hooks/useAllRequest';
import { ComponentInListProps } from '../commonProps/componentInListProps';
import { getRepoByConstructor } from './../../decorators/myTypeOrmDecorator';
import { myDispatch } from 'core/utilities/myDispatch';


export const SelectInpputInList = ({field,item,display}: ComponentInListProps ) => {
    const dispatch = useDispatch()
    const {loadAllState,defaultItem} = useAllRequest(field,item)

    const onChange = (e:any) => {
        const model:any = {}
        model['id'] = item.id
        model[field.id] = e.target.value
        console.log(model)
        
        const action = new UpdateModelRequest({repoName: getRepoByConstructor(display.modelContructor) , model })
        myDispatch(dispatch,action)
    }

    return loadAllState.status==='Succeed'
    ?<Select
        id={field.id}
        name={field.id}
        style={{ height: '36px' }}
        label={field.label}
        margin='dense'
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={onChange}
        defaultValue={defaultItem}
    >
        <MenuItem value="">
            <em>None</em>
        </MenuItem>
        {
             loadAllState.items.map(item =>
                <MenuItem key={item.id} value={item}>{item[field.refField]}</MenuItem>
            )
        }
    </Select>
    :<div></div>
} 