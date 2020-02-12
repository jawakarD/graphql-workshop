const { ApolloServer, gql } = require("apollo-server");

// Return all items when quering for menuItems
// Return the specific item when searching with some arguments
// Good Luck!

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
