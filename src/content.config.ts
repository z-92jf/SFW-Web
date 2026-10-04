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

// 新闻板块的「发布主题」可选值定义在 site.ts 里，
// 在这里引用过来做校验 —— 改主题只需要改 site.ts 那一处。
import { newsCategories } from './data/site';

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

// ------------------------------------------------------------
// 帮助文档（/help 页面用）
// ------------------------------------------------------------
//  内容来自 src/content/help/manual.md
//  （由 开发者版本\1.1.1\使用说明.md 复制而来，链接已适配新官网）
//
//  ★ 要改：以后更新使用说明，把新版 md 覆盖到 src/content/help/manual.md 就行，
//    /help 页面和侧边目录会自动跟着变，不用改任何 .astro 文件。
//    注意复制过来后要保证文件开头有下面这几个字段的 frontmatter。
const help = defineCollection({
	loader: glob({ base: './src/content/help', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		// 排序用。现在只有一个文件，留着方便以后拆成多篇
		order: z.number().default(0),
	}),
});

// ------------------------------------------------------------
// 新闻板块（/news 页面用）
// ------------------------------------------------------------
//  一篇文章 = src/content/news/ 下的一个 .md 文件。
//  文件名就是网址的后半段，比如 2026-10-hello.md → /news/2026-10-hello
//
//  ⚠ 文件名不要起成 category / author / date —— 这三个名字被分组页面占用了。
//
//  下面这些字段就是新闻板块的三个分类维度：
//    pubDate  发布时间  → 列表按它排序，也能按「2026-10」这种年月归堆
//    author   发布者    → 就是一个名字字符串，列表能按它分组
//    category 发布主题  → 只能填 site.ts 里 newsCategories 预设的那几个
// ------------------------------------------------------------
const news = defineCollection({
	loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
	schema: z.object({
		// 文章标题
		title: z.string(),

		// 发布时间。写成 2026-10-04 这种形式，Astro 会自动转成日期对象
		pubDate: z.coerce.date(),

		// 发布者。直接写名字即可（中英文都行），列表页能按它分组，
		// 也会生成 /news/author/<名字> 这个分组页面
		author: z.string().min(1),

		// 发布主题。⚠ 只能填预设值，填错会构建报错并指出是哪一篇。
		//    预设值在 src/data/site.ts 的 newsCategories 里改。
		category: z.string().refine(
			(value) => newsCategories.some((c) => c.name === value),
			{ message: `分类只能是：${newsCategories.map((c) => c.name).join(' / ')}` }
		),

		// 标签。可选，一篇可以贴多个，会一起进搜索索引。
		// 和 category 的区别：category 定大类（一篇只有一个），tags 是自由关键词
		tags: z.array(z.string()).default([]),

		// 列表页显示的一句话摘要。不写的话列表里就没有那句
		summary: z.string().optional(),

		// 封面图。图片放进 public/img/news/ 后，这里写 '/img/news/xxx.png'
		cover: z.string().optional(),

		// 置顶。true 的话排在列表最前面（置顶的文章之间仍按时间倒序）
		pinned: z.boolean().default(false),

		// 草稿开关：写 true 的文章不会出现在网站上（列表、详情、分组、搜索都没有）
		draft: z.boolean().default(false),
	}),
});

// 把定义好的集合注册出去。
// 以后如果再加别的集合，在这里一起导出即可。
export const collections = { changelog, help, news };
