const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const NAME = 'nipplejs';

module.exports = env => { return {
    context: __dirname,
    entry: './src/index.js',
    mode: env !== 'production' ? 'development' : 'production',
    devServer:{
        contentBase: __dirname,
        publicPath: '/dist/',
        port: 9000,
    },
	optimization: {
		minimizer: [new UglifyJsPlugin({
		  uglifyOptions: {
		  output: {
			comments: false,
			max_line_len: 100
		  }}
		})],
	},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${NAME}.js`,
        library: NAME,
        libraryExport: 'default',
        libraryTarget: 'window',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
        ]
    }
}
};
