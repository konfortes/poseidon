exports.up = async function(knex) {
  const exist = await knex.schema.hasTable('users')
  if (!exist) {
    await knex.schema.createTable('users', t => {
      //   t.primary(['id'])
      //   t.increments('id')
      t.integer('external_id')
      t.string('first_name')
      t.string('last_name')
      t.string('username')
      t.boolean('subscribed')
      t.dateTime('created_at')
      t.index('external_id', 'external_id_idx')
    })
  }
}

exports.down = async function(knex) {
  await knex.schems.dropTable('users')
}
