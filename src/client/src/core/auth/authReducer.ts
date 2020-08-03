import { UserToken } from "../../share/auth/UserToken";
import { AuthActionTypes, AuthActions } from "./authActions";
import jwt_decode from "jwt-decode";
import { isValidToken } from './../../share/auth/UserToken';

const localToken = "localToken"
export class authState  {
  constructor()
  {
    const localData = localStorage.getItem(localToken);
    if (localData)
    {
      const temp = JSON.parse(localData);
      if (isValidToken(temp))
      {
        this.user = temp
      }
   }
  }
  user:UserToken|null = null
  loading = false
  err =''
}


export const authReducer = (state = new authState(), action: AuthActions) => {
  switch (action.type) {
    case AuthActionTypes.SignOut: {
      localStorage.removeItem(localToken)
      return new authState()
    }
    case AuthActionTypes.SignInRequest: {
      return { ...state, loading: true }
    }
    case AuthActionTypes.SignInSuccess: {
      const { result } = action.payload
      const user: UserToken = jwt_decode(result.accessToken)
      user.token = result.accessToken
      localStorage.setItem(localToken, JSON.stringify(user));
      return { ...state, user, err: '', loading: false }
    }
    case AuthActionTypes.SignInError: {
      console.log(action)
      return { ...state, user: null, err: action.payload.error, loading: false }
    }
    default:
      return state
  }
}