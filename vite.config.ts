import path, { resolve } from 'node:path'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import zip from 'vite-plugin-zip-pack'
import manifest from './manifest.config.ts'
import { name, version } from './package.json'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  plugins: [
    vue(),
    tailwindcss(),
    crx({ manifest }),
    zip({ outDir: 'release', outFileName: `crx-${name}-${version}.zip` }),
  ],
  server: {
    cors: {
      origin: [
        /chrome-extension:\/\//,
      ],
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        background: resolve(__dirname, 'src/content/background.ts'),
        picker: resolve(__dirname, 'src/content/picker.js')
      },
      output: {
        entryFileNames: assetInfo => {
          // 根据文件名分类输出
          if (assetInfo.name?.includes('picker')) {
            return 'scripts/[name].js'
          }
          if (assetInfo.name?.includes('background')) {
            return 'background/[name].js'
          }
          return '[name].js'
        }
      }
    }
  }
})