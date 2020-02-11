require("dotenv").config({ path: "../.env" });
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

const MenuItem = sequelize.define("menuItems", {
  name: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER
  },
  rating: {
    type: DataTypes.INTEGER
  }
});

// MenuItem.sync();
// MenuItem.sync({ force: true });

const typeDefs = gql`
  type MenuItem {
    id: ID!
    name: String!
    price: Int
    rating: Int
  }

  input MenuItemInput {
    name: String!
    price: Int
    rating: Int
  }

  type Mutation {
    addMenuItem(params: MenuItemInput): MenuItem
    deleteMenuItem(id: ID!): MenuItem
  }

  type Query {
    menuItems: [MenuItem]
    menuItem(id: ID, name: String): MenuItem
  }
`;

const resolvers = {
  Query: {
    menuItems: (parent, __, { menuItem }) => menuItem.findAll(),
    menuItem: (_, { id, name }, { menuItem }) => {
      if (id) {
        return MenuItem.findByPk(id);
      }

      if (name) {
        return MenuItem.findOne({ where: { name } });
      }
    }
  },
  Mutation: {
    addMenuItem: async (
      _,
      { params: { name, price, rating } },
      { menuItem }
    ) => {
      const menuItemCreated = await menuItem.create({
        name,
        price,
        rating
      });

      return menuItemCreated;
    },
    deleteMenuItem: async (_, { id }, { menuItem }) => {
      const menuItemToDelete = await menuItem.findByPk(id);
      menuItemToDelete.destroy();

      return menuItemToDelete;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { menuItem: MenuItem }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
