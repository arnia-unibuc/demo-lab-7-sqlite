"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const authors = [
      { id: 1, name: "Andrew Hunt", country: "USA" },
      { id: 2, name: "Robert C. Martin", country: "USA" },
      { id: 3, name: "Kyle Simpson", country: "USA" },
      { id: 4, name: "Frank Herbert", country: "USA" },
      { id: 5, name: "J.R.R. Tolkien", country: "UK" },
    ];

    const now = new Date();
    await queryInterface.bulkInsert(
      "Authors",
      authors.map((author) => ({
        ...author,
        createdAt: now,
        updatedAt: now,
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Authors", null, {});
  },
};
