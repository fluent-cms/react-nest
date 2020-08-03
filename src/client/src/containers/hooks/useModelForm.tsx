import React, { Fragment, useEffect, useRef } from "react"
import { CircularProgress, makeStyles, Theme, FormControl, TextField } from "@material-ui/core"
import { UpsertState } from "../../core/crud/modelReducer"
import { Alert } from "@material-ui/lab"
import { useForm } from "react-hook-form"
import { UpdateModelRequest, CreateModelRequest } from "../../core/crud/modelActions"
import { validateEntity } from "../../core/utilities/formUtility"
import { useDispatch} from "react-redux"
import { SelectInputInForm } from "../model/SelectInputInForm"
import { ModelList } from "../model/ModelList"
import { v4 as uuidv4 } from 'uuid';
import { MyBaseEntity } from "share/entities/myBaseEntity"
import { getRepoByConstructor } from './../../decorators/myTypeOrmDecorator';
import { ModelDisplayOption } from "core/crud/modelDisplay"
import { myDispatch } from "core/utilities/myDispatch"

const useStyles = makeStyles((theme: Theme) => ({
    formControl: {
        margin: theme.spacing(1),
    },
})
);

export const useModelForm = (upsertState: UpsertState, item: any, display: ModelDisplayOption<MyBaseEntity>) => {

    const formRef = useRef<HTMLFormElement>(null);

    const [formError, setFormError] = React.useState(new Map<string,string>());
    const { register, handleSubmit, control } = useForm()
    const dispatch = useDispatch()
    const classes = useStyles();
    const { modelContructor, fields } = display

    let editFields = fields.filter(x => (item ? x.inEdit : x.inAdd))

    const onSubmit = async (model: any) => {
        console.log(model)
        const error = await validateEntity(modelContructor, model, editFields.map(x => x.id))
        setFormError(error)
        if (error.size === 0) {
            let action = null
            if (item) {
                model['id'] = item.id
                action = new UpdateModelRequest({ repoName: getRepoByConstructor(display.modelContructor), model })
            }
            else {
                action = new CreateModelRequest({ repoName: getRepoByConstructor(display.modelContructor) , model })
            }
            myDispatch(dispatch,action)
        }
    }
    useEffect(() => {
        setFormError(new Map<string,string>())
    }, [item])

    return {
        handleSubmit: () => formRef.current!.dispatchEvent(new Event("submit")),
        form: () => <Fragment>
            {upsertState.status === 'Loading' && <CircularProgress size={68} />}
            {upsertState.error && <Alert severity="error">{upsertState.error} </Alert>}
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                {
                    editFields.map(x => {
                        let defaultVal = item && item[x.id]
                        if (!defaultVal && x.inputType==='uuid' )
                        {
                            defaultVal = `{${uuidv4()}}`
                        }
                        return <FormControl key={x.id}
                            style={{ width: x.fieldWidth }}
                            className={classes.formControl}>
                            {x.inputType === 'select'
                                ? <SelectInputInForm field={x} item={item} helpText={formError.get(x.id)} control={control} />
                                : x.inputType === 'subgrid' ? <ModelList display={x.subGridOption} parentId={item?.id} />
                                    : <TextField margin="dense" name={x.id} label={x.label} type={x.inputType} inputRef={register}
                                        helperText={formError.get(x.id)} error={formError.has(x.id)} defaultValue={defaultVal} />
                            }
                        </FormControl>
                    })
                }
            </form>
        </Fragment>
    }
}