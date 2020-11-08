import { Injectable } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import { UserEntity } from 'src/telegram/entities/user.entity'

// type WhereQuerybleFields = 'id' | 'external_id'
// type WhereClause = { [field in WhereQuerybleFields]: number }

@Injectable()
export class UsersStore {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getByExternalId(externalId: number): Promise<UserEntity> {
    return await this.knex<UserEntity>('users')
      .where('external_id', externalId)
      .first()
  }

  async insert(user: UserEntity): Promise<number> {
    const id = await this.knex('users')
      .insert(user)
      .returning('id')

    return id[0]
  }

  async updateSubscription(
    // where: { [field in 'id' | 'external_id']: number },
    // TODO: type it!!
    where: any,
    subscription: boolean,
  ) {
    await this.knex('users')
      .where(where)
      .update({ subscribed: subscription })
  }

  async getSubscribedUserExternalIds(): Promise<number[]> {
    return await this.knex('users')
      .where({ subscribed: true })
      .pluck('external_id')
  }
}
