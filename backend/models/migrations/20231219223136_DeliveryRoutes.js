/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('delivery_routes', function (table) {
      table.increments('route_id');
      table.integer('provider_id').unsigned();
      table.string('route_name', 255).notNullable();  
      table.timestamps();
    });
  };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('delivery_routes');
  };