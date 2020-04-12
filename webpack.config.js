
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin(
		{
			filename: 'css/style.css'
		})
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
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				options:
				{
					attributes:
					{
						list:
						[
							{
								tag: 'img',
								attribute: 'src',
								type: 'src',
							},
						]
					}
				}
			},
			{
				test: /\.(svg|png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options:
				{
					outputPath: 'res',
				}
			},
		]
	},
	devServer:
	{
		contentBase: './build'
	},
	node:
	{
		fs: 'empty'
	}
};
