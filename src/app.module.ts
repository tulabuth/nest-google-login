import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'sms',
      password: 'sms',
      database: 'sms',
      entities: [Users],
      synchronize: true,
    }),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService,GoogleStrategy],
})
export class AppModule {}
