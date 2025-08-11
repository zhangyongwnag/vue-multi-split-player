import {defineConfig} from 'vite'
import path, {resolve} from 'path'
import tailwindcss from "tailwindcss";
import babel from 'vite-plugin-babel'
import createVuePlugin from '@vitejs/plugin-vue2';

// 移除checkVersion和proxyConfig相关代码，因为打包库不需要这些

export default defineConfig(config => {
    return {
        resolve: {
            // 项目别名
            alias: {
                '@': path.resolve(__dirname, '../src')
            },
            extensions: ['.js', '.ts', '.vue', '.tsx', '.json', '.less'], // 引入对应的文件时可以忽略其后缀
        },
        css: {
            // preprocessorOptions: {},
        },
        plugins: [
            babel({
                babelConfig: {
                    plugins: [
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        ['@babel/plugin-proposal-class-properties', { legacy: true }]
                    ]
                }
            }),
            createVuePlugin(),
            tailwindcss({
                config: path.resolve(__dirname, '../tailwind.config.js') // Tailwind CSS 配置文件路径
            }),
        ],
        build: {
            target: 'es2015',
            emptyOutDir: true,
            outDir: resolve(__dirname, `../dist`),
            assetsDir: 'assets',
            brotliSize: false,
            assetsInlineLimit: 0, // 不内联静态资源
            sourcemap: true,
            copyPublicDir: false, // 不复制public目录
            reportCompressedSize: false,
            lib: {
                entry: resolve(__dirname, '../src/vue-multi-split-player/index.js'), // 入口文件
                name: 'vue-multi-split-player', // 库名称
                // formats: ['es', 'umd', 'cjs', 'amd', 'system'], // 输出格式
                formats: ['es', 'umd'], // 输出格式
                fileName: (format) => {
                    // 为所有格式添加.min后缀
                    return `vue-multi-split-player.${format}.js`;
                } // 输出文件名
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue', 'element-ui', 'pubsub-js'],
                output: {
                    // 在UMD模式下为这些外部依赖提供全局变量
                    globals: {
                        vue: 'Vue',
                        'element-ui': 'ElementUI',
                        'pubsub-js': 'PubSub'
                    }
                }
            },
            minify: 'esbuild'
        }
    }
})

