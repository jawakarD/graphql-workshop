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

    # there is a function called findByPk(find by primary key) that will return a MenuItem by id
    # use that to find a item and call destory on the item.
    # & Good luck!
    deleteMenuItem(id: ID!): MenuItem
  }

  type Query {
    menuItems: [MenuItem]
    menuItem(id: ID, name: String): MenuItem
  }
`;

const resolvers = {
  Query: {
    menuItems: () => MenuItem.findAll(),
    menuItem: (_, { id, name }) => {
      if (id) {
        return MenuItem.findByPk(id);
      }

      if (name) {
        return MenuItem.findOne({ where: { name } });
      }
    }
  },
  Mutation: {
    addMenuItem: async (_, { params: { name, price, rating } }) => {
      const menuItemCreated = await MenuItem.create({
        name,
        price
      });

      return menuItemCreated;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
