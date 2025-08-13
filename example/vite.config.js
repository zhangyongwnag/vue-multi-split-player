import {defineConfig} from 'vite'
import path, {resolve} from 'path'
import createVuePlugin from '@vitejs/plugin-vue2';

export default defineConfig(config => {
    let _publicPath = config.mode !== 'production' ? '/' : '/vue-multi-split-player/example/dist' // 配置后端服务默认的路径

    return {
        root: process.cwd(), // 项目根目录
        base: _publicPath,
        publicDir: 'public', // 静态资产的目录，默认 public
        cacheDir: 'node_modules/.vite', // esbuild预构建缓存(依赖/缓存)
        resolve: {
            // 项目别名
            alias: {
                'vue': 'vue/dist/vue.esm.js', // 采用运行时处理Vue库
                '@': path.resolve(__dirname, '../src'),
            },
            extensions: ['.js', '.vue', '.json', '.stylus'], // 引入对应的文件时可以忽略其后缀
        },
        server: {
            host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
            port: 3005, // 服务器端口号：默认3000，如果被占用，自动切换
            open: false, // 是否自动打开浏览器
            strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
            force: true, //是否强制依赖预构建
            proxy: {}, // 代理
            hmr: {
                protocol: 'ws',
                host: 'localhost',
                port: 3005,
                timeout: 0,
                clientPort: 3005,
                overlay: false
            },
            // 添加Node.js参数
            // nodeArgs: ['--max-old-space-size=256']
        },
        plugins: [
            createVuePlugin(),
            // tailwindcss({
            //   config: path.resolve(__dirname, '../tailwind.config.js') // Tailwind CSS 配置文件路径
            // }),
        ],
        build: {
            target: 'es2015',
            emptyOutDir: true, // 清空输出的文件夹
            outDir: resolve(__dirname, `../example/dist`), // 指定输出路径（相对于 项目根目录)
            assetsDir: '/', // 指定生成静态资源的存放路径（相对于 build.outDir)
            brotliSize: false, // 禁用压缩大小报告
            assetsInlineLimit: 1024 * 10, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
            // cssCodeSplit: true, // 启用 CSS 代码拆分
            chunkSizeWarningLimit: 1000, // chunk 大小警告的限制（以 kbs 为单位）
            // terserOptions: {
            //   compress: {
            //     keep_infinity: true,
            //     drop_console: false,
            //     drop_debugger: true
            //   }
            // }, // 去除开发代码
            sourcemap: false, // 构建后是否生成 source map 文件,
            copyPublicDir: true, // 复制静态资源
            reportCompressedSize: true, // gzip报告，这个会影响构建速度，可以选择性开启
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        // 将所有依赖项合并到一个 vendor chunk 中
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    },
                    // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
                    entryFileNames: 'js/[name]-[hash].js',
                    // 用于命名代码拆分时创建的共享块的输出命名
                    chunkFileNames: 'js/[name]-[hash].js',
                    // 用于输出静态资源的命名，[ext]表示文件扩展名
                    assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
                    // 拆分js到模块文件夹
                    // chunkFileNames: (chunkInfo) => {
                    //     const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
                    //     const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
                    //     return `js/${fileName}/[name].[hash].js`;
                    // },
                }
            },
            // minify: {
            //   terserOptions: {
            //     compress: {
            //       drop_console: false, // 清除日志
            //       drop_debugger: true // 清除debug
            //     }
            //   }
            // }
            minify: 'esbuild', // 或 'terser'，取决于你的需求 esbuild 比 terser 快 20-40 倍，压缩率只差 1%-2%
        },
        lintOnSave: 'warning', // 设置是否在开发环境下每次保存代码时都启用 eslint验证
        clearScreen: true, // 清除控制台信息
        appType: 'spa', // 项目类型 spa mpa
        preview: {
            port: 5000,
            proxy: {},
            open: true, // 打开窗口
            cors: true, // cors跨域
            headers: {} // 请求头
        },
        // vite 4.0
        optimizeDeps: {
            force: false // 强制依赖预构建
        }
    }
})

