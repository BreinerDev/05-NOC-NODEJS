import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

describe("LogEntity", () => {
  const dataObj = {
    message: "Test log message",
    level: LogSeverityLevel.low,
    origin: "log.entity.test.ts",
  };

  it("should create a LogEntity instance", () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
  });

  it("should create a LogEntity instance from json", () => {
    const json = `{"message":"Service http://google.com working","level":"low","createdAt":"2025-06-04T20:16:45.388Z","origin":"check-service.ts"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Service http://google.com working");
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it("should create a LogEntity instance from object", () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
