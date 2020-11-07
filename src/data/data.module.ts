import { ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { KnexModule } from 'nestjs-knex'
import { OnApplicationBootstrap } from '@nestjs/common/interfaces/hooks/on-application-bootstrap.interface'
import { InjectKnex } from 'nestjs-knex/dist/knex.decorators'
import Knex from 'knex'
import { CreateTableBuilder } from 'knex'

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
// TODO: migrations!!
export class DataModule implements OnApplicationBootstrap {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  async onApplicationBootstrap() {
    const exist = await this.knex.schema.hasTable('users')
    if (!exist) {
      await this.knex.schema.createTable('users', (t: CreateTableBuilder) => {
        t.integer('external_id')
        t.string('first_name')
        t.string('last_name')
        t.string('username')
        t.boolean('subscribed')
        t.dateTime('created_at')
      })
    }
  }
}
