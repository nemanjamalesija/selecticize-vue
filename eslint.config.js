import configBase from 'eslint-config-nitpick';
import configTypescript from 'eslint-config-nitpick/typescript';
import configBrowser from 'eslint-config-nitpick/browser';
import configVue from 'eslint-config-nitpick/vue';
import configPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginUnicorn from 'eslint-plugin-unicorn';

export default [
	configBase,
	configBrowser,
	configTypescript,
	...configVue,
	configPrettier,
	{
		plugins: {
			import: pluginImport,
			prettier: pluginPrettier,
			unicorn: pluginUnicorn
		},
		'rules': {
			'import/prefer-default-export': 0,
			'unicorn/explicit-length-check': 0,
			'prettier/prettier': 1,
			'import/order': [
				1,
				{
					'pathGroups': [
						{
							'pattern': 'vue',
							'group': 'external',
							'position': 'before'
						}
					],
					'newlines-between': 'never'
				}
			],
			'object-shorthand': 0,
			'capitalized-comments': 0,
			'quote-props': 0,
			'multiline-comment-style': 0,
			'no-useless-return': 0,
			'dot-notation': 0,
			'unicorn/filename-case': [
				2,
				{
					'case': 'kebabCase'
				}
			],
			'unicorn/prevent-abbreviations': 0,
			'unicorn/prefer-string-slice': 0,
			'unicorn/prefer-dataset': 0,
			'unicorn/prefer-dom-node-dataset': 0,
			'unicorn/no-lonely-if': 0,
			'unicorn/prefer-spread': 0,
			'unicorn/prefer-flat-map': 0,
			'unicorn/prefer-at': 0,
			'unicorn/prefer-object-has-own': 0,
			'unicorn/prefer-object-from-entries': 0,
			'prefer-object-has-own': 0,
			'no-useless-escape': 0,
			'import/named': 2,
			'import/default': 2,
			'unicorn/prefer-native-coercion-functions': 0,
			'unicorn/no-useless-promise-resolve-reject': 0,
			'unicorn/no-await-expression-member': 0,
			'unicorn/prefer-module': 2,
			'import/no-commonjs': 2,
			'import/no-unresolved': 2,
			'jsdoc/require-description-complete-sentence': 0
		}
	},

	{
		'files': ['src/**/*'],
		'rules': {
			'import/no-nodejs-modules': 2,
			'vue/v-if-else-key': 0,
			'vue/require-default-prop': 0,
			'vue/new-line-between-multi-line-property': 0,
			'vue/no-multiple-template-root': 0,
			'vue/no-v-for-template-key': 0,
			'vue/v-on-event-hyphenation': 0,
			'vue/custom-event-name-casing': 0,
			'vue/no-reserved-component-names': 0,
			'vue/require-explicit-emits': 0,
			'vue/prefer-prop-type-boolean-first': 0,
			'vue/no-static-inline-styles': 0,
			'vue/no-undef-components': [
				2,
				{
					'ignorePatterns': ['RouterView', 'RouterLink']
				}
			],
			'vue/component-name-in-template-casing': [
				2,
				'PascalCase',
				{
					'ignores': [
						'svg',
						'rect',
						'component',
						'transition',
						'transition-group',
						'keep-alive',
						'slot'
					]
				}
			],
			'vue/order-in-components': [
				2,
				{
					'order': [
						'el',
						'name',
						'key',
						'parent',
						'functional',
						['delimiters', 'comments'],
						['components', 'directives', 'filters'],
						'extends',
						'mixins',
						['provide', 'inject'],
						'ROUTER_GUARDS',
						'layout',
						'validate',
						'scrollToTop',
						'transition',
						'loading',
						'inheritAttrs',
						'model',
						['props', 'propsData'],
						'emits',
						'setup',
						'data',
						'fetch',
						'head',
						'computed',
						'watch',
						'watchQuery',
						'LIFECYCLE_HOOKS',
						'methods',
						['template', 'render'],
						'renderError'
					]
				}
			]
		}
	},

	{
		ignores: ['**/*.json']
	}
];
