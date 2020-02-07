const { ApolloServer, gql } = require("apollo-server");

// Return all languages when quering for languages
// Return the specific language when searching with some arguments

const languages = [
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

const typeDefs = gql`
  type Language {
    id: ID!
    name: String!
    git: String
  }

  type Query {
    languages: [Language]
    language(id: ID, name: String): Language
  }
`;

const resolvers = {
  Query: {
    languages: () => languages,
    language: (_, { id, name }) => {
      if (id) {
        return languages.find(language => language.id === id);
      }

      if (name) {
        return languages.find(language => language.name.includes(name));
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
