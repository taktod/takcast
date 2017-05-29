/**
 * @takcast/ではじまるpluginをみつけて、
 * src/plugins/node.tsとsrc/plugins/render.tsに登録するスクリプト
 */
var fs = require("fs");
var copy = (src, dest) => {
  return new Promise((resolve, reject) => {
    var r = fs.createReadStream(src);
    var w = fs.createWriteStream(dest);
    r.pipe(w);
    r.on("end", () => {
      resolve();
    });
    r.on("error", () => {
      reject();
    });
    w.on("error", () => {
      reject()
    });
  });
}

// まずsrc/plugins/*.base.tsをsrc/plugins/*.tsにコピーする。
copy("src/plugins/render.base.ts", "src/plugins/render.ts")
.then(copy("src/plugins/node.base.ts", "src/plugins/node.ts"))
.then(() => {
  // pluginを検索して登録していく。
  if(fs.statSync("node_modules/@takcast").isDirectory()) {
    fs.readdir("node_modules/@takcast", (err, files) => {
      files.forEach((file) => {
        fs.appendFileSync("src/plugins/render.ts",
          "import * as tc_" + file + " from \"@takcast/" + file + "/render\";\n"
        + "setPlugin(plugins, tc_" + file + "._);\n")
        fs.appendFileSync("src/plugins/node.ts",
          "import * as tc_" + file + " from \"@takcast/" + file + "/node\";\n"
        + "setPlugin(plugins, tc_" + file + "._);\n")
      })
    });
  }
}).catch(() => {
});
