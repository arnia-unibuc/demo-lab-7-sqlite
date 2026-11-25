const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLError,
} = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Author } = require("../models");
const { JWT_SECRET, requireUser } = require("../middleware/auth");
const BookType = require("./types/book");
const CreateBookInput = require("./inputs/create-book-input");

const MutationType = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    login: {
      type: GraphQLString,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        const user = await User.findOne({
          where: {
            username: args.username,
          },
        });

        if (!user || !(await bcrypt.compare(args.password, user.password))) {
          throw new GraphQLError("Invalid username or password!");
        }

        return jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          JWT_SECRET,
          {
            expiresIn: "1h",
          },
        );
      },
    },
    createBook: {
      type: BookType,
      args: { input: { type: new GraphQLNonNull(CreateBookInput) } },
      resolve: async (parent, args, context) => {
        requireUser(context);

        const { title, authorId, year, genre } = args.input;

        const author = await Author.findByPk(authorId);
        if (!author) {
          throw new GraphQLError(`Author with id ${authorId} does not exist!`);
        }

        return author.createBook({ title, year, genre });
      },
    },
  },
});

module.exports = MutationType;
