import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const proxyTarget = env.API_PROXY_TARGET || 'http://localhost:3000';
    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: proxyTarget,
                    changeOrigin: true,
                },
            },
        },
    };
});
