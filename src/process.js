// tooling
import json2tree from './json2tree';

export default (json, plugins) => {
	const root = json2tree[json[0]](json);

	const interceptionMap = {};

	if (plugins && plugins.length) {
		plugins.forEach(
			(plugin) => Object.keys(plugin).forEach(
				(key) => {
					if (interceptionMap[key]) {
						interceptionMap[key].push(
							plugin[key]
						);
					} else {
						interceptionMap[key] = [
							plugin[key]
						];
					}
				}
			)
		);
	}

	const promises = [];

	root.walk(
		(node) => interceptionMap[node.type] && interceptionMap[node.type].forEach(
			(interception) => {
				promises.push(
					Promise.resolve(
						interception(node)
					)
				);
			}
		)
	);

	return Promise.all(promises).then(
		() => root
	);
};
