interface ProxyConfig {
  [key: string]: {
    target: string;
    changeOrigin: boolean;
    pathRewrite: {
      [key: string]: string;
    };
  };
}

export default {
  '/api/': {
    target: 'http://10.0.192.86:8449/',   //接口域名
    changeOrigin: true,  // 是否跨域
    pathRewrite: {
      '^/api/': '/api/'
    }
  }
} as ProxyConfig;

