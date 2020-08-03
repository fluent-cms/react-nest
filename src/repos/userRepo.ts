import * as bcrypt from 'bcryptjs';
import { User } from 'client/src/share/entities/user.entity';
import { getRepository } from 'typeorm';

export const validatePassword = async (user:User,password: string) => {
    const hash = await bcrypt.hash(password,user.salt);
    const result = hash === user.password;
    return result
  }

export const toDTO = (user : User) =>  ({...user, password:'', salt:''})

export const hashUserPassword = async (usr :User) =>
{
  const salt = await bcrypt.genSalt();
  const password = await   bcrypt.hash(usr.password, salt)
  const result = {...usr,salt,password}
  return result
}

export const findUserbyName = async (username:string):Promise<User> => {
    const repo = getRepository(User)
    const user =<User>( await repo.findOne({where:{ username},  relations:['client'] }));
    return  user
}

export async function seedUser (){
    const username = 'admin@a.com'
    const password = 'Abcd1234!'
    const repo = await getRepository(User)
    const find = await repo.find({ where: { isAdmin:'admin' } })
    if (find.length > 0) {
        console.log('user exists, ignore')
    }
    else {
        let user = new User()
        user.firstname = 'admin'
        user.lastname = 'admin'
        user.username = username
        user.password = password
        user.isAdmin = 'admin'
        user = await hashUserPassword(user)
        await repo.insert(user)
    }
}
