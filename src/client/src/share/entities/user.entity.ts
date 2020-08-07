import { Client } from './client.entity';
import { MyBaseEntity } from './myBaseEntity';
import { Entity, Unique,Column, ManyToOne } from 'decorators/myTypeOrmDecorator';
import { IsEmail, IsString, MinLength, MaxLength, Matches} from 'class-validator';
@Entity('user')
@Unique(['username'])
export class User extends MyBaseEntity {
  @IsEmail()
  @Column()
  username: string = '';

  @MinLength(1)
  @Column()
  firstname: string ='';

  @MinLength(1)
  @Column()
  lastname: string ='';
  
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' },
  )
  @Column()
  password: string ='';

  @Column()
  salt: string ='';

  @Column()
  isAdmin: 'admin' |'noadmin' = 'noadmin';

  @Column({nullable:true})
  clientId?:number = undefined

  @ManyToOne(type => Client, x => x.id,{eager:true})
  client?: Client
}
