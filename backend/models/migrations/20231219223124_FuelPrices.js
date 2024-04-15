/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('fuel_prices', function (table) {
      table.increments('price_id');
      table.integer('provider_id').unsigned();
      table.integer('fuel_type_id').unsigned();
      table.integer('price').notNullable();
      table.timestamp('effective_date').defaultTo(knex.fn.now());  
      table.timestamps();
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('fuel_prices');
  };