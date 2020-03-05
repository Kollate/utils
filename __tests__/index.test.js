const yargs = require("yargs");
const loadImages = require("../loadImages");
const getImageTag = require("../getImageTag");
const { getImages } = require("../getImages");
// const temp = require("../temp");

// test("temp", done => {
//   const parser = yargs.command(temp);
//   parser.parse("get shit --banana=healthy", (err, argv, output) => {
//     console.log(argv);
//     done();
//   });
// });

// describe("load images", () => {
//   jest.setTimeout(60 * 1000);
//   test("Load all Images", async done => {
//     try {
//       loadImages({
//         yamlFile: __dirname + "/kustomization.yaml",
//         cb: done
//       });
//     } catch (e) {
//       console.log(e);
//       throw e;
//     }
//   });
//   test("Load images with skip", async done => {
//     try {
//       loadImages({
//         yamlFile: __dirname + "/kustomization.yaml",
//         cb: done,
//         skipImage: "hashicorp/http-echo"
//       });
//     } catch (e) {
//       console.log(e);
//       throw e;
//     }
//   });
// });

// describe("loadImages parser", () => {
//   test("loadImages file", async done => {
//     const parser = yargs.command(loadImages);
//     parser.parse("file", (err, argv, output) => {
//       expect(argv.file).toEqual("file");
//       expect(argv.kind).toEqual("kind");
//       done();
//     });
//   });
//   test("loadImages file --kind=kinder", async done => {
//     const parser = yargs.command(loadImages).help();
//     parser.parse("file --kind=kinder", (err, argv, output) => {
//       expect(argv.file).toEqual("file");
//       expect(argv.kind).toEqual("kinder");
//       done();
//     });
//   });
//   test("loadImages file --kind=kinder --skip=image", async done => {
//     const parser = yargs.command(loadImages).help();
//     parser.parse("file --kind=kinder --skip=image", (err, argv, output) => {
//       expect(argv._).toEqual(["file"]);
//       expect(argv.kind).toEqual("kinder");
//       expect(argv.skip).toEqual("image");
//       done();
//     });
//   });
// });

describe("get image", () => {
  // test("get image parser", done => {
  //   const parser = yargs.command(getImageTag);
  //   parser.parse("file image", (err, argv, output) => {
  //     expect(argv._).toEqual(["file", "image"]);
  //     done();
  //   });
  // });
  test("Get image", () => {
    try {
      expect(
        getImageTag({
          filePath: __dirname + "/kustomization.yaml",
          imageName: "hashicorp/http-echo"
        })
      ).toBe("0.2.3");
      expect(
        getImageTag({
          filePath: __dirname + "/kustomization.yaml",
          imageName: "alpine"
        })
      ).toBe("3.7");
    } catch (e) {
      console.log(e);
      throw e;
    }
  });
});
