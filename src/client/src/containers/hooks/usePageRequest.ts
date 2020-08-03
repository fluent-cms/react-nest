import { useState, useEffect } from "react";
import { SortType, construct, QueryParamsModel } from "../../share/query/query-params";
import { GetModelRequest } from "../../core/crud/modelActions";
import { useDispatch } from "react-redux";
import { MyBaseEntity } from "share/entities/myBaseEntity";
import { ModelField } from "core/crud/modelField";
import { ModelDisplayOption } from "core/crud/modelDisplay";
import { myDispatch } from "core/utilities/myDispatch";

export const usePageRequest = (
  fields:ModelField<MyBaseEntity>[], 
  repoName:string, 
  display: ModelDisplayOption<MyBaseEntity>, 
  parentId:any='', 
  defaultRowsPerPage:number
  ) =>{
  const dispatch = useDispatch()
  const [search,handleSearch] = useState('')
  const [order, setOrder] = useState<SortType>(display.sortDirection);
  const [orderBy, setOrderBy] = useState<string>(display.sortBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
 
  useEffect(()=>{ 
    const searchField = construct( fields.filter(x=>x.inSearch).map(x=>x.id))
    const query:QueryParamsModel = {...new QueryParamsModel('page', order, orderBy, page, rowsPerPage,search, searchField),
     r: construct(display.relations), pf:display.parentField,
     pv:parentId}
    const request = new GetModelRequest({repoName, query})
    myDispatch(dispatch, request)
  },[order, orderBy,page, rowsPerPage,search,fields,repoName,display,dispatch,parentId])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage) 
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return {search, order,orderBy, setOrderBy, page,setPage, rowsPerPage, setRowsPerPage,handleSearch, handleRequestSort , handleChangePage, handleChangeRowsPerPage}
}