## 几个npm包
```js
npm install animejs --save
import anime from 'animejs/lib/anime.es.js';
```

- 轮播图
```js
https://github.com/glidejs/glide
```

- animate.css
```
yarn add animate.css
```

- 引入less

```js
yarn add @craco/craco craco-less
// craco.config.js
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}

```


## 轮播图
- 设置指示器样式

```css
.swiper-pagination-bullet {
  display: inline-block;
  background-color: #fff;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  opacity: .7;
}

// 当前选中的点点的设置
.swiper-pagination-bullet-active {
  background-color: #f01;
  opacity: 1;
}
```

## 色号
https://www.sioe.cn/yingyong/yanse-rgb-16/