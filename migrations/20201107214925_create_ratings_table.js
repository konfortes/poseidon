exports.up = async function(knex) {
  await knex.schema.createTable('ratings', t => {
    t.increments('id').primary()
    t.integer('user_id')
    t.integer('rating')
    t.dateTime('created_at')
    // TODO: date index?
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTable('ratings')
}
