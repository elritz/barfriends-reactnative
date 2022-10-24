// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config')

// module.exports = getDefaultConfig(__dirname)


const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = "metro-minify-esbuild";
config.transformer.minifierConfig = {
  // ESBuild options...
};

module.exports = config;