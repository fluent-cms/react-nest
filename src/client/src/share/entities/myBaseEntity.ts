import { PrimaryGeneratedColumn } from "decorators/myTypeOrmDecorator";

export class MyBaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0
}