const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const { requireUser } = require("../middleware/auth");
const { User, Book, Author, Magazine } = require("../models");
const { Op } = require("sequelize");
const BookType = require("./types/book");
const AuthorType = require("./types/author");
const UserType = require("./types/user");
const BookFilterInput = require("./inputs/book-filter-input");
const PublicationInterface = require("./interfaces/publication");
const SearchResultUnion = require("./unions/search-result");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      args: { filter: { type: BookFilterInput } },
      resolve: (parent, args) => {
        const where = {};
        if (args.filter?.genre) {
          where.genre = args.filter.genre;
        }
        if (args.filter?.publishedAfter) {
          where.year = { [Op.gt]: args.filter.publishedAfter };
        }
        return Book.findAll({ where });
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => Author.findAll(),
    },
    publication: {
      type: new GraphQLList(PublicationInterface),
      resolve: async () => [
        ...(await Book.findAll()),
        ...(await Magazine.findAll()),
      ],
    },
    // Returns a mix of books and authors, typed by the union
    search: {
      type: new GraphQLList(SearchResultUnion),
      args: { term: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (parent, args) => {
        const term = args.term.toLowerCase();
        const books = await Book.findAll({
          where: { title: { [Op.like]: `%${args.term}%` } },
        });
        const authors = await Author.findAll({
          where: { name: { [Op.like]: `%${args.term}%` } },
        });
        return [...books, ...authors];
      },
    },
    book: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args) => Book.findByPk(args.id),
    },
    me: {
      type: UserType,
      resolve: async (parent, args, context) =>
        User.findByPk(requireUser(context).id),
    },
  },
});

module.exports = QueryType;
