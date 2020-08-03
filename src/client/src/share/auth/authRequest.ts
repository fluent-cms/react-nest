import { IsString, MinLength, MaxLength, Matches, IsEmail, minLength } from 'class-validator';

export class AuthRequest {
  @IsEmail()
  username: string =''
  password: string =''
}

export class MFARequest{
  @MinLength(1)
  code:string =''
  @IsEmail()
  username: string =''
}
