import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UpsertState } from '../../core/crud/modelReducer';
import { MyBaseEntity } from 'share/entities/myBaseEntity';
import { ModelDisplayOption } from 'core/crud/modelDisplay';
import { ModelForm } from './ModelForm';
export default function ModelEditDialog({ open, handleClose, display, item, upsertState }: {
  open: boolean
  handleClose: any
  display: ModelDisplayOption<MyBaseEntity>
  item: any
  upsertState: UpsertState
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = () => formRef.current!.dispatchEvent(new Event("submit"))
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">{(item ? 'Edit ' : 'Add ') + display.modelTitle}</DialogTitle>
      <DialogContent >
        <ModelForm {...{ upsertState, item, display, formRef }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
          </Button>
      </DialogActions>
    </Dialog>
  );
}