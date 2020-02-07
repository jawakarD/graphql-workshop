const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    borrowed: true,
    borrower: "Jawakar"
  },
  {
    id: 2,
    title: "Jurassic Park",
    author: "Michael Crichton",
    borrowed: false
  }
];

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    borrowed: Boolean
    borrower: String
  }

  type Query {
    books: [Book]
    book(id: ID, title: String): Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id, title }) => {
      if (id) {
        return books.find(book => book.id === id);
      }

      if (title) {
        return books.find(book => book.title.includes(title));
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
