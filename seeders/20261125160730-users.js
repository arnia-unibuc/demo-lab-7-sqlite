"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "student", password: "student123", role: "student" },
    ];
    const now = new Date();

    await queryInterface.bulkInsert(
      "Users",
      users.map((user) => {
        const usr = {
          ...user,
          password: bcrypt.hashSync(user.password, 10),
          createdAt: now,
          updatedAt: now,
        };
        console.log(`Inserting user: ${user.username}, role: ${user.role}`);
        return usr;
      }),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
