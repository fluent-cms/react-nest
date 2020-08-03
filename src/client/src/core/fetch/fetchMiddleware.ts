import { FetchActionTypes, FetchRequest } from "./fetchActions"
import { selectUser } from "../auth/authSelector";
import { rootStore } from "../store/store";
import { SignOut } from "../auth/authActions";

const baseUrl = '/api/'
const TOKEN_EXPIRED = 'token expired'
const buildOption = (action: FetchRequest) => {
  const { method, requireToken } = action

  const header: any = { 'Content-Type': 'application/json' }

  if (requireToken) {
    const { user } = selectUser(rootStore.getState())
    if (user) {
      header['Authorization'] = `Bearer ${user.token}`
    }
    else {
      return TOKEN_EXPIRED
    }
  }

  const option: any = {}
  option['headers'] = header
  option['method'] = method
  if (method !== 'GET') {
    option['body'] = JSON.stringify(action.body)
  }
  return option
}
export const fetchMiddleware = ({ dispatch }: any) => (next: any) => async (action: any) => {
  if (action.type === FetchActionTypes.FetchRequest) {
    const option = buildOption(action)
    const { url, onSuccess, onError } = action as FetchRequest
    if (option === TOKEN_EXPIRED) {
      dispatch(SignOut)
    }
    else {
      const fullUrl = baseUrl + url
      let error: any = null
      try {

        const response = await fetch(fullUrl, option)
        const text = await response.text()
        if (response.ok) {
          let result = {}
          try {
            result = JSON.parse(text)
          } catch{ }
          dispatch({
            type: onSuccess,
            payload: {
              ...action.payload,
              result
            }
          })
        }
        else {
          error = text
          console.log(error)
          try {
            error = JSON.parse(text)
            error = error.message ?? error.error ?? error
          } catch{ }
        }
      } catch (err) {
        error = err
      }

      if (error) {
        dispatch({ type: onError, payload: { ...action.payload, error } })
      }
    }
  }
  return next(action)
};