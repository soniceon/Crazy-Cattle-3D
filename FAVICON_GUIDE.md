# Favicon.ico 生成指南

## 问题说明

HTML文件中引用了 `favicon.ico` 文件，但该文件不存在。这会导致浏览器无法显示网站图标。

## 解决方案

### 方法1: 在线转换工具
1. 访问在线SVG到ICO转换工具：
   - https://convertio.co/svg-ico/
   - https://cloudconvert.com/svg-to-ico
   - https://www.icoconverter.com/

2. 上传 `favicon.svg` 文件
3. 选择输出格式为ICO
4. 设置尺寸为16x16, 32x32, 48x48像素
5. 下载生成的favicon.ico文件
6. 将文件放在项目根目录

### 方法2: 图像编辑软件
1. 使用Photoshop、GIMP或Inkscape
2. 打开favicon.svg文件
3. 导出为ICO格式
4. 确保包含多个尺寸（16x16, 32x32, 48x48）

### 方法3: 命令行工具（开发者）
```bash
# 使用ImageMagick
convert favicon.svg -resize 16x16 favicon-16.ico
convert favicon.svg -resize 32x32 favicon-32.ico
convert favicon.svg -resize 48x48 favicon-48.ico

# 合并多个尺寸
convert favicon-16.ico favicon-32.ico favicon-48.ico favicon.ico
```

## 推荐尺寸

- **16x16**: 浏览器标签页和书签
- **32x32**: Windows任务栏
- **48x48**: Windows桌面图标

## 注意事项

1. ICO文件应该包含多个尺寸的图标
2. 确保图标在不同背景下都清晰可见
3. 测试在不同浏览器中的显示效果
4. 文件大小建议控制在100KB以内

## 验证

生成favicon.ico后，刷新网页检查：
1. 浏览器标签页是否显示图标
2. 书签是否显示图标
3. 控制台是否有404错误 