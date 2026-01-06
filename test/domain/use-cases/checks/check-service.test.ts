import { CheckService } from "../../../../src/domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../../../../src/infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../../../../src/infrastructure/datasources/file-system.datasource";

describe("check-service.test.ts", () => {
  const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
  const url = "http://google.com";

  it("should call successCallback when fetch returns true", async () => {
    const successCallback = () => console.log(`${url} is ok`);
    const errorCallback = (error) => console.log(error);

    const check = new CheckService(
      fsLogRepository,
      successCallback,
      errorCallback
    );

    const wasOk = await check.execute(url);

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
  });

  // it("should check if execute with an invalid URL", () => {
  //   const check = new CheckService(
  //     fsLogRepository,
  //     () => console.log(`${url} is ok`),
  //     (error) => console.log(error)
  //   );
  // });
});
