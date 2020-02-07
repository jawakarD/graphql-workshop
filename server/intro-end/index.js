const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    borrowed: true,
    borrower: "Jawakar"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    borrowed: false
  }
];

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    borrowed: Boolean
    borrower: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
