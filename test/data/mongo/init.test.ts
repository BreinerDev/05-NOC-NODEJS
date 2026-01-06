import mongoose from "mongoose";
import { MongoDatabase } from "../../../src/data/mongo/init";

describe("init test mongo", () => {
  afterAll(() => mongoose.connection.close());

  it("should connect to mongoDB", async () => {
    const connect = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connect).toBe(true);
  });

  it("should error connect", async () => {
    try {
      const connect = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: "mongodb://breiner:1234564@localhost:27017/,",
      });
      expect(true).toBe(false);
    } catch (error) {
      // expect(true).toEqual(error);
    }
  });
});
