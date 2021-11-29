# [F2E2021] 第三週 - 全台公車動態時刻查詢應用服務
這次比較想玩一下 CSS/RWD 做效果，所以花比較多時間，
功能部分：目前先以查詢公車為主 (可查詢縣市路線，但動態路線尚未完成，短期間會盡快補齊)，
其他功能會再思考 TDX API 看看是否需要調整。

## [Demo](https://guanwha.github.io/f2e2021-week3-bus/)

## Features
- 根據 TDX API 搜尋公車資訊並顯示相關詳細資料
- 搜尋縣市公車 (已完成線路搜尋，公車動態尚未完成)
- 搜尋附近公車 (規劃中...)
- 搜尋客運 (TDX API 尚未了解中，如資訊太亂，有可能不處理)

## Language
- HTML
- CSS/SCSS
- JavaScript

## Framework
- Vue.js, TailwindCSS

## Design Ref.
目前版面的設計參考下面的設計作品，
- 參考版面配置：[全台公車動態時刻查詢應用服務設計稿](https://2021.thef2e.com/users/6296432819610583177?week=3&type=1) by KT

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
