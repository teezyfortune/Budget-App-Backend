import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseProviders } from './database/database.provider';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Helper } from './helper/helper.provider';
import { HelperModule } from './helper/helper.module';
import { DynamoDbModule } from './dynamo-db/dynamo-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    HelperModule,
    DynamoDbModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...DatabaseProviders, Helper],
  exports: [...DatabaseProviders],
})
export class AppModule {}
