const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

const AuthorType = require("./author");
const GenreEnum = require("../enums/genre");
const PublicationInterface = require("../interfaces/publication");

const BookType = new GraphQLObjectType({
  name: "Book",
  interfaces: [PublicationInterface],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    authorId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (book) => book.AuthorId,
    },
    author: {
      type: new GraphQLNonNull(AuthorType),
      resolve: (book) => book.getAuthor(),
    },
    year: { type: GraphQLInt },
    genre: { type: GenreEnum },
    summary: {
      type: GraphQLString,
      resolve: (book) => `${book.title} by ${book.getAuthor().name}`,
    },
  },
});

module.exports = BookType;
