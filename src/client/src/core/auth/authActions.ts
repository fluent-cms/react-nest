import { AuthRequest} from '../../share/auth/authRequest';

export enum AuthActionTypes {
	SignInRequest = 'Sign in Request',
	SignInSuccess = 'Sign in success',
	SignInError = 'Sign in error',
	SignOut = 'Sign Out',
}

export class SigninRequest {
	type: AuthActionTypes.SignInRequest = AuthActionTypes.SignInRequest
	constructor(public payload:AuthRequest){}
}

export class SignOut { 
	type:AuthActionTypes.SignOut = AuthActionTypes.SignOut 
}
export class SignInError { 
	type:AuthActionTypes.SignInError = AuthActionTypes.SignInError 
	payload:{
		error:string
	}
}
export class SignInSucess { 
	type :AuthActionTypes.SignInSuccess = AuthActionTypes.SignInSuccess 
	payload:{
		result:{accessToken:string}
	}
}

export type AuthActions = SigninRequest | SignOut | SignInError | SignInSucess 