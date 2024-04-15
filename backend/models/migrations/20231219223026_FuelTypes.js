/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('fuel_types', function (table) {
      table.increments('fuel_type_id');
      table.string('name', 255).notNullable();
      table.text('description');  
      table.timestamps();
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('fuel_types');
  };