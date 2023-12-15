/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlModule } from './url/url.module';



@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
        //  useNewUrlParser: true,
        //  useUnifiedTopology: true,
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    UrlModule
  ],
})
export class AppModule {}
