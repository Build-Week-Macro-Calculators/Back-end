// Update with your config settings.

const localPg = {
  host: "localhost",
  port: 5432,
  user: "anthony",
  database: "users"
};

const pgUser = process.env.PG_USER || "anthony";
const pgDb = process.env.PG_DB || "users";

const prodConnection = `postgres://${pgUser}@localhost/${pgDb}`;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/users.db3"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations"
    }
  }
};
