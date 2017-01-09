import Node from './Node';

const array2tree = (nodes, parent) => nodes.map(
	(node) => json2tree[
		node[0]
	](node, parent)
);

const json2tree = [
	// root
	(part, parent) => new Node({
		type: 'root',
		nodes: array2tree(
			part.slice(1),
			parent
		)
	}),

	// at-rule
	(part, parent) => {
		const node = new Node({
			type:   'atrule',
			name:   part[1],
			params: part[2],
			parent: parent
		});

		node.nodes = array2tree(part.slice(3), node);

		return node;
	},

	// rule
	(part, parent) => {
		const node = new Node({
			type:     'rule',
			selector: part[1],
			parent:   parent
		});

		node.nodes = array2tree(part.slice(2), node);

		return node;
	},

	// declaration
	(part, parent) => new Node({
		type:   'decl',
		prop:   part[1],
		value:  part[2],
		parent: parent
	})
];

export default json2tree;
