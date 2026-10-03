// ============================================================
//  内容集合定义（Content Collections）
//
//  作用：把「写文章」和「写代码」分开。
//  你以后写更新日志，只需要在 src/content/changelog/ 目录里
//  新建一个 .md 文件，用 Markdown 写内容，
//  网站会自动把它变成一篇排版好的页面 + 一条列表项。
//  完全不用碰 HTML。
//
//  ★ 注意文件名：是 src/content.config.ts（在 src 目录下），
//    不是 src/content/config.ts。新版 Astro 改成这个位置了，
//    放错地方会直接报「找不到集合」的错。
// ============================================================

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const changelog = defineCollection({
	// loader 告诉 Astro 去哪里找文件。
	// base 可以是相对项目根目录的路径，pattern 是通配符。
	// 这里会读 src/content/changelog/ 下所有 .md 文件。
	loader: glob({ base: './src/content/changelog', pattern: '**/*.md' }),

	// schema 是「格式检查」。少写字段、写错日期格式，
	// 构建时会直接报错并告诉你哪个文件有问题，
	// 不会出现「页面上莫名其妙少了一块」的情况。
	//
	// ★ 要改：如果你想给日志加字段（比如作者、标签），
	//   在这里加一行，然后记得每个 md 文件都要补上。
	schema: z.object({
		// 版本号，比如 "1.1.1"
		version: z.string(),
		// 日志标题，显示在列表和详情页顶部
		title: z.string(),
		// 发布日期。写成 2026-10-03 这种形式，Astro 会自动转成日期对象
		pubDate: z.coerce.date(),
		// 一句话摘要，显示在列表页。可以不写
		summary: z.string().optional(),
		// 草稿开关：写 true 的日志不会出现在网站上。
		// 想先把写了一半的日志提交上去又不想让人看见，就打开它
		draft: z.boolean().default(false),
	}),
});

// 把定义好的集合注册出去。
// 以后如果再加「使用文档」之类的集合，在这里一起导出即可，比如：
// export const collections = { changelog, docs };
export const collections = { changelog };
