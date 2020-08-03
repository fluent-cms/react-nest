import { User } from "../entities/user.entity";

export class UserToken extends User{
  exp: number=0;
  token:string='';
}

export const isValidToken = (token:UserToken | null) => {
  if (!token)
  {
    return false
  }
  if (!token.exp){
    return false
  }

  const t = new Date().getTime();
  if (t > token.exp * 1000)
  {
    return false
  }
  return true
}


export const getExpirationDuration = (token:UserToken) => {
  const t = new Date().getTime();
  return token.exp*1000 - t
}