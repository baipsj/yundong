import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建简单的SVG图标
const createSVGIcon = (size, color = '#667eea') => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <text x="50%" y="60%" text-anchor="middle" fill="white" font-size="${size * 0.4}" font-weight="bold">💪</text>
</svg>`;

// 确保public目录存在
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 生成各种尺寸的图标
const iconSizes = [
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'maskable-icon-512x512.png', size: 512 },
  { name: 'favicon.ico', size: 32 }
];

console.log('生成PWA图标...');

// 创建基本的favicon.ico内容
const faviconContent = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#667eea"/>
  <text x="16" y="22" text-anchor="middle" fill="white" font-size="18">💪</text>
</svg>`;

// 写入文件
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconContent);

// 生成其他图标的占位符SVG
iconSizes.forEach(icon => {
  const svgContent = createSVGIcon(icon.size);
  const filename = icon.name.replace('.png', '.svg').replace('.ico', '.svg');
  fs.writeFileSync(path.join(publicDir, filename), svgContent);
});

// 创建启动画面的占位符
const splashSizes = [
  { name: 'apple-splash-2048-2732.png', width: 2048, height: 2732 },
  { name: 'apple-splash-1668-2388.png', width: 1668, height: 2388 },
  { name: 'apple-splash-1536-2048.png', width: 1536, height: 2048 },
  { name: 'apple-splash-1284-2778.png', width: 1284, height: 2778 },
  { name: 'apple-splash-1170-2532.png', width: 1170, height: 2532 },
  { name: 'apple-splash-1125-2436.png', width: 1125, height: 2436 },
  { name: 'apple-splash-828-1792.png', width: 828, height: 1792 },
  { name: 'apple-splash-750-1334.png', width: 750, height: 1334 }
];

splashSizes.forEach(splash => {
  const svgContent = `
<svg width="${splash.width}" height="${splash.height}" viewBox="0 0 ${splash.width} ${splash.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${splash.width}" height="${splash.height}" fill="url(#bgGrad)"/>
  <text x="50%" y="45%" text-anchor="middle" fill="white" font-size="${Math.min(splash.width, splash.height) * 0.15}" font-weight="bold">💪</text>
  <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="${Math.min(splash.width, splash.height) * 0.04}" opacity="0.9">运动APP</text>
  <text x="50%" y="60%" text-anchor="middle" fill="white" font-size="${Math.min(splash.width, splash.height) * 0.025}" opacity="0.7">让运动成为习惯</text>
</svg>`;
  
  const filename = splash.name.replace('.png', '.svg');
  fs.writeFileSync(path.join(publicDir, filename), svgContent);
});

console.log('✅ PWA图标和启动画面生成完成！');
console.log('📁 生成的文件位于 public/ 目录');
console.log('\n📱 iOS打包说明：');
console.log('1. 运行 npm run build:ios 构建生产版本');
console.log('2. 使用以下工具将PWA打包为iOS应用：');
console.log('   - PWABuilder (https://www.pwabuilder.com/)');
console.log('   - Capacitor (https://capacitorjs.com/)');
console.log('   - Cordova (https://cordova.apache.org/)');
console.log('3. 或直接在Safari中添加到主屏幕使用');