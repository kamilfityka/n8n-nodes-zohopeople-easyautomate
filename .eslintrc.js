module.exports = {
	root: true,
	env: {
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
		ecmaVersion: 2022,
		extraFileExtensions: ['.json'],
	},
	ignorePatterns: [
		'.eslintrc.js',
		'**/*.js',
		'node_modules',
		'dist',
	],
	overrides: [
		{
			files: ['./credentials/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/credentials'],
			rules: {
				'n8n-nodes-base/cred-class-name-unsuffixed': 'off',
				'n8n-nodes-base/cred-filename-against-convention': 'off',
				'n8n-nodes-base/cred-class-field-documentation-url-not-http-url': 'off',
				'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
			},
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/nodes'],
			rules: {
				'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
				'n8n-nodes-base/node-dirname-against-convention': 'off',
				'n8n-nodes-base/node-filename-against-convention': 'off',
				'n8n-nodes-base/node-param-default-wrong-for-limit': 'off',
				'n8n-nodes-base/node-param-description-excess-inner-whitespace': 'off',
				'n8n-nodes-base/node-param-display-name-excess-inner-whitespace': 'off',
			},
		},
		{
			files: ['./test/**/*.ts'],
			rules: {
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'import/no-extraneous-dependencies': 'off',
			},
		},
	],
};
