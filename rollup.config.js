import babel from 'rollup-plugin-babel';
import common from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
	plugins: [
		resolve(),
		common({
			include: 'node_modules/**'
		}),
		babel({
			presets: [
				[
					"es2015",
					{
						modules: false
					}
				]
			],
			plugins: [
				"external-helpers"
			]
		}),
		uglify()
	]
};
