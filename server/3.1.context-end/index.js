require("dotenv").config({ path: "../.localenv" });
const { ApolloServer, gql } = require("apollo-server");
const { Sequelize, DataTypes } = require("sequelize");

const { DB_HOST, DB_USER, DB_PASS, DB, DB_PORT } = process.env;

// connect to database
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB}`
);

const MenuItem = sequelize.define("menuItem", {
  name: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT
  },
  category: {
    type: DataTypes.STRING
  }
});

const Review = sequelize.define("review", {
  comment: {
    type: DataTypes.STRING
  },
  authorId: {
    type: DataTypes.INTEGER
  }
});

MenuItem.hasMany(Review, { foreignKey: "menuItemId", constraints: false });

//MenuItem.sync();
//Review.sync();
//MenuItem.sync({ force: true });
//Review.sync({ force: true });

const typeDefs = gql`
  type Review {
    id: ID!
    comment: String!
    authorId: ID!
  }

  """
  Menu item represents a single menu item with a set of datas
  """
  type MenuItem {
    id: ID!
    name: String!
    price: Int
    rating: Int
    reviews: [Review]
  }

  input MenuItemInput {
    name: String!
    price: Int
    rating: Int
  }

  input ReviewInput {
    comment: String!
    authorId: ID!
    menuItemId: ID!
  }

  type Mutation {
    addMenuItem(params: MenuItemInput): MenuItem
    deleteMenuItem(id: ID!): MenuItem
    addReview(review: ReviewInput): Review
  }

  type Query {
    menuItems: [MenuItem]
    menuItem(id: ID, name: String): MenuItem
  }
`;

const resolvers = {
  Query: {
    menuItems: (parent, __, { menuItem }) =>
      menuItem.findAll({
        include: [{ model: Review }]
      }),
    menuItem: async (_, { id, name }, { menuItem }) => {
      if (id) {
        return await MenuItem.findByPk(id);
      }

      if (name) {
        return await MenuItem.findOne({ where: { name } });
      }
    }
  },
  Mutation: {
    addMenuItem: async (
      _,
      { params: { name, price, rating } },
      { menuItem }
    ) => {
      return menuItem.create({
        name,
        price,
        rating
      });
    },
    addReview: async (_, { review: { comment, authorId, menuItemId } }) => {
      return Review.create({
        comment,
        menuItemId,
        authorId
      });
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
