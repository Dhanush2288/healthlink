/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user_reviews', function (table) {
      table.increments('review_id');
      table.integer('user_id').unsigned();
      table.integer('provider_id').unsigned();
      table.integer('rating').notNullable();
      table.text('review_text');
      table.timestamp('review_date').defaultTo(knex.fn.now());  
      table.timestamps();
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('user_reviews');
  };