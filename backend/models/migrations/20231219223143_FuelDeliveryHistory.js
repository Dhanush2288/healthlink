/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('fuel_delivery_history', function (table) {
      table.increments('delivery_id');
      table.integer('order_id').unsigned();
      table.integer('user_id').unsigned();
      table.string('route_name', 255).notNullable();  
      table.timestamp('delivery_date').defaultTo(knex.fn.now());
      table.decimal('delivered_quantity', 10, 2).notNullable();
      table.integer('delivery_status').defaultTo(0);
      table.timestamps();
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('fuel_delivery_history');
  };
