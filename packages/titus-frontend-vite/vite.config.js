import path from 'path'

import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import nodePolyfills from 'rollup-plugin-polyfill-node'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  define: {
    global: {},
    process: {
      env: {}
    }
  },
  resolve: {
    alias: {
      lib: path.join(__dirname, 'src/lib'),
      components: path.join(__dirname, 'src/components'),
      pages: path.join(__dirname, 'src/pages')
    }
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills(/* options */)]
    }
  }
})
