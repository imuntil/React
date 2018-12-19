const path = require('path')
const context = path.resolve(__dirname, '../')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          require.resolve('sass-loader')
        ],
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          // 'resolve-url',
          'sass-loader?sourceMap'
        ],
        include: context
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../node_modules/antd')
      },
      {
        include: context,
        loader: 'babel-loader',
        query: {
          plugins: [
            '@babel/transform-react-jsx',
            '@babel/plugin-proposal-class-properties',
            [
              'react-css-modules',
              {
                filetypes: {
                  '.scss': {
                    syntax: 'postcss-scss'
                  }
                }
              }
            ],
            [
              'transform-class-properties',
              {
                spec: true
              }
            ],
            [
              'import',
              {
                libraryName: 'antd',
                style: 'css'
              }
            ]
          ]
        },
        test: /\.js$/
      }
      // {
      //   test: /\.css/,
      //   loaders: [
      //     'style-loader?sourceMap',
      //     'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      //   ]
      // }
    ]
  }
}
