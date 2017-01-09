// tooling
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

// plugin
module.exports = postcss.plugin('postcss-cccp', ({ json } = {}) => (css) => {
	// numeric types of data
	const types = {
		root: 0,
		atrule: 1,
		rule: 2,
		decl: 3
	};

	// props for numeric types of data
	const props = [
		[],
		['name', 'params'],
		['selector'],
		['prop', 'value']
	];

	// walk each node
	const walk = (node) => {
		// numeric type of data
		const type = types[node.type];

		// data with numeric type and properties
		const data = [type].concat(
			props[type].map(
				(prop) => node[prop]
			)
		);

		// if node has children
		if (node.nodes && node.nodes.length) {
			// add them to the data
			data.push(
				...node.nodes.map(walk)
			);
		}

		return data;
	};

	// stringified json
	const cccpJSON = walk(css);

	if (typeof json === 'function') {
		return Promise.resolve(
			json(cccpJSON)
		);
	} else {
		// path to JSON
		const pathToJSON = json ? path.resolve(json) : `${ css.source.input.file || path.join(process.cwd(), 'index') }.json`;

		return new Promise(
			// write CSS as JSON
			(resolve, reject) => fs.writeFile(
				pathToJSON,
				JSON.stringify(cccpJSON),
				(error, ...results) => error ? reject(error) : resolve(...results)
			)
		);
	}
});
