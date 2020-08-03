import React, { Fragment } from 'react';
import { Container, CircularProgress, FormControl, TextField, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateModelRequest, ResetCRUDState } from '../../core/crud/modelActions';
import { selectModelUpsertState} from '../../core/crud/modelSelector';
import { useForm } from 'react-hook-form';
import { selectUser } from '../../core/auth/authSelector';
import { User } from 'share/entities/user.entity';
import { validateEntity } from 'core/utilities/formUtility';
import { getRepoByConstructor } from 'decorators/myTypeOrmDecorator';
import { Alert } from '@material-ui/lab';
import { useEffect } from 'react';
import { myDispatch } from 'core/utilities/myDispatch';

export default function Profile() {
  const dispatch = useDispatch()
  const repoName = getRepoByConstructor(User)

  const {user} = useSelector(selectUser)
  const { register, handleSubmit } = useForm()
  const [formError, setFormError] = React.useState(new Map<string,string>());

  const submit = async (data: any) => {
    const flds = Object.keys(data)
    const item = {id:user!.id,...data}
    const result = await validateEntity(User,item, flds)

    if (item.password !== item.password1 )
    {
      console.log('password not match')
      result.set('password1', "two password doesn't match")
    }

    if (item.password === item.password1 && !item.password )
    {
      result.delete('password')
      delete(item.password)
      delete(item.password1)
    }
 
    setFormError(result)
    if (result.size === 0) {
      const action = new UpdateModelRequest({ repoName, model: item})
      myDispatch(dispatch,action)
    }
  }

  useEffect(()=>{
        myDispatch(dispatch,new ResetCRUDState({repoName }))
  }, [dispatch,repoName])
  const upsertState = useSelector(state => selectModelUpsertState(state, getRepoByConstructor(User)))
  console.log(upsertState)

  return <Fragment>
    <h1>My Profile</h1>
    {upsertState.status === 'Loading' && <CircularProgress size={68} />}
    {upsertState.status === 'Succeed' && <Alert>Save Profile succeed!</Alert> }
    {user && <Fragment>
    <Paper>
      <Container>
        <form onSubmit={handleSubmit(submit)}>
          <FormControl style={{ width: '60%' }} > 
            <TextField margin="dense" name="firstname" label="First name" type='text' inputRef={register} 
            helperText={formError.get('firstname')} error={formError.has('firstname')} defaultValue={user.firstname} fullWidth/>
          </FormControl>
          <br/>
          <FormControl style={{ width: '60%' }} > 
            <TextField margin="dense" name="lastname" label="Last name" type='text' inputRef={register}
            helperText={formError.get('lastname')} error={formError.has('lastname')}  defaultValue={user.lastname} fullWidth/>
          </FormControl>
          <br/>
          <FormControl style={{ width: '60%' }} > 
            <TextField margin="dense" name="password" label="Password" type='password' inputRef={register}
            helperText={formError.get('password')} error={formError.has('password')} fullWidth/>
          </FormControl>
          <br/>
          <FormControl style={{ width: '60%' }} > 
            <TextField margin="dense" name="password1" label="Confirm password" type='password' inputRef={register} 
            helperText={formError.get('password1')} error={formError.has('password1')} fullWidth/>
          </FormControl>
          <div>
          <Button type="submit" color="primary">
            Submit
          </Button>
          </div>
        </form>
      </Container>
    </Paper>
    </Fragment>
  }
  </Fragment>
}
