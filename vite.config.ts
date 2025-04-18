import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      '@': '/src/', // 设置@指向src
      '@components': '/src/components', // 设置@components指向src/components
    }
  }
})
