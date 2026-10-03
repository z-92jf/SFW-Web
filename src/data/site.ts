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
export const navItems = [
	{ text: '首页', href: '/top' },
	{ text: '下载', href: '/download' },
	{ text: '更新日志', href: '/changelog' },
	{ text: '关于我们', href: '/about' },
];

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
];

/* ------------------------------------------------------------
   六、首页截图区
   ------------------------------------------------------------ */
// ★ 要改：首页展示的产品截图。
//   步骤：① 把图片放进 public/img/ 目录  ② 在这里写路径 /img/你的文件名.png
//
//   ⚠ 尺寸要求：宽度建议 1200px 左右。
//     目前这张 Screen1.png 只有 486px 宽，是按原始尺寸居中显示的，
//     在宽屏上会显得很小 —— 建议重新截一张大一些的，并多截几张不同界面。
//   想先不放截图，把数组保持为空 [] 即可，整个区块会自动隐藏。
interface ScreenshotItem {
	src: string;
	alt: string;
	caption?: string;
}

export const screenshots: ScreenshotItem[] = [
	{ src: '/img/Screen1.png', alt: '主界面', caption: '主界面' },
	// { src: '/img/screenshot-game.png', alt: '五子棋', caption: '小游戏大厅' },
	// { src: '/img/screenshot-manager.png', alt: '多功能管理器', caption: '多功能管理器' },
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
