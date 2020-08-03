import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedUser } from 'repos/userRepo';

async function bootstrap() {
  console.log('------------------------------begin------------------------')
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000
  await app.listen(port);
  await seedUser()
  console.log('----------app started, listen on-------------- ' + port)
}
bootstrap();
