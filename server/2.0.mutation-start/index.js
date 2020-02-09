require("dotenv").config({ path: "../" });
const { ApolloServer, gql } = require("apollo-server");
const { Sequelize, DataTypes } = require("sequelize");

const { DB_HOST, DB_USER, DB_PASS, DB, DB_PORT } = process.env;

// connect to database
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB}`,
  {
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  }
);

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
