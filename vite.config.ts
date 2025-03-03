import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|tsx)$/,
      babel: {
        plugins: ['styled-components'],
        babelrc: false,
        configFile: false,
      },
    }),
    svgr(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.nytimes.com/svc/archive/v1/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),

        configure: (proxy, options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Request sent to target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              'Response received from target:',
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
