import sequelize from "../../config/database.js";
import User from "../User.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User Model", () => {
  it("should hash password before creation", async () => {
    const user = await User.create({
      name: "Hash Test",
      email: "hash@example.com",
      password: "plaintext123",
    });
    expect(user.password).not.toBe("plaintext123");
    expect(user.password).toHaveLength(60); // bcrypt hash length
  });

  it("should validate correct password", async () => {
    const user = await User.create({
      name: "Validate Test",
      email: "validate@example.com",
      password: "correctpass",
    });
    const isValid = await user.validatePassword("correctpass");
    expect(isValid).toBe(true);
  });
});
