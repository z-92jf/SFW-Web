// ============================================================
//  Astro 主配置文件
//  这个文件决定「站点部署到哪里」「构建出什么形态」。
//  改动频率很低，但 site 那一行必须改对，否则 SEO 和分享
//  出来的链接会是错的。
// ============================================================

import { defineConfig } from 'astro/config';

export default defineConfig({
	// ★★★ 要改：你的站点根地址 ★★★
	// 因为仓库名就叫 z-92jf.github.io（GitHub 的「用户站」），
	// 站点直接架在域名根目录下，所以这里写域名本身、不要带仓库名。
	// 如果以后换了自定义域名（比如 https://servicesforwindows.p8.ink），
	// 把这一行改成那个域名即可。
	site: 'https://sfw.us.ci',

	// ★ 注意：这里【故意没有】配置 base。
	// base 只在「项目站」才需要——也就是仓库名叫 my-site、访问地址是
	// https://用户名.github.io/my-site/ 的情况，那时要写 base: '/my-site'，
	// 而且全站链接都要手动加上这个前缀，非常容易漏。
	// 你用的是用户站（仓库名 = 用户名.github.io），根目录就是 /，所以不需要。
	//
	// 万一哪天你把代码挪到一个叫 SFW-Web 的普通仓库里，就需要补上：
	// base: '/SFW-Web',
	// 并且把全站以 / 开头的链接改成 /SFW-Web/xxx。

	// 构建输出目录，默认就是 dist，这里显式写出来方便你找。
	outDir: './dist',

	// 静态站点模式：构建出来是纯 HTML/CSS/JS，不需要任何后端或服务器。
	// 这是 GitHub Pages 唯一支持的形态，不要改成 'server'。
	output: 'static',

	// 开发服务器设置（只有本地 npm run dev 时生效）
	server: {
		// ★ 要改：本地预览端口。默认 4321，改成 3000 之类的都行。
		port: 4321,
		// 是否自动打开浏览器
		open: false,
	},

	// 构建时的压缩选项。
	// compressHTML 会把产物 HTML 里的多余空白去掉，减小体积。
	compressHTML: true,
});
