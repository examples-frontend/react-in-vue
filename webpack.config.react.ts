import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { loader as CssExtractLoader } from 'mini-css-extract-plugin';
import { plugins } from './webpack/plugins';
import { cssModulesRules } from './webpack/styles';
import path from 'path';

import TerserPlugin from 'terser-webpack-plugin';
// -------------------------------------------------//
const devServer: DevServerConfiguration = {
  historyApiFallback: true,
  port: 8081,
  client: {
    logging: 'none',
  },
};

// -------------------------------------------------//
export default (): WebpackConfiguration => {
  const isDev = process.env.NODE_ENV === 'development';

  const cssRegex = /\.(s*)css$/;
  const cssModuleRegex = /\.module\.(s*)css$/;
  // const cssGlobalRegex = /\.global\.(s*)css$/;

  // configs
  const config: WebpackConfiguration = {
    devServer,
    devtool: 'hidden-source-map',
    entry: {
      index: path.resolve('./src/react.tsx'),
      // index: path.resolve('./src/vue.ts'),
    },
    output: {
      // publicPath: '/', // if use BrowserRouter
      path: path.resolve('./dist'),
      filename: 'js/[name].js',
    },
    target: 'web',
    mode: isDev ? 'development' : 'production',
    plugins: plugins(isDev),
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.css', '.less', '.scss', '.vue'],
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
       },
        //-------------------------------//
        // scripts
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        //-------------------------------//
        // styles
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: [
            isDev ? 'style-loader' : CssExtractLoader,
            cssModulesRules(isDev),
          ],
        },
        // {
        //   test: cssGlobalRegex,
        //   use: [
        //     isDev ? 'style-loader' : CssExtractLoader,
        //     cssModulesRules(isDev),
        //     'sass-loader',
        //   ],
        // },
        {
          test: cssModuleRegex,
          use: [
            isDev ? 'style-loader' : CssExtractLoader,
            cssModulesRules(isDev, true),
          ],
        },
        //-------------------------------//
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        //-------------------------------//
      ],
    },
    //-------------------------------//
    optimization: {
      minimize: !isDev, //
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name(module) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
              )[1];
              return `vendor/${packageName}`;
            },
          },
        },
      },
    },
  };

  return config;
};
