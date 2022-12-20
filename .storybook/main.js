const path = require("path");

module.exports = {
  stories: ["../components/**/*.stories.{js,ts,jsx,tsx}"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: {
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    docsPage: true,
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      "@/": path.resolve(__dirname, "../"),
    };

    const svgLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    svgLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
