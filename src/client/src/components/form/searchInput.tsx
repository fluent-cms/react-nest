import { TextField, Tooltip, IconButton } from "@material-ui/core"
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { useObservable } from '../../core/utilities/userObservable';
import  React, { useState, Fragment }  from 'react';
import BackspaceIcon from '@material-ui/icons/Backspace';

let searchSubject = new BehaviorSubject('');
let searchFilter = searchSubject.pipe(
  filter (val => val.length > 1 || val.length === 0),
  debounceTime (750),
  distinctUntilChanged()
)
interface SeachInputProps{
    handleSearch:any
}

export const SearchInput = ({handleSearch}:SeachInputProps) => {
    useObservable(searchFilter,handleSearch )
    const [val,setVal]= useState('')
    
    const onSearch = (e:any) =>{ 
      setVal(e.target.value)
      searchSubject.next(e.target.value)
    }
    const onClear = () =>{
      setVal('')
      handleSearch('')
    }
    return <Fragment>
          <TextField name="k" label="Search" type="text" style={{ width: "200px" }} value={val} onChange={onSearch} />
            <Tooltip title="Reset Filter">
            <IconButton aria-label="Reset Filter" onClick={onClear}>
            <BackspaceIcon />
          </IconButton>
        </Tooltip>
    </Fragment>
}