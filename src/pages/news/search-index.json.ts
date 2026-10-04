// ============================================================
//  新闻搜索索引（网址 /news/search-index.json）
//
//  这是一个「静态端点」——构建时生成，部署后就是一个普通的 JSON 文件。
//  列表页加载完会在后台把它 fetch 下来，搜索时直接在浏览器里过滤，
//  不需要任何服务器，也没有第三方搜索库。
//
//  ★ 不用改这个文件。加文章只改 src/content/news/ 里的 md。
//
//  ⚠ 索引里包含【正文全文】，所以文章特别多、特别长的时候
//    这个文件会变大（大概每万字 20KB 左右）。真到了几百篇的量，
//    再来找我改成按需加载或换 Pagefind 也不迟。
// ============================================================

import type { APIRoute } from 'astro';
import { getNewsPosts, plainText, formatDate, monthKey, normalize } from '../../lib/news';
import { categorySlug } from '../../data/site';

export const GET: APIRoute = async () => {
	const posts = await getNewsPosts();

	const index = posts.map((post) => {
		const summary = post.data.summary ?? '';
		const body = plainText(post.body ?? '');

		// 两组关键词，对应列表页搜索框的两种范围：
		//   title 模式 → 只比标题、作者、分类、标签
		//   all   模式 → 再加上摘要和正文全文
		const meta = [
			post.data.title,
			post.data.author,
			post.data.category,
			post.data.tags.join(' '),
		].join(' ');

		return {
			id: post.id,
			url: `/news/${post.id}`,
			title: post.data.title,
			author: post.data.author,
			category: post.data.category,
			categorySlug: categorySlug(post.data.category),
			tags: post.data.tags,
			date: formatDate(post.data.pubDate),
			month: monthKey(post.data.pubDate),
			pinned: post.data.pinned,
			summary,
			// 结果里给一小段正文，方便看出为什么命中
			excerpt: body.slice(0, 120),
			// 预先压成小写，客户端比对时不用每条都转一次
			haystackMeta: normalize(meta),
			haystackAll: normalize(meta + ' ' + summary + ' ' + body),
		};
	});

	return new Response(JSON.stringify(index), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
