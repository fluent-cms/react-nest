import React, { Fragment } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useToolbarStyles } from './toolbarStyles';
import clsx from 'clsx';
import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { TableDisplayOption } from './EnhancedTable';
import { SearchInput } from '../form/searchInput';
import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);
export interface EnhancedTableToolbarProps {
  numSelected: number
  displayOption:TableDisplayOption
}

export const EnhancedTableToolbar = ({ numSelected,displayOption:{
  handleAdd, handleDelete, modelTitle, showAdd, showDelete, handleSearch} }: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {modelTitle}
        </Typography>
      )}
      {numSelected > 0 ? (
          showDelete &&
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Fragment>
          <SearchInput handleSearch={handleSearch}/>
        {
          showAdd && <Tooltip title="Add">
          <IconButton aria-label="add" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        }
        </Fragment>
      )}
    </Toolbar>
  );
};
export interface EnhancedTableToolbarProps {
  numSelected: number;
}