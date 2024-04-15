/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('roles', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      // Add any additional fields for roles as needed
      // For example, you might want to include a description field
      table.string('description');
      // Timestamps for record creation and updates
      table.timestamps(true, true);
    });
  };
  
 

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('roles');
  };
