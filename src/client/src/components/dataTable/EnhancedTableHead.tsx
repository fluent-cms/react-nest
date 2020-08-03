import React from 'react';
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel } from "@material-ui/core";
import { useTableStyles } from "./tableStyles";
import { TableDisplayOption } from './EnhancedTable';
import { createField } from 'core/crud/modelField';

export interface EnhancedTableHeadProps {
  displayOption:TableDisplayOption
  classes: ReturnType<typeof useTableStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { classes, onSelectAllClick, numSelected, onRequestSort, displayOption:{orderBy, order,cols, rows, showDelete}} = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {showDelete&& <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rows.length}
            checked={rows.length > 0 && numSelected === rows.length}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all ' }}
          />
        </TableCell>
        }
        {[...cols, createField<{op:any}>({id:'op'})].map((headCell,index) => (

          <TableCell
            key={index}
            align={headCell.inputType==='number' ? 'right' : 'left'}
            padding={'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}