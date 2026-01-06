import { LogModel } from "../../../../src/data/mongo/models/log.model";
import { MongoDatabase } from "../../../../src/data/mongo/init";
import { envs } from "../../../../src/config/plugins/envs.plugin";
import mongoose from "mongoose";

describe("log.model", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(() => mongoose.connection.close());

  it("should create schema model", async () => {
    const logData = {
      origin: "log.model.test.ts",
      message: "test-message",
      level: "low",
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  it("should return the schema object", () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          enum: { low: "low", medium: "medium", high: "high" },
          default: "low",
        },
        message: { type: expect.any(Function), required: true },
        createdAt: expect.any(Object),
        origin: { type: expect.any(Function), required: true },
      })
    );
  });
});
