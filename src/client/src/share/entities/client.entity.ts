import { Entity, Column } from 'decorators/myTypeOrmDecorator';
import { MyBaseEntity } from './myBaseEntity';

@Entity('client')
export class Client extends MyBaseEntity {
  @Column()
  name :string =''
  @Column()
  phoneNumbers :string =''
}
