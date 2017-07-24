exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("decisions", function(table) {
      table.increments();
      table.string("title");
      table.string("description");
      table.string("adm_link");
      table.string("sub_link");
      table.string("result_link");
      table.string("creator_email");
    }),
    knex.schema.createTable("pool", function(table) {
      table.increments();
      table
        .bigInteger("decision_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("decisions ");
      table.string("option_title");
      table.string("option_description");
      table.integer("votes");
    }),
    knex.schema.createTable("votes", function(table) {
      table.increments();
      table
        .bigInteger("decision_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("decisions ");
      table.string("votes");
    })
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("decisions");
  knex.schema.dropTable("pool");
  knex.schema.dropTable("votes");
};
