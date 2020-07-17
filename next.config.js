const withImages = require('next-images')

module.exports = withImages({
	webpack: config => {
		config.module.rules.push({
			test: /\.(frag|vert|glsl)$/,
			exclude: /node_modules/,
			use: ['raw-loader', 'glslify-loader'],
		})
		config.module.rules.push({
			test: /\.m?js$/,
			exclude: /node_modules\/(?!(swiper|dom7)\/).*/,
			use: {
				loader: 'babel-loader',
			},
		},)
		return config
	}
})
