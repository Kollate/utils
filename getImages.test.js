const path = require("path");

const { getImages } = require("./getImages");

describe("getImages", () => {
  test("getImages works", () => {
    const r = getImages(
      path.resolve(__dirname + "/__tests__/kustomization.yaml")
    );
    expect(r).toMatchInlineSnapshot(`"alpine:3.7 hashicorp/http-echo:0.2.3"`);
  });
});
