const { ApolloServer, gql } = require("apollo-server");

// Return all programmingLanguages when quering for programmingLanguages
// Return the specific programmingLanguage when searching with some arguments

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
