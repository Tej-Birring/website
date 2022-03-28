import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'

const fullPathToSrc = resolve(__dirname, './src');
const vueConfs = {
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("ion-")
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "sass:color";
        @import '${fullPathToSrc}/assets/scss/_vars.scss';
        @import '${fullPathToSrc}/assets/scss/_mixins.scss';
        `
      }
    }
  },
  resolve: {
    alias: {
      '/@': fullPathToSrc
    }
  },
  plugins: [
    vue(vueConfs),
    WindiCSS(),
  ]
})
