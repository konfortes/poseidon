import { User } from 'telegram-typings'

export class UserEntity {
  constructor(
    id: number,
    first: string,
    last: string,
    username: string,
    subscribed = true,
    createdAt: Date = new Date(),
  ) {
    this.external_id = id
    this.first_name = first
    this.last_name = last
    this.username = username
    this.subscribed = subscribed
    this.created_at = createdAt
  }
  external_id: number
  first_name: string
  last_name?: string
  username?: string
  subscribed: boolean
  created_at: Date

  static fromTelegramUser(user: User): UserEntity {
    return new UserEntity(
      user.id,
      user.first_name,
      user.last_name,
      user.username,
    )
  }
}
