exports.up = function(knex) {
    return knex.schema
      .createTable('activities', function (table) {
        table.increments('id');
        table.string('title', 100).notNullable();
        table.string('email', 1000).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('deleted_at').defaultTo(knex.fn.now());
      })
      .createTable('todos', function (table) {
          table.increments('id');
          table.integer('activity_group_id').notNullable();
          table.string('title', 100).notNullable();
          table.tinyint('is_active', 1).notNullable().defaultTo(1);
          table.string('priority', 10).notNullable().defaultTo('very-high');
          table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
          table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
          table.timestamp('deleted_at').defaultTo(knex.fn.now());
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
        .dropTable("activities")
        .dropTable("todos");
  };
  
  exports.config = { transaction: true };