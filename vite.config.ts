import { fileURLToPath, URL } from "node:url"
/**
 * node导入语句的查找顺序:逐级往上查找node_modules 直到根目录为止
 * 命令行没有npx的查找顺序:先查找当前目录下的node_modules/.bin 如果没有 再查找全局node_modules/.bin
 * 命令行有npx的查找顺序:直接查找环境变量中配置的可执行文件路径(系统变量中的path)
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
// api和组件的自动导入(这两个到时候会生成相应的类型文件 里面保存有各个组件/api的导入语句)
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// 图标的自动导入(除去vite中的相关配置以外 我们还需要进行ep依赖的安装以及将user/cellphone等组件名改成i-ep-user的操作)
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"

// 样式的自动导入
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from "vite-plugin-style-import"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ["ep"]
        })
      ]
    }),
    Icons({
      autoInstall: true
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      // vite会为我们默认配置好src绝对路径的别名的 URL实例会根据import.meta.url(当前文件所在的绝对路径)来获取src相对路径的绝对路径
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
