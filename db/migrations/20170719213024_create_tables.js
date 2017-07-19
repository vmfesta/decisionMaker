exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("decisions", function(table) {
      table.increments();
      table.string("title");
      table.string("description");
      table.string("adm_link");
      table.string("sub_link");
      table.string("result_link");
    }),
    knex.schema.createTable("pool", function(table) {
      table.increments();
      table.bigInteger('decision_id').unsigned().index().references('id').inTable('decisions ')
      table.string("option_description");
      table.integer("votes");
    })
  ]);
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('decisions');
    knex.schema.dropTable('pool')
};
