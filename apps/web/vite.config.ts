import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import vitePluginSvgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true
        }),
        react(),
        tailwindcss(),
        vitePluginSvgr()
    ],
    resolve: {
        alias: {
            '@web': path.resolve(__dirname, './src')
        }
    }
});
