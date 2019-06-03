const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeSiblingChunksPlugin = require("html-webpack-include-sibling-chunks-plugin");
const pkg = require(path.resolve(__dirname, "package"));

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = (env, argv) => {
	const isProduction = argv && argv.mode === "production";
	const plugins = [];

	if (isProduction) {
		const { CleanWebpackPlugin } = require("clean-webpack-plugin");
		const ZipPlugin = require("zip-webpack-plugin");

		plugins.push(...[
			new CleanWebpackPlugin(),
			new ZipPlugin({
				filename: "app.zip",
			})
		]);
	}

	const bundlePath = "js/";
	
	let config = {
		entry: {
			overlay: [path.resolve(__dirname, "src", "overlay")],
			config: [path.resolve(__dirname, "src", "config")],
			panel: [path.resolve(__dirname, "src", "panel")]
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".scss"],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "babel-loader"
						},
						{
							loader: "ts-loader",
							options: {
								getCustomTransformers: () => ({before: [styledComponentsTransformer]})
							}
						}]
				},
				{
					test: /.js$/,
					exclude: /node_modules/,
					use: ["babel-loader"]
				},
				{
					test: /\.scss$/,
					use: [
						{ loader: 'style-loader' },
						'css-modules-typescript-loader',
						{ loader: 'css-loader', options: { modules: true } },
						{ loader: 'sass-loader' , options: { sourceMap: true} }]
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[folder]/[name]-[hash].[ext]",
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
			...plugins
		],
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
