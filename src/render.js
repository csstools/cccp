import process from './process';

export default (json, plugins) => {
	const promise = process(json, plugins);

	promise.then(
		(css) => {
			const style = document.createElement('style');

			style.appendChild(
				document.createTextNode(css)
			);

			document.head.appendChild(style);
		}
	);
}
