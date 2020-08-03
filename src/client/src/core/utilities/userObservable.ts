import { useEffect } from "react";
import { Observable } from "rxjs";

export const useObservable = (obs : Observable<any>, setter:any) =>{
  useEffect(()=>{
    const sub = obs.subscribe(x => setter(x))
    return () => sub.unsubscribe();
  }
  ,[obs,setter])
}