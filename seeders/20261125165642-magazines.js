"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const magazines = [
      { id: 1, title: "National Geographic", year: 2024, issue: 245 },
      { id: 2, title: "Wired", year: 2025, issue: 33 },
    ];
    const now = new Date();

    await queryInterface.bulkInsert(
      "Magazines",
      magazines.map((magazine) => ({
        ...magazine,
        createdAt: now,
        updatedAt: now,
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Magazines", null, {});
  },
};
