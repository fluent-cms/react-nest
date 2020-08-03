import React, { Fragment } from 'react';
import { InputLabel, FormHelperText, Select, MenuItem } from '@material-ui/core';
import { ModelField } from '../../core/crud/modelField';
import { Controller } from 'react-hook-form';
import { useAllRequest } from '../hooks/useAllRequest';
import { MyBaseEntity } from 'share/entities/myBaseEntity';

interface ModelSelectProps {
    field: ModelField<MyBaseEntity>
    item: any
    helpText: string|undefined
    control: any
}
export const SelectInputInForm = (props: ModelSelectProps) => {
    const { field, control, helpText, item } = props
    const { loadAllState, defaultItem } = useAllRequest(field, item)
    console.log(loadAllState)
    return loadAllState.status === 'Succeed' ? <Fragment>
        <InputLabel>{props.field.label}</InputLabel>
        <Controller
            as={
                <Select id={field.id} name={field.id} style={{ height: '36px' }} label={field.label} margin='dense' defaultValue={defaultItem}
                 displayEmpty inputProps={{ 'aria-label': 'Without label' }} error={!!helpText} >
                    {
                        loadAllState.items.map(item =>
                            <MenuItem key={item.id} value={field.refField?item:item.id}>{item[field.refField ? field.refField : 'txt']}</MenuItem>
                        )
                    }
                </Select>
            }
            name={field.id}
            control={control}
        />
        <FormHelperText>{helpText}</FormHelperText>
    </Fragment>
        : <div></div>
} 