module.exports = {
	'postcss-cccp': {
		'basic': {
			message: 'supports basic usage'
		},
		'basic:json': {
			message: 'supports { json: "test.json" } usage',
			options: {
				json: 'test/basic.custom.json'
			}
		},
		'basic:fn': {
			message: 'supports { json: Function } usage',
			options: {
				json: (json) => {
					const stringified = JSON.stringify(json);
					const expected = '[0,[1,"media","(min-width: 640px)",[2,"body",[3,"background-color","blue"]]]]';

					if (stringified !== expected) {
						throw new Error('Unexpected JSON');
					}
				}
			}
		}
	}
};
