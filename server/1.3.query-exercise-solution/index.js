const { ApolloServer, gql } = require("apollo-server");

// Return all menuItems when quering for menuItems
// Return the specific menuItem when searching with some arguments

const menuItems = [
  {
    id: 1,
    name: "Idly",
    price: 5
  },
  {
    id: 2,
    name: "Dosa",
    price: 10
  },
  {
    id: 3,
    name: "White rice",
    price: 30
  }
];

const typeDefs = gql`
  type MenuItem {
    id: ID!
    name: String!
    price: Int
  }

  type Query {
    menuItems: [MenuItem]
    menuItem(id: ID, name: String): MenuItem
  }
`;

const resolvers = {
  Query: {
    menuItems: () => menuItems,
    menuItem: (_, { id, name }) => {
      if (id) {
        return menuItems.find(menuItem => menuItem.id === id);
      }

      if (name) {
        return menuItems.find(menuItem => menuItem.name.includes(name));
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
