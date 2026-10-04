// ============================================================
//  ★★★ 全站信息总控文件 ★★★
//
//  这是整个网站最重要、也是你以后最常改的文件。
//  产品名、版本号、下载地址、联系方式、功能列表、导航菜单……
//  全部集中在这里，改一处，全站所有页面同步生效。
//
//  你几乎不需要去动 .astro 文件。先把这里改完，网站就是你的了。
// ============================================================

/* ------------------------------------------------------------
   一、产品基本信息
   ------------------------------------------------------------ */
export const site = {
	// ★ 要改：浏览器标签页上显示的标题
	title: 'SERVICES FOR Windows',

	// ★ 要改：一句话简介。用于首页大标题下方、以及分享到微信/QQ 时的描述
	tagline: '一个为 Windows 服务的快速工具箱',

	// ★ 要改：SEO 描述，会出现在搜索引擎的搜索结果摘要里。建议 80 字以内
	description: 'SERVICES FOR Windows 是一个为 Windows 系统服务的综合工具，集成账户管理、小游戏大厅、多功能管理器与进制转换等实用功能。',

	// ★ 要改：搜索引擎关键词，逗号分隔
	keywords: 'SERVICES FOR Windows, Windows, 工具箱, 官网, 服务, 快捷方式, 进制转换',

	// ★ 要改：当前最新版本号。下载页、更新日志页都会读这个值。
	//   发新版本时记得同步改这里，同时去 src/content/changelog/ 加一篇日志
	version: '1.1.1',

	// 版本状态：'正式版' / '测试版' / '预览版'。显示在版本号旁边
	versionStage: '正式版',

	// 发布日期，格式 YYYY-MM-DD。
	// 这里用的是 GitHub 上 release 的实际发布日期，保持一致
	releaseDate: '2026-10-03',

	// ★ 要改：网站图标路径。文件放在 public/ 目录下，
	//   路径写的时候不带 public，比如 public/favicon.svg 就写 /favicon.svg
	favicon: '/favicon.ico',

	// ★ 可选：分享到微信 / QQ 时显示的缩略图，建议 1200x630 的图片。
	//   图片放进 public/img/ 后，这里写 '/img/share-cover.png'。
	//   留空字符串则不做设置（分享时不带缩略图，但不影响其它功能）。
	ogImage: '',
};

/* ------------------------------------------------------------
   二、下载与链接
   ------------------------------------------------------------ */
export const links = {
	// ★ 要改：GitHub 仓库地址
	github: 'https://github.com/z-92jf/SERVICES-FOR-Windows',

	// ★ 要改：安装包所在的仓库（用来拼 Releases 地址）
	repo: 'https://github.com/z-92jf/SERVICES-FOR-Windows',

	// ★ 要改：直接下载链接（下载页「立即下载」、首页「下载最新版」都读这里）。
	//
	//   现在指向的是「最新版 Setup 安装包」的直链 —— 点了直接开始下载，
	//   不再跳到 GitHub 的 Releases 页面（那个页面在部分网络下加载很慢）。
	//
	//   releases/latest/download/ 是 GitHub 的固定写法，latest 会自动指向
	//   最新的正式版，所以将来发新版时这一行不用改。
	//   ⚠ 但文件名是写死的：每次发版如果 exe 改了名字（比如带上新版本号），
	//     这里必须跟着改，否则点击就是 404。
	download:
		'https://github.com/z-92jf/SERVICES-FOR-Windows/releases/latest/download/Setup-SERVICES-FOR-Windows-V1.1.1.exe',

	// Releases 列表页，让用户能看历史版本
	releases: 'https://github.com/z-92jf/SERVICES-FOR-Windows/releases',

	// ★ 要改：旧版官网（保留着当备份，不需要就删掉这一行）
	legacySite: 'https://z-92jf.github.io/',
};

/* ------------------------------------------------------------
   三、联系方式
   ------------------------------------------------------------ */
export const contact = {
	// ★ 要改：以下邮箱换成你实际在用的。不需要的项直接删掉，
	//   页脚会自动跳过空值，不会留下一个空的「xxx：」
	join: 'z_92jf@hotmail.com', // 想加入团队，联系谁
	report: 'Zhq_jf@outlook.com', // 想投诉 / 反馈问题，联系谁
	comment: 'Zhq_jf@outlook.com', // 想发布评论，联系谁
};

/* ------------------------------------------------------------
   四、导航菜单
   ------------------------------------------------------------ */
// ★ 要改：顶部导航栏的菜单项。增删这里就能增删菜单。
//   href 写站内路径时以 / 开头，比如 /top、/download。
//   注意：欢迎页（路径 /）故意不在这个列表里——它是入口页，
//   不应该出现在官网内部导航中。
//   注意两点：
//   ① 欢迎页（/）不放进来，它是入口页。
//   ② /license 也故意不放进来 —— 许可证属于页脚和下载页的附注，
//      放在主导航里会让菜单显得冗杂。
export const navItems = [
	{ text: '首页', href: '/top' },
	{ text: '新闻', href: '/news' },
	{ text: '下载', href: '/download' },
	{ text: '更新日志', href: '/changelog' },
	{ text: '帮助', href: '/help' },
	{ text: '关于我们', href: '/about' },
];

// 页脚「导航」那一列用的清单。
// 这里覆盖站内**所有**页面，保证每个板块都能从页脚走到。
// 刚好 8 项，页脚那列排成两列后每列 4 个，很整齐。
export const footerNav = [
	{ text: '首页', href: '/top' },
	{ text: '新闻', href: '/news' },
	{ text: '下载', href: '/download' },
	{ text: '历史版本', href: '/history' },
	{ text: '更新日志', href: '/changelog' },
	{ text: '帮助', href: '/help' },
	{ text: '关于我们', href: '/about' },
	{ text: '许可证', href: '/license' },
];

/* ------------------------------------------------------------
   四·五、新闻板块（/news）
   ------------------------------------------------------------ */
// 「发布主题」的可选值 —— 这是新闻板块三个分类维度之一。
//
//   文章 frontmatter 里的 category 只能填这里的某一个 name，
//   填错的话 `npm run build` 会直接报错，并告诉你哪一篇写错了。
//   好处是不会出现「分类打错字 → 这篇文章从分组里消失」这种问题。
//
//   name 是页面上显示的中文名；slug 是网址里那一段。slug 一律用小写英文，
//   这样 /news/category/devlog/ 这种链接在任何环境下都不会出问题
//   （中文直接进网址会被编码成一长串 %E5%BC%80…，不好看也不好分享）。
//
// ★ 要改：想增删主题，改这个数组就行，顺序 = 列表页「主题」筛选器的显示顺序。
//
//   ⚠ 加了新主题之后，已经被旧文章用过的主题不要删 —— 否则那些文章会构建失败。
//     想停用某个主题又不想改旧文章，就把它留着，只是不再用即可。
export const newsCategories = [
	{ slug: 'news', name: '公告' },
	{ slug: 'new-version', name: '版本发布' },
	{ slug: 'devlog', name: '开发日志' },
	{ slug: 'activity', name: '活动' },
	{ slug: 'help', name: '教程' },
] as const;

export type NewsCategory = (typeof newsCategories)[number]['name'];

// 主题「中文名 ↔ 网址 slug」互转。
// 页面里统一用这两个函数，省得到处写 find()。
export function categorySlug(name: string): string {
	return newsCategories.find((c) => c.name === name)?.slug ?? name;
}

export function categoryName(slug: string): string {
	return newsCategories.find((c) => c.slug === slug)?.name ?? slug;
}

/* ------------------------------------------------------------
   五、首页功能卡片
   ------------------------------------------------------------ */
// ★ 要改：首页「核心功能」区的卡片。删掉一项首页就少一张卡。
//
//   icon   图标的文字标识，目前用不到外部图标库，
//          在组件里用一小段 SVG 表示。想换成自己的图标，
//          改 src/components/FeatureCard.astro 里的 svg 即可。
//   title  功能名
//   desc   一句话说明，建议 20~40 字
//   href   点击后跳去哪，没有就写 null（卡片会变成不可点击）
interface FeatureItem {
	icon: string;
	title: string;
	desc: string;
	href: string | null;
}

export const features: FeatureItem[] = [
	{
		icon: 'account',
		title: '账户系统',
		desc: '支持注册、登录与账户管理，数据保存在程序所在目录，换个方式启动也不会丢。',
		href: null,
	},
	{
		icon: 'game',
		title: '小游戏大厅',
		desc: '内置五子棋等小游戏，附带外部游戏启动器，工作之余放松一下。',
		href: null,
	},
	{
		icon: 'panel',
		title: 'Windows 多功能管理器',
		desc: '收录一百项常用系统功能的快捷入口，找设置不用再翻半天开始菜单。',
		href: null,
	},
	{
		icon: 'convert',
		title: '进制转换工具',
		desc: '十进制、二进制、八进制、十六进制之间任意互转，输入非法字符会给出明确提示。',
		href: null,
	},
	{
		icon: 'settings',
		title: '设置和初始化',
		desc: '可自定义程序启动方式、窗口大小等，支持一键初始化恢复默认设置。',
		href: null,
	},
];

/* ------------------------------------------------------------
   六、首页「界面预览」轮播
   ------------------------------------------------------------ */
// ★ 要改：数组里每一项就是轮播里的一屏。
//
//   图片放 public/img/（静态图）或 public/gif/（动图），
//   路径不写 public，比如 public/img/a.png 就写 '/img/a.png'。
//
//   title / desc 显示在图片【上方】，切换图片时会跟着一起变，
//   所以每条都要单独写清楚。顺序就是轮播的显示顺序。
//
//   数组留空 [] 时，整个区块会自动隐藏。
interface ScreenshotItem {
	/** 图片路径（相对 public 目录） */
	src: string;
	/** 替代文字：给读屏软件用，图片加载失败时也会显示 */
	alt: string;
	/** 图片上方的大标题 */
	title: string;
	/** 标题下面的一句话说明 */
	desc: string;
}

export const screenshots: ScreenshotItem[] = [
	{
		src: '/img/Screen1.png',
		alt: '程序主菜单',
		title: '主菜单',
		desc: '登录、注册、访客进入，或者用「直接进入」只开核心功能 —— 所有入口都收在这一屏。',
	},
	{
		src: '/img/Screen3.png',
		alt: 'Windows 多功能管理器',
		title: 'Windows 多功能管理器',
		desc: '一百项常用系统功能按类别排好，输入编号就能直达，不必再翻半天开始菜单。',
	},
	{
		src: '/img/Screen2.png',
		alt: '进制转换工具',
		title: '进制转换工具',
		desc: '2 到 36 进制之间任意互转，三个转换方向各有独立入口，输入非法字符会给出提示。',
	},
	{
		src: '/img/Screen4.png',
		alt: '游戏大厅',
		title: '游戏大厅',
		desc: '贪吃蛇、扫雷、五子棋、飞机大战…… 内置多款小游戏，工作之余随手玩两把。',
	},
	// ⚠ 这张 GIF 暂时停用。
	//   原因是它只有 426×240，放大到页面宽度后会明显发糊，而且体积有 2MB。
	//   以后换成清晰一些的动图（建议宽度 1200px、体积 500KB 以内）再把注释放开。
	// {
	// 	src: '/gif/ctrl.gif',
	// 	alt: '键盘操作演示',
	// 	title: '全程键盘操作',
	// 	desc: '键位提示直接写在界面上，照着按就行；从 1.1.0 起，选择菜单不再需要按回车键。',
	// },
];

/* ------------------------------------------------------------
   七、页脚版权信息
   ------------------------------------------------------------ */
export const footer = {
	// ★ 要改：版权归属显示的文字
	owner: 'z-92jf 加法工作室',
	// ★ 要改：起始年份，页脚会显示成 2025-2026 这样
	since: 2025,
	// ★ 要改：备案号 / 额外声明，不需要就留空字符串
	extra: '',
};

/* ------------------------------------------------------------
   八、历史版本下载
   ------------------------------------------------------------ */
//  这份列表用来生成「下载」页底部的历史版本表格。
//  所有下载链接仍然指向 GitHub，只是把「有哪些版本、每个版本有哪些文件」
//  搬到了官网上，省得用户去 GitHub 的 Releases 页面等着加载。
//
//  ⚠ 最关键的一点：file 必须和 GitHub Releases 上挂的文件名一字不差。
//    大小写、横杠、点号都要对上，错一个字符点了就是 404。
//    每次发新版，去 GitHub 的 release 页面复制文件名最保险。
//
//  下载直链的拼法是：
//    https://github.com/z-92jf/SERVICES-FOR-Windows/releases/download/<标签>/<文件名>
//  tag 就是 GitHub 上那个 release 的标签名（你的仓库用的是中文标签，
//  代码里会自动做 URL 编码，你不用手动处理）。

export interface ReleaseAsset {
	/** 按钮上的文字，比如「安装版」「免安装包」 */
	label: string;
	/** GitHub Releases 上的文件名。必须完全一致 */
	file: string;
	/** 显示给用户看的大小，写错不影响下载，但会影响观感 */
	size: string;
}

export interface ReleaseItem {
	/** 版本号 */
	version: string;
	/** GitHub 上 release 的标签名（中文也没关系） */
	tag: string;
	/** 发布日期 */
	date: string;
	/** 正式版 / 测试版 / 预发布 */
	stage: string;
	/** 一句话说明这个版本更新了什么 */
	note: string;
	/** 这个版本提供的文件。空的表示还没有上传 */
	assets: ReleaseAsset[];
}

// ★ 要改：Releases 的基础地址。换了仓库要改这里
const RELEASE_BASE =
	'https://github.com/z-92jf/SERVICES-FOR-Windows/releases/download';

/**
 * 根据标签和文件名拼出下载直链。
 * 中文标签会自动做 URL 编码，你只管写中文就行。
 */
export function releaseDownloadUrl(tag: string, file: string): string {
	return `${RELEASE_BASE}/${encodeURIComponent(tag)}/${encodeURIComponent(file)}`;
}

// ★ 要改：按「从新到旧」排列，最新的放最前面。
//
// ⚠ 文件名有个坑：你的 exe 命名规则换过 ——
//   1.1.0 是 Setup.SERVICES.FOR.Windows.V1.1.0-Win64.exe（点分隔、带 Win64）
//   1.1.1 是 Setup-SERVICES-FOR-Windows-V1.1.1.exe（横杠分隔、没有 Win64）
//   必须照抄 GitHub 上的实际文件名，错一个字符点击就是 404。
//   建议以后固定一套命名规则，省得每次都要回去核对。
export const releases: ReleaseItem[] = [
	{
		version: '1.1.1',
		tag: '1.1.1',
		date: '2026-10-03',
		stage: '正式版',
		note: '稳定性与可用性修复',
		assets: [
			{
				label: '安装版',
				file: 'Setup-SERVICES-FOR-Windows-V1.1.1.exe',
				size: '5.7 MB',
			},
			{ label: '免安装包', file: '1.1.1.zip', size: '7.3 MB' },
		],
	},
	{
		version: '1.1.0',
		tag: '正式版',
		date: '2026-06-20',
		stage: '正式版',
		note: '免回车操作、密码输入加密、新增账号管理',
		assets: [
			{
				label: '安装版',
				file: 'Setup.SERVICES.FOR.Windows.V1.1.0-Win64.exe',
				size: '7.4 MB',
			},
			{ label: '免安装包', file: '1.1.0-Win64.zip', size: '8.7 MB' },
		],
	},
	{
		version: '1.0.1',
		tag: 'Beta',
		date: '2026-05-14',
		stage: '测试版',
		note: '账户操作体验更新、新增访客登录',
		assets: [
			{
				label: '安装版',
				file: 'Setup.SERVICES.FOR.Windows.V1.0.1.Beta.exe',
				size: '5.7 MB',
			},
			{ label: '免安装包', file: '1.0.1.Beta.zip', size: '6.7 MB' },
		],
	},
	{
		version: '1.0.0',
		tag: '预发布',
		date: '2026-04-18',
		stage: '预发布',
		note: '首个公开版本',
		assets: [
			{
				label: '安装版',
				file: 'Setup.SERVICES.FOR.Windows.V1.0.0.exe',
				size: '5.5 MB',
			},
			{ label: '免安装包', file: 'v1.0.0.zip', size: '7.2 MB' },
		],
	},
];
