import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BackendConfigModule } from '@td/backend/config';
import { models } from './models';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [BackendConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_URI');
        return { uri };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(models)
  ],
  exports: [MongooseModule],
})
export class BackendDatabaseModule {
}
