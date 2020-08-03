import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteModelRequest, ResetCRUDState } from '../../core/crud/modelActions';
import { selectModelLoadPageState, selectModelUpsertState, selectModelDeleteState } from '../../core/crud/modelSelector';
import { EnhancedTable, TableDisplayOption } from '../../components/dataTable/EnhancedTable';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ModelField } from '../../core/crud/modelField';
import { useHistory } from "react-router-dom";
import { usePageRequest } from '../hooks/usePageRequest';
import ModelEditDialog from './ModelEditDialog';
import { renderCell } from './../../components/dataTable/renderCell';
import {  MyBaseEntity } from 'share/entities/myBaseEntity';
import { ModelDisplayOption } from 'core/crud/modelDisplay';
import { getRepoByConstructor } from 'decorators/myTypeOrmDecorator';
import { myDispatch } from 'core/utilities/myDispatch';

const defaultRowsPerPage = 25

export const ModelList = ({ display, parentId}: {display:ModelDisplayOption<MyBaseEntity>, parentId?:number}) => {
  const dispatch = useDispatch()
  const { fields, editUrl } = display
  const [open, setOpen] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null as any);
  const history = useHistory()

  const repoName = getRepoByConstructor(display.modelContructor)

  const handleClose = () => setOpen(false)
  const handleAdd = () => {
    showDialog(null)
  }
  const handleEdit = (id: number) => {
    if (editUrl) {
      history.push(`/${editUrl}/${id}`)
    }
    else {
      showDialog(pageState.items.find(x => x.id === id))
    }
  }
  const handleDelete = (ids: number[]) => {
    if (window.confirm("do you want to delete these items?")) {
      myDispatch(dispatch,new DeleteModelRequest({ repoName, ids }))
    }
  }
  const deleteState = useSelector(state => selectModelDeleteState(state, repoName))

  const showDialog = (item: any) => {
    setEditItem(item)
    setOpen(true)
    myDispatch(dispatch,new ResetCRUDState({ repoName }))
  }

  const pageRequest = usePageRequest(fields, repoName, display, parentId, defaultRowsPerPage)
  const pageState = useSelector(state => selectModelLoadPageState(state, repoName))
  const tableDisplay: TableDisplayOption = {repoName,
    ...display, ...pageRequest, cols: fields.filter(x => x.inList),
    rows: pageState.items, total: pageState.totalCount,
    handleAdd, handleEdit, handleDelete, 
    renderCell: (field:ModelField<MyBaseEntity>,item:any) =>renderCell(display,field,item),
    defaultRowsPerPage
  }

  //have to put selector in save component
  const upsertState = useSelector(state => selectModelUpsertState(state, repoName))
  if (open && upsertState.status === 'Succeed') {
    handleClose()
  }
  return (
    <Fragment>
      <ModelEditDialog item={editItem} handleClose={handleClose} display={display} open={open} upsertState={upsertState} />
      {pageState.status === 'Loading' && <CircularProgress size={68} />}
      {pageState.error && <Alert severity="error">{pageState.error} </Alert>}
      {deleteState.error && <Alert severity="error">{deleteState.error} </Alert>}
      <EnhancedTable displayOption={tableDisplay} />
    </Fragment>
  );
}
