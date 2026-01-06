import { LogDataSource } from "../../../src/domain/datasources/log.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

describe("log.datasource.ts LogDatasource", () => {
  const newLog = new LogEntity({
    origin: "log.datasource.test.ts",
    message: "test-message",
    level: LogSeverityLevel.low,
  });

  class MockLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<Array<LogEntity>> {
      return [newLog];
    }
  }

  it("should test the abstract class", async () => {
    const mockLogDatasource = new MockLogDatasource();
    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(typeof mockLogDatasource.saveLog).toBe("function");
    expect(typeof mockLogDatasource.getLogs).toBe("function");

    await mockLogDatasource.saveLog(newLog);
    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
