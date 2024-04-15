/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// knex migration file for users table
// knex migration file for users table
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('user_id');
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('username');
    table.string('password');
    table.string('phone_number');
    table.string('address');
    table.timestamps();
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
