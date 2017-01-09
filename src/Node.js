// tooling
import tree2css from './tree2css';

const spliceDown = (node, offset, length, ...nodes) => {
	if (node.nodes) {
		node.nodes.splice(
			offset,
			length,
			...nodes
		);
	}

	return node;
};

const spliceUp = (node, offset, length, ...nodes) => {
	if (node.parent && node.parent.nodes) {
		node.parent.nodes.splice(
			node.parent.nodes.indexOf(node) + offset,
			length,
			...nodes
		);
	}

	return node;
};

class Node {
	constructor(overrides) {
		Object.assign(this, overrides);
	}

	replaceWith(...nodes) {
		return spliceUp(this, 0, 1, ...nodes.map(
			(node) => spliceUp(node, 0, 1)
		));
	}

	before(...nodes) {
		return spliceUp(this, -1, 0, ...nodes.map(
			(node) => spliceUp(node, 0, 1)
		));
	}

	after(...nodes) {
		return spliceUp(this, 1, 0, ...nodes.map(
			(node) => spliceUp(node, 0, 1)
		));
	}

	clone(overrides) {
		return Object.assign(new Node(), this, overrides);
	}

	prepend(...nodes) {
		return spliceDown(this, 0, 0, ...nodes.map(
			(node) => spliceUp(node, 0, 1)
		));
	}

	append(...nodes) {
		return spliceDown(this, this.nodes.length, 0, ...nodes.map(
			(node) => spliceUp(node, 0, 1)
		));
	}

	replaceChildren(...nodes) {
		return spliceDown(this, 0, this.nodes.length, ...nodes);
	}

	walk(fn) {
		if (this.nodes && this.nodes.length) {
			this.nodes.every(
				(node) => {
					const pass = fn(node) !== false;

					if (pass) {
						node.walk(fn);
					}

					return pass;
				}
			);
		}

		return this;
	}

	toString() {
		return tree2css[this.type](this);
	}
}

export default Node;
