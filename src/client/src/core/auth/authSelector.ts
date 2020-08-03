import { createSelector } from 'reselect'
import { authState } from './authReducer';
import { isValidToken } from '../../share/auth/UserToken';

export const getAuthState = (state:any):authState => state.authReducer
export const selectUser = createSelector(
  getAuthState,
  (state ) => {
    return isValidToken(state.user)? state : {...state, user:null}
  }
)