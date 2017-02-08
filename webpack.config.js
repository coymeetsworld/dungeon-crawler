var webpack = require('webpack');
var path = require('path');

module.exports = {
	
	/* Where it should start processing your code. */
	entry: [
		'./app/index.jsx',
	],
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	plugins: [
	  new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }   
    }), 
	],
	resolve: {			
		root: __dirname, /* variable in node.js that gives path to file you're in */
		modulesDirectories: [
			'node_modules',
			'./app/components',	
		],
		alias: { /* Webpack aliases */
			applicationStyles: 'app/styles/app.scss',
			actions: 'app/actions/actions.jsx',
			reducers: 'app/reducers/reducers.jsx',
			configureStore: 'app/store/configureStore.jsx'
		},
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders:  [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, './node_modules/normalize-scss/sass')
		]
	},
	devtool: 'cheap-module-eval-source-map' /* for debugging, shows actual code not webpack code */
};
