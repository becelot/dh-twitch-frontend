const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeSiblingChunksPlugin = require("html-webpack-include-sibling-chunks-plugin");
const pkg = require(path.resolve(__dirname, "package"));

module.exports = (env, argv) => {
	const plugins = [];

	const bundlePath = "js/";
	
	let config = {
		entry: {
			overlay: [path.resolve(__dirname, "src", "overlay")],
			config: [path.resolve(__dirname, "src", "config")],
			panel: [path.resolve(__dirname, "src", "panel")]
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: ["babel-loader", "ts-loader"]
				},
				{
					test: /.js$/,
					exclude: /node_modules/,
					use: ["babel-loader"]
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "img/",
							},
						},
					],
				},
				{
					test: /\.otf/,
					exclude: /node_modules/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "fonts/",
							},
						},
					],
				},
			],
		},
		optimization: {
			minimize: false
		},
		devServer: {
			contentBase: "./dist",
			https: true,
			overlay: true,
		},
		output: {
			filename: path.join(bundlePath, "[name].js"),
			path: path.resolve(__dirname, "dist"),
		},
		plugins: [
			new webpack.DefinePlugin({
				APPLICATION_VERSION: JSON.stringify(pkg.version),
			}),
			new HtmlWebpackPlugin({
				filename: "index.html",
				chunks: ["overlay"],
				template: path.resolve(__dirname, "template.html"),
			}),
			new HtmlWebpackPlugin({
				filename: "video_component.html",
				chunks: ["overlay"],
				template: path.resolve(__dirname, "template.html"),
			}),
			new HtmlWebpackPlugin({
				filename: "config.html",
				chunks: ["config"],
				template: path.resolve(__dirname, "template.html"),
			}),
			new HtmlWebpackPlugin({
				filename: "panel.html",
				chunks: ["panel"],
				template: path.resolve(__dirname, "template.html"),
			}),
			new HtmlWebpackIncludeSiblingChunksPlugin(),
		].concat(plugins),
	};
	
	if (argv.mode === 'development') {
		config.devServer = {
			contentBase: "./dist",
			host:argv.devrig ? 'localhost.rig.twitch.tv' : 'localhost',
			headers: {
			    'Access-Control-Allow-Origin': '*'
			},
			port: 8080
		}
	}
		

	return config;
};
