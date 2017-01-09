const tree2css = {
	root: (node) => node.nodes.map(
		(childNode) => tree2css[
			childNode.type
		](childNode)
	).join(''),
	atrule: (node) => `@${ node.name } ${ node.params }{${ tree2css.root(node) }}`,
	rule: (node) => `${ node.selector }{${ tree2css.root(node) }}`,
	decl: (node) => `${ node.prop }:${ node.value };`
};

export default tree2css;
