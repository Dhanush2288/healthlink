/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('fuel_orders', function (table) {
      table.increments('order_id');
      table.integer('user_id').unsigned();
      table.integer('provider_id').unsigned();
      table.integer('fuel_type_id').unsigned();
      table.timestamp('order_date').defaultTo(knex.fn.now());
      table.timestamp('delivery_date');
      table.string('route_name', 255);  
      table.integer('delivery_status').defaultTo(0);
      table.string('delivery_route_loc', 255);  
      table.integer('quantity').notNullable();
      table.integer('total_cost').notNullable();
      table.integer('status').defaultTo(0);  
      table.timestamps();
    });
  };
  
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('fuel_orders');
  };