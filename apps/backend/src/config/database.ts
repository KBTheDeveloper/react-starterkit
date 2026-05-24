// create an user and database in postgres before use the config

import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dialect = process.env.DB_DIALECT || "sqlite";

let sequelize: Sequelize;

if (dialect === "postgres") {
  sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl:
        process.env.DB_SSL === "true"
          ? { require: true, rejectUnauthorized: false }
          : false,
    },
  });
} else {
  // fallback to SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage:
      process.env.DB_STORAGE || path.join(__dirname, "../../database.sqlite"),
    logging: false,
  });
}

export default sequelize;
