#!/bin/bash
# Drops the database, recreates the tables and fills them with seed data.
# SQLite keeps the whole database in a single file, so "drop" = delete that file.
set -e

rm -f db.sqlite
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all