// ============================================================
//  新闻板块的公共逻辑
//
//  列表页、详情页、三个分组页都从这里取数据，
//  这样「怎么排序」「日期怎么写」只在一个地方定义。
// ============================================================

import { getCollection, type CollectionEntry } from 'astro:content';

export type NewsPost = CollectionEntry<'news'>;

/* ------------------------------------------------------------
   一、取文章
   ------------------------------------------------------------ */
// 取全部【非草稿】文章，并按这个顺序排好：
//   ① 置顶的排在最前面（pinned: true）
//   ② 同一档里按发布时间倒序（新的在前）
//
// 列表页、分组页、搜索索引全都用这个函数，
// 所以只要在 md 里写 pinned: true，到处都会跟着置顶。
export async function getNewsPosts(): Promise<NewsPost[]> {
	const posts = await getCollection('news', ({ data }) => !data.draft);

	return posts.sort((a, b) => {
		if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
		return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
	});
}

/* ------------------------------------------------------------
   二、日期格式化
   ------------------------------------------------------------ */
// 统一用固定格式，不用 toLocaleDateString ——
// 那玩意儿的输出跟运行环境的语言设置有关，本地和服务器可能不一样。
function pad(n: number): string {
	return String(n).padStart(2, '0');
}

// 2026-10-04
export function formatDate(date: Date): string {
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// 2026-10 —— 「按时间」分组的键，也是 /news/date/2026-10/ 的网址后缀
export function monthKey(date: Date): string {
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
}

// 2026 年 10 月 —— 给人看的
export function monthLabel(key: string): string {
	const [y, m] = key.split('-');
	return `${y} 年 ${Number(m)} 月`;
}

/* ------------------------------------------------------------
   三、把 Markdown 正文转成纯文本
   ------------------------------------------------------------ */
// 搜索索引里存的是正文，但直接存 Markdown 源码会有很多符号噪音
// （##、**、链接地址……），所以先洗一遍，只留能读的文字。
export function plainText(markdown: string): string {
	return markdown
		.replace(/```[\s\S]*?```/g, ' ') // 整段代码块
		.replace(/`[^`\n]*`/g, ' ') // 行内代码
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // 图片（整个丢掉）
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // 链接：只留可见文字
		.replace(/^\s{0,3}#{1,6}\s*/gm, ' ') // 标题的 #
		.replace(/^\s*[-*+]\s+/gm, ' ') // 列表符号
		.replace(/^\s*>\s?/gm, ' ') // 引用符号
		.replace(/\|/g, ' ') // 表格竖线
		.replace(/[*_~]/g, '') // 强调符号
		.replace(/\s+/g, ' ') // 连续空白压成一个空格
		.trim();
}

/* ------------------------------------------------------------
   四、给搜索用的小工具
   ------------------------------------------------------------ */
// 把字符串压成便于比较的形式：转小写 + 去掉多余空格。
// 这样搜「v1.1.1」和「V1.1.1」都能命中。
export function normalize(text: string): string {
	return text.toLowerCase().replace(/\s+/g, ' ').trim();
}
