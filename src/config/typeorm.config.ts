import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { HOSTNAME, USERNAME, PASSWORD, DATABASE } from './config';
import { Client } from 'client/src/share/entities/client.entity';
import { User } from 'client/src/share/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  name:'default',
  type: 'mssql',
  host: process.env.RDS_HOSTNAME || HOSTNAME,
  port: 1433,
  username: process.env.RDS_USERNAME || USERNAME,
  password: process.env.RDS_PASSWORD || PASSWORD,
  database: process.env.RDS_DB_NAME || DATABASE,
  entities: [Client,User],
  synchronize: true,
  options:{encrypt:true,  packetSize: 8192},  
  connectionTimeout: 30000,
  requestTimeout: 30000,
  logging: false
};
