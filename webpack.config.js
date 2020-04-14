
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports =
{
	mode: 'development',
	entry: "./src/js/index.js",
	output:
	{
		path: path.resolve(__dirname, "./build"),
		filename: "js/index.js"
	},
	plugins:
	[
		new HtmlWebpackPlugin(
		{
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new MiniCssExtractPlugin(
		{
			filename: 'css/style.css'
		}),
		new CopyPlugin(
		[
			{
				from : 'src/img/', 
				to : 'img/'
			}
    	])
	],
	module:
	{
		rules:
		[
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use:
				{
					loader: "babel-loader",
					options:
					{
						presets: ["@babel/preset-env"]
					}
				}
			},
			{
				test: /\.css$/i,
				use:
				[
					MiniCssExtractPlugin.loader,
					'css-loader'
				],
			}
		]
	},
	devServer:
	{
		contentBase: './build'
	}
};
