"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const books = [
      {
        id: 1,
        title: "The Pragmatic Programmer",
        year: 1999,
        genre: "programming",
        AuthorId: 1,
      },
      {
        id: 2,
        title: "Clean Code",
        year: 2008,
        genre: "programming",
        AuthorId: 2,
      },
      {
        id: 3,
        title: "You Don't Know JS",
        year: 2014,
        genre: "programming",
        AuthorId: 3,
      },
      { id: 4, title: "Dune", year: 1965, genre: "sci-fi", AuthorId: 4 },
      { id: 5, title: "The Hobbit", year: 1937, genre: "fantasy", AuthorId: 5 },
    ];
    const now = new Date();
    await queryInterface.bulkInsert(
      "Books",
      books.map((book) => ({
        ...book,
        createdAt: now,
        updatedAt: now,
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
