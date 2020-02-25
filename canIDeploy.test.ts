const path = require("path");
const { canIDeploy } = require("./canIDeploy");

jest.setTimeout(60000);
describe("canIDeploy", () => {
  test("canIDeploy", async () => {
    const filePath = path.resolve(
      __dirname,
      "./__tests__/deploy-kustomization.yaml"
    );
    await canIDeploy({
      kustomizeFile: filePath,
      retryTimes: 1,
      retryInterval: 10
    });
  });
});
