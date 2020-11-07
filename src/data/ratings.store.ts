import { Injectable } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'

@Injectable()
export class RatingsStore {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async insert(userId: number, rating: number) {
    await this.knex('ratings').insert({
      user_id: userId,
      rating,
      created_at: new Date(),
    })
  }
}
