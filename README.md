# 煮趣 Cooking Skill Exchange 官网

> 健康品牌的全球化增长伙伴

## 项目简介

煮趣（Cooking Skill Exchange / CSE）官网静态站点，采用极简优雅设计风格，服务于品牌战略咨询、AI营销增长、出海与跨境分销三大核心业务。

**品牌色：**
- 奶油白背景：`#F5F2EA`
- 深色文字：`#2C2C2C`
- 点缀黄：`#D4A853`

## 文件结构

```
cooking-skill-exchange/
├── index.html          ← 首页
├── css/
│   └── main.css        ← 全局样式
├── js/
│   └── main.js         ← 全局脚本
├── pages/
│   ├── services.html   ← 服务详情
│   ├── cases.html      ← 案例展示
│   ├── insights.html   ← 洞见文章
│   ├── resources.html  ← 资源中心
│   ├── global.html     ← 全球布局
│   └── contact.html    ← 联系我们
└── assets/             ← 图片资源
```

## 如何修改内容

### 修改页面文字 / 结构
直接用编辑器打开对应 `.html` 文件修改，例如：
- **首页** → 编辑 `index.html`
- **服务页** → 编辑 `pages/services.html`

### 修改样式 / 颜色 / 字体
编辑 `css/main.css`，主要 CSS 变量在文件顶部 `:root` 中：

```css
:root {
  --cream: #F5F2EA;          /* 奶油白背景 */
  --deep: #2C2C2C;           /* 深色文字 */
  --accent-yellow: #D4A853;  /* 按钮点缀色 */
  --font-heading: 'Noto Serif SC', Georgia, serif;
  --font-body: 'Georgia', 'Noto Serif SC', serif;
}
```

### 修改交互逻辑
编辑 `js/main.js`

## 本地预览网站

### 方法一：直接打开（最快）
双击 `index.html`，用浏览器打开即可预览。

### 方法二：本地服务器（推荐）
在终端运行：

```bash
cd /path/to/cooking-skill-exchange
python3 -m http.server 8080
```

然后浏览器访问：**http://localhost:8080**

### 方法三：VS Code Live Server
用 VS Code 打开项目，安装 **Live Server** 插件，右键 `index.html` → `Open with Live Server`。

## 提交修改到 GitHub

```bash
cd /path/to/cooking-skill-exchange
git add .
git commit -m "描述你的修改内容"
git push origin main
```

## 协作者上手

```bash
git clone git@github.com:zying1987-sketch/cooking-skill-exchange.git
cd cooking-skill-exchange
# 修改文件后
git add .
git commit -m "描述修改内容"
git push origin main
```

## 在线访问

GitHub 仓库：https://github.com/zying1987-sketch/cooking-skill-exchange

---

© 2025 煮趣 Cooking Skill Exchange · 上海
