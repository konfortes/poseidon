class User {
  id: number
  is_bot: boolean
  first_name: string
  last_name: string
  username: string
}

class Message {
  message_id: number
  from: User
  date: number
  text: string
}

export class UpdateDTO {
  update_id: number
  message: Message
}
