const path = require('path') //модуль возвращает строчку с абсолютным путем от корневой папки
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // чистит нужную папку (dist)
const HTMLWebpackPlugin = require('html-webpack-plugin') // подключаю плагин для работы с html
const CopyPlugin = require('copy-webpack-plugin') // для перетаскивания фавиконок
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // чтобы выносить css в отдельный файл

//отвечают за режим сборки, определяю в каком режиме зборки сейчас нахожусь, присваиваю значение в package.json
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

// возвращает название файла в зависимости от режима сборки, без хеша для development и с хешем для production
const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`)

// возвращает массив с обьектами лоадеров для js
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}

// експортирую обьект с конфигурациями
module.exports = {
  context: path.resolve(__dirname, 'src'), //указываем где лежат исходники
  mode: 'development', // указываю режим разработки (по умолчанию это разработка)
  entry: ['@babel/polyfill', './index.js'], // указываю входную точку
  output: {
    filename: filename('js'), // указываю название конечного файла и хеширую
    path: path.resolve(__dirname, 'dist'), // указываю конечную папку куда буду все складывать
  },
  resolve: {
    extensions: ['.js'], // какие файлы грузить по умолчанию
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    }, // alias - сокращения для путей к папкам и файлам
  },
  devtool: isDev ? 'source-map' : false, // добавляет карту кода если мы в режиме рвазработки
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: [
    // набор плагинов
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd, // удаление коментариев если это продакшин сборка isProd == true
        collapseWhitespace: isProd, // удаление пробеллов если это продакшин сборка isProd == true
      },
    }), // указываю откуда брать шаблон для html
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]), // чтобы переносить фавикон
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      // лоадеры
      {
        // css лоадер
        test: /\.s[ac]ss$/i, // тестируем либо sass либо scss
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader', // потом через css лоадер
          'sass-loader', // сначала пропускаеться через sass лоадер
        ],
      },
      {
        // babel лоадер
        test: /\.js$/, // пропускаем js через babel лоадер
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
}
