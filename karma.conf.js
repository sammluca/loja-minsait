module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      { pattern: './src/test.ts', watched: false }
    ],

    preprocessors: {
      './src/test.ts': ['webpack']
    },

    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },

    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    singleRun: false,

    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.js']
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'ts-loader',
                options: { transpileOnly: true }
              }
            ]
          }
        ]
      }
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-webpack')
    ]
  });
};
