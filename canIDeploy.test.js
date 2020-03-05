const path = require("path");
const { canIDeploy, getPacticipants } = require("./canIDeploy");

jest.setTimeout(60000);
describe("canIDeploy", () => {
  test("canIDeploy pacticipant test", async () => {
    const filePath = path.resolve(
      __dirname,
      "./__tests__/deploy-kustomization.yaml"
    );
    let result = getPacticipants({
      kustomizeFile: filePath,
      serviceNames: ["frontend", "gateway"]
    });
    expect(result.map(a => a.name)).toEqual(
      expect.arrayContaining(["Frontend", "Gateway"])
    );
    result = getPacticipants({
      kustomizeFile: filePath,
      serviceNames: ["frontend", "gateway", "auth-service"]
    });
    expect(result.map(a => a.name)).toEqual(
      expect.arrayContaining(["Frontend", "Gateway", "AuthService"])
    );
  });
});
