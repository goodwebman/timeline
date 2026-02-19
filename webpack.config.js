const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
	mode: isDev ? 'development' : 'production',

	entry: path.resolve(__dirname, 'src/index.tsx'),

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
		clean: true,
		publicPath: '/',
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	module: {
		rules: [
			// TS / TSX
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},

			// обычный CSS (index.css + node_modules CSS)
			{
				test: /\.css$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1, // для поддержки @import внутри CSS
						},
					},
				],
			},

			// SCSS modules
			{
				test: /\.module\.scss$/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: isDev ? '[name]__[local]' : '[hash:base64]',
							},
						},
					},
					'sass-loader',
				],
			},

			// обычный SCSS
			{
				test: /\.scss$/,
				exclude: /\.module\.scss$/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},

			// картинки / шрифты
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i,
				type: 'asset/resource',
			},
		],
	},

	plugins: [
		new HtmlPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
		}),

		new MiniCssExtractPlugin({
			filename: 'styles.[contenthash].css',
		}),
	],

	devServer: {
		port: 3000,
		historyApiFallback: true,
		hot: true,
		open: true,
	},

	devtool: isDev ? 'eval-source-map' : 'source-map',
}
