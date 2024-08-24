const { override, addWebpackResolve } = require('customize-cra');
const path = require('path');

module.exports = override(
addWebpackResolve({
    fallback: {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "util": require.resolve("util/"),
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "url": require.resolve("url/"),
        "assert": require.resolve("assert/")
    }
    })
);