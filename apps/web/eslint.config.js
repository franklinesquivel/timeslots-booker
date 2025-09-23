import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['src/routeTree.gen.ts'],
        extends: [
            js.configs.recommended,

            tseslint.configs.recommended,
            tseslint.configs.strictTypeChecked,
            tseslint.configs.stylisticTypeChecked,

            reactHooks.configs['recommended-latest'],

            reactRefresh.configs.vite,

            eslintPluginPrettierRecommended,
            eslintConfigPrettier,

            reactPlugin.configs.flat.recommended,
            reactPlugin.configs.flat['jsx-runtime']
        ],
        plugins: {
            'better-tailwindcss': eslintPluginBetterTailwindcss
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        rules: {
            ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,

            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true
                }
            ],
            'react/jsx-boolean-value': 'error',
            'react/jsx-newline': 'off', // incompatible with prettier
            'react/jsx-no-useless-fragment': 'error',
            'react/jsx-pascal-case': [
                'error',
                {
                    allowAllCaps: false
                }
            ],
            'react/jsx-sort-props': [
                'warn',
                {
                    callbacksLast: true,
                    multiline: 'last',
                    shorthandFirst: true,
                    reservedFirst: true
                }
            ],
            'react/jsx-wrap-multilines': [
                'warn',
                {
                    arrow: 'parens-new-line',
                    assignment: 'parens-new-line',
                    condition: 'parens-new-line',
                    declaration: 'parens-new-line',
                    logical: 'parens-new-line',
                    prop: 'parens-new-line',
                    return: 'parens-new-line'
                }
            ],
            'react/prefer-read-only-props': 'warn',
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/self-closing-comp': [
                'error',
                {
                    component: true,
                    html: true
                }
            ],

            'better-tailwindcss/enforce-consistent-line-wrapping': [
                'error',
                {
                    printWidth: 120,
                    indent: 4
                }
            ],

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }
            ]
        },
        settings: {
            'better-tailwindcss': {
                entryPoint: 'src/index.css'
            },
            react: {
                version: 'detect'
            }
        }
    },
    {
        // We have to disable the rule for shadcn components. ref: https://github.com/shadcn-ui/ui/issues/1534
        files: ['src/components/ui/**/*.tsx'],
        rules: {
            'react-refresh/only-export-components': 'off'
        }
    },
    {
        // TanStack Router uses this pattern for redirects
        files: ['src/routes/**/*.tsx'],
        rules: {
            'no-throw-literal': 'off',
            '@typescript-eslint/only-throw-error': 'off'
        }
    }
]);
