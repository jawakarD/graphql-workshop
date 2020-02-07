const { ApolloServer, gql } = require("apollo-server");

// Return all programmingLanguages when quering for programmingLanguages
// Return the specific programmingLanguage when searching with some arguments

const programmingLanguages = [
  {
    id: 1,
    name: "Go",
    git: "https://github.com/golang/go"
  },
  {
    id: 2,
    name: "elixir",
    git: "https://github.com/elixir-lang/elixir"
  }
];
