import { FetchRequest } from "../fetch/fetchActions";
import { AuthActionTypes, AuthActions } from "./authActions";
import { myDispatch } from "core/utilities/myDispatch";

export const authMiddleware = ({ dispatch }: any) => (next: any) => (action: AuthActions) => {
  next(action);
  switch (action.type){
    case AuthActionTypes.SignInRequest: {
      const request = new FetchRequest('POST', 'auth/signin' ,action.payload, action.payload, AuthActionTypes.SignInSuccess, AuthActionTypes.SignInError, false)
      console.log('in middleware')
      myDispatch(dispatch,request)
      break
    }
  }
}