module.exports = {
  pages: {
    options: {
      entry: "src/options.js",
      template: "public/options.html",
      filename: "options.html",
      title: "Options Page"
    },
    app: {
      entry: "src/extension.js",
      template: "public/index.html",
      filename: "app.html", // This file will be deleted, since our extension is a JS file we'll run on every page
      title: "App Page"
    },
    popup: {
      entry: "src/popup.js",
      template: "public/popup.html",
      filename: "popup.html",
      title: "Popup"
    },
  },
  filenameHashing: false,
  chainWebpack: config => { // https://forum.vuejs.org/t/disable-code-splitting-in-vue-cli-3/36295/8
    config.optimization.splitChunks(false);
  }
};
