import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'shell',
            remotes: {
                remote: 'http://localhost/remote/assets/remoteEntry.js',
            },
            shared: ['react', 'react-dom', 'antd', 'axios', 'i18next', 'react-i18next'],
        }),
    ],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@providers': path.resolve(__dirname, 'src/app/providers'),
        },
    },
    server: {
        port: 5173,
        proxy: { '/api': 'http://localhost:5000' },
    },
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
});
