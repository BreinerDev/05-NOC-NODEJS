import { envs } from "../../../src/config/plugins/envs.plugin";

describe("envs.plugin.ts", () => {
  it("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3001,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "developertest123654@gmail.com",
      MAILER_SECRET_KEY: "ddto hbgy ubao vxkr",
      PROD: false,
      MONGO_USER: "breiner",
      MONGO_PASS: "123456789",
      MONGO_URL: "mongodb://breiner:123456789@localhost:27017/",
      MONGO_DB_NAME: "NOC-TEST",
      POSTGRES_USER: "postgres",
      POSTGRES_PASSWORD: "123456789",
      POSTGRES_DB: "NOC-TEST",
    });
  });

  it("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("../../../src/config/plugins/envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
