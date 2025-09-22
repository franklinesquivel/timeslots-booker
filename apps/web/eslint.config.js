import js from '@eslint/js';
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
            ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules
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
    }
]);
