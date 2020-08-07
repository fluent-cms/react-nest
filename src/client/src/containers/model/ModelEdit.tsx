import React, {Fragment, useRef} from 'react';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { selectModelUpsertState } from '../../core/crud/modelSelector';
import { useOneRequest } from '../hooks/useOneReqeust';
import { useSelector } from 'react-redux';
import { getRepoByConstructor } from 'decorators/myTypeOrmDecorator';
import { ModelDisplayOption } from 'core/crud/modelDisplay';
import { ModelForm } from './ModelForm';

export default function ModelEdit({ display}: {display:ModelDisplayOption<any>}) {
  const { id } = useParams()
  const repoName = getRepoByConstructor ( display.modelContructor)
  const loadOneState = useOneRequest(id, repoName)
  const item = loadOneState.item

  const upsertState = useSelector(state => selectModelUpsertState(state, repoName)) 
 
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = () => formRef.current!.dispatchEvent(new Event("submit"))
  return <Fragment>
  <h1>{(id ? 'Edit ' : 'Add ') + display.modelTitle}</h1>
        <ModelForm {...{ upsertState, item, display, formRef }} />
        <div>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </div>
  </Fragment>
}