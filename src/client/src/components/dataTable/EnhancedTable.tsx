import React  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTableStyles } from './tableStyles';
import { EnhancedTableToolbar } from '../dataTable/EnhancedTableToolbar';
import { EnhancedTableHead } from '../dataTable/EnhancedTableHead';
import {  SortType } from '../../share/query/query-params';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export interface TableDisplayOption{
    defaultRowsPerPage:number
    cols:{id:string,inputType:string,label:string}[]
    rows:any[]
    page:number
    rowsPerPage:number
    showAdd:Boolean
    showEdit:Boolean
    showDelete:Boolean
    total:number
    repoName:string
    modelTitle:string

    order:SortType
    orderBy:string

    search:string

    handleRequestSort:any
    handleChangePage :any
    handleChangeRowsPerPage :any
    handleAdd?:any
    handleEdit?:any
    handleDelete?:any
    handleSearch:any
    renderCell:any
}


export const EnhancedTable = ({displayOption}: {displayOption:TableDisplayOption}) => {
  const classes = useTableStyles();
  const [selected, setSelected] = React.useState<number[]>([]);
  const { total, page, rowsPerPage, cols,rows, handleRequestSort, handleChangePage 
    ,handleChangeRowsPerPage, handleEdit, handleDelete,showEdit, showDelete, renderCell}  = displayOption

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id:number) => selected.indexOf(id) !== -1;

  const newHanleDelete = ()=>handleDelete(selected)
  const emptyRows = rowsPerPage - rows.length 

    return (<div className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} displayOption = {{...displayOption, handleDelete:newHanleDelete} }  />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              displayOption={displayOption}
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {displayOption.showDelete&& <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      }
                      {
                        cols.map((x,index)=>{
                          return <TableCell key={index}>
                          {
                            renderCell(x,row) 
                          }
                        </TableCell>
                        }
                        )
                      }
                      <TableCell padding="none"> 
                      { showDelete &&
                        <IconButton aria-label="delete" onClick={()=> handleDelete([row.id])}>
                          <DeleteIcon />
                        </IconButton>
                      }
                      { showEdit && 
                        <IconButton aria-label="edit" onClick={() => handleEdit(row.id)}>
                          <EditIcon />
                        </IconButton>
                      }
                      </TableCell>
                   </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[
            displayOption.defaultRowsPerPage,
            displayOption.defaultRowsPerPage * 2, 
            displayOption.defaultRowsPerPage * 4]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>
  );
}
