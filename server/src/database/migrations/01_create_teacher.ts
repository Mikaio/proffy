import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('teachers', table => {
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('teachers');
}