import { ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { KnexModule } from 'nestjs-knex'

@Module({
  imports: [
    KnexModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          client: configService.get('db.provider'),
          useNullAsDefault: true,
          connection: configService.get('db.connectionString'),
        },
      }),
    }),
  ],
})
export class DataModule {}
