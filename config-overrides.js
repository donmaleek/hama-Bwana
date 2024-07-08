const { overrideDevServer } = require('customize-cra');

const setupDevServer = () => (config) => {
  config.setupMiddlewares = (middlewares, devServer) => {
    if (!devServer) {
      throw new Error('webpack-dev-server is not defined');
    }

    // Example: Add custom middleware before existing middlewares
    middlewares.unshift({
      name: 'custom-middleware-before',
      middleware: (req, res, next) => {
        console.log('Custom middleware before setup');
        next();
      },
    });

    // Example: Add custom middleware after existing middlewares
    middlewares.push({
      name: 'custom-middleware-after',
      middleware: (req, res, next) => {
        console.log('Custom middleware after setup');
        next();
      },
    });

    return middlewares;
  };
  return config;
};

module.exports = {
  devServer: overrideDevServer(setupDevServer()),
};
