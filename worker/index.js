/**
 * ============================================================
 *  SERVICES FOR Windows —— 下载计数 Worker
 *
 *  部署在 https://times.sfw.us.ci
 *
 *  路由：
 *    POST /api/hit    记账。body: {"v":"1.1.3"}  →  204
 *    GET  /api/stats  统计 JSON（给别的地方用）
 *    GET  /           统计页面
 *
 *  依赖：D1 数据库，绑定名必须是 DB
 *  建表：见同目录 schema.sql
 *
 *  设计说明：
 *   1. 站点是纯静态的，下载按钮直连 GitHub，服务器端看不到点击，
 *      所以只能由前端在点击瞬间上报版本号。
 *   2. 不存「每次下载一行」，按 (版本, 日期) 累计 —— 行数可控，
 *      同时又能出趋势。写入量仍然是「一次点击一次写」。
 *   3. 日期按北京时间算。用 UTC 的话，每天 0~8 点算出来的「今日」会错。
 * ============================================================
 */

const TZ_OFFSET_MS = 8 * 3600 * 1000; // 北京时间 = UTC+8
const TREND_DAYS = 30;

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const cors = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: cors });
		}

		// D1 没绑定时，env.DB 是 undefined，后面每个查询都会抛
		// "Cannot read properties of undefined (reading 'prepare')" ——
		// 那句话完全看不出问题在哪。这里先拦一次，直接说清楚该去哪绑。
		if (!env || !env.DB) {
			return new Response(
				[
					'D1 数据库没有绑定。',
					'',
					'请按这个顺序检查：',
					'1) Worker 详情页 → 设置 → 绑定 → 添加 → 选「D1 数据库」',
					'2) 变量名称必须正好是  DB  （大写，两个字母）',
					'3) D1 数据库选你在第 1 步建的那个',
					'4) 保存之后，回到「编辑代码」页，点右上角「部署」',
					'',
					'⚠ 关键：绑定保存后必须重新部署一次才会生效。',
					'   只保存不部署，Worker 里还是拿不到 env.DB。',
					'',
					'另外，在线编辑器里的「预览」面板有时不会带上正式环境的绑定，',
					'建议直接用浏览器访问正式地址验证：https://times.sfw.us.ci/api/stats',
				].join('\n'),
				{
					status: 503,
					headers: { 'Content-Type': 'text/plain; charset=utf-8', ...cors },
				}
			);
		}

		try {
			if (url.pathname === '/api/hit' && request.method === 'POST') {
				return await handleHit(request, env, cors);
			}
			if (url.pathname === '/api/stats' && request.method === 'GET') {
				const stats = await collectStats(env);
				return json(stats, { ...cors, 'Cache-Control': 'no-store' });
			}
			if (url.pathname === '/' || url.pathname === '' || url.pathname === '/index.html') {
				const stats = await collectStats(env);
				return new Response(renderPage(stats), {
					headers: {
						'Content-Type': 'text/html; charset=utf-8',
						'Cache-Control': 'no-store',
						'X-Content-Type-Options': 'nosniff',
					},
				});
			}
			return new Response('Not Found', { status: 404, headers: cors });
		} catch (err) {
			// 数据库挂了也要给前端一个明确回应，别让人以为卡死
			return new Response('Service Unavailable: ' + (err && err.message ? err.message : 'unknown'), {
				status: 503,
				headers: cors,
			});
		}
	},
};

/* ------------------------------------------------------------
   记账
   ------------------------------------------------------------ */
async function handleHit(request, env, cors) {
	let version = '';
	try {
		const raw = await request.text();
		if (raw.length > 200) {
			return new Response('too large', { status: 413, headers: cors });
		}
		const data = JSON.parse(raw);
		version = String(data && data.v ? data.v : '').trim();
	} catch (e) {
		return new Response('bad request', { status: 400, headers: cors });
	}

	if (!isValidVersion(version)) {
		return new Response('bad version', { status: 400, headers: cors });
	}

	const day = todayInBeijing();

	// 当天这个版本已经有行就 +1，没有就插一行。两者都只写 1 行。
	await env.DB.prepare(
		`INSERT INTO daily (version, day, count) VALUES (?1, ?2, 1)
		 ON CONFLICT(version, day) DO UPDATE SET count = count + 1`
	)
		.bind(version, day)
		.run();

	return new Response(null, { status: 204, headers: cors });
}

/**
 * 版本号白名单。
 * 目的不是防刷（拦不住），而是不让垃圾数据进库 ——
 * 否则「版本排行」里会冒出 undefined、null、一长串乱码之类的东西。
 */
function isValidVersion(v) {
	if (!v || v.length > 24) return false;
	if (!v.includes('.')) return false;
	return /^[0-9A-Za-z][0-9A-Za-z.\-]*$/.test(v);
}

/* ------------------------------------------------------------
   统计
   ------------------------------------------------------------ */
async function collectStats(env) {
	const today = todayInBeijing();
	const yesterday = dayBefore(today, 1);
	const trendStart = dayBefore(today, TREND_DAYS - 1);

	const [totalRow, versionRows, trendRows, todayRow, yesterdayRow, lastRow] = await Promise.all([
		env.DB.prepare('SELECT COALESCE(SUM(count),0) AS n FROM daily').first(),
		env.DB.prepare('SELECT version, SUM(count) AS n FROM daily GROUP BY version ORDER BY n DESC').all(),
		env.DB.prepare('SELECT day, SUM(count) AS n FROM daily WHERE day >= ?1 GROUP BY day ORDER BY day')
			.bind(trendStart)
			.all(),
		env.DB.prepare('SELECT COALESCE(SUM(count),0) AS n FROM daily WHERE day = ?1').bind(today).first(),
		env.DB.prepare('SELECT COALESCE(SUM(count),0) AS n FROM daily WHERE day = ?1').bind(yesterday).first(),
		env.DB.prepare('SELECT MAX(day) AS d FROM daily').first(),
	]);

	const total = num(totalRow && totalRow.n);
	const byVersion = (versionRows.results || []).map((r) => ({
		version: String(r.version),
		count: num(r.n),
	}));

	// 没有下载的日子也要出现，否则趋势图会被压缩、看不出停更
	const trendMap = new Map();
	(trendRows.results || []).forEach((r) => trendMap.set(String(r.day), num(r.n)));
	const trend = [];
	for (let i = TREND_DAYS - 1; i >= 0; i--) {
		const d = dayBefore(today, i);
		trend.push({ day: d, count: trendMap.get(d) || 0 });
	}

	return {
		total,
		today: num(todayRow && todayRow.n),
		yesterday: num(yesterdayRow && yesterdayRow.n),
		versions: byVersion,
		trend,
		lastDay: (lastRow && lastRow.d) || null,
		generatedAt: new Date().toISOString(),
	};
}

function num(v) {
	const n = Number(v);
	return Number.isFinite(n) ? n : 0;
}

/* ------------------------------------------------------------
   日期：全部按北京时间算
   ------------------------------------------------------------ */
function todayInBeijing() {
	return new Date(Date.now() + TZ_OFFSET_MS).toISOString().slice(0, 10);
}

function dayBefore(dayStr, n) {
	const t = Date.parse(dayStr + 'T00:00:00Z') - n * 86400000;
	return new Date(t).toISOString().slice(0, 10);
}

function json(obj, headers) {
	return new Response(JSON.stringify(obj, null, 2), {
		headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
	});
}

/* ------------------------------------------------------------
   页面
   ------------------------------------------------------------ */
function fmt(n) {
	return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function escapeHtml(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function renderPage(stats) {
	const maxVersion = Math.max(1, ...stats.versions.map((v) => v.count));

	const versionRows = stats.versions.length
		? stats.versions
				.map((v) => {
					const pct = Math.max(1, Math.round((v.count / maxVersion) * 100));
					return `<div class="vrow">
						<div class="vname">v${escapeHtml(v.version)}</div>
						<div class="vbar"><i style="width:${pct}%"></i></div>
						<div class="vnum">${fmt(v.count)}</div>
					</div>`;
				})
				.join('')
		: '<p class="empty">还没有数据。有人从官网点下载之后，这里就会有数字。</p>';

	const maxDay = Math.max(1, ...stats.trend.map((d) => d.count));
	const cols = stats.trend
		.map((d) => {
			const h = d.count === 0 ? 0 : Math.max(3, Math.round((d.count / maxDay) * 100));
			const label = d.day.slice(5);
			return `<div class="col" title="${d.day}　${d.count} 次">
				<div class="colbar" style="height:${h}%"></div>
				<div class="collabel">${label}</div>
			</div>`;
		})
		.join('');

	const firstDay = stats.trend.length ? stats.trend[0].day : '';
	const lastDay = stats.trend.length ? stats.trend[stats.trend.length - 1].day : '';

	return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>下载统计 · SERVICES FOR Windows</title>
<style>
	:root{
		--brand:#005a9e;
		--bg:#f7f9fc;
		--card:#ffffff;
		--text:#1a1d21;
		--muted:#5b6470;
		--faint:#8a939e;
		--border:#e3e8ef;
		--bar:#cfe0f0;
	}
	@media (prefers-color-scheme: dark){
		:root{
			--brand:#4aa3f0;
			--bg:#16181d;
			--card:#1e2127;
			--text:#e6e9ee;
			--muted:#a2abb8;
			--faint:#6f7986;
			--border:#2c313a;
			--bar:#2c3f52;
		}
	}
	*{box-sizing:border-box}
	body{
		margin:0;padding:48px 20px 64px;
		background:var(--bg);color:var(--text);
		font-family:system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif;
		line-height:1.6;
	}
	.wrap{max-width:820px;margin:0 auto}
	h1{margin:0;font-size:1.5rem;letter-spacing:-0.01em}
	.sub{margin:6px 0 32px;color:var(--muted);font-size:0.9rem}
	.cards{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:36px}
	.card{
		flex:1 1 150px;padding:18px 20px;
		background:var(--card);border:1px solid var(--border);border-radius:12px;
	}
	.card .num{
		font-size:1.8rem;font-weight:600;font-variant-numeric:tabular-nums;
		color:var(--brand);line-height:1.2;
	}
	.card .label{margin-top:2px;font-size:0.85rem;color:var(--muted)}
	h2{margin:0 0 16px;font-size:1rem;color:var(--muted);font-weight:600}
	section{margin-bottom:36px}
	.vrow{display:flex;align-items:center;gap:14px;margin-bottom:10px}
	.vname{
		width:88px;flex-shrink:0;
		font-family:ui-monospace,Consolas,monospace;font-size:0.9rem;
	}
	.vbar{flex:1;height:10px;background:var(--bar);border-radius:5px;overflow:hidden}
	.vbar i{display:block;height:100%;background:var(--brand);border-radius:5px}
	.vnum{
		width:72px;text-align:right;flex-shrink:0;
		font-variant-numeric:tabular-nums;font-size:0.9rem;color:var(--muted);
	}
	.chart{
		display:flex;align-items:flex-end;gap:3px;
		height:150px;padding:10px 0 0;
		border-bottom:1px solid var(--border);
	}
	.col{flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%;min-width:0}
	.colbar{background:var(--brand);border-radius:2px 2px 0 0;min-height:0;transition:none}
	.collabel{display:none}
	.axis{display:flex;justify-content:space-between;margin-top:8px;font-size:0.78rem;color:var(--faint)}
	.empty{margin:0;color:var(--muted);font-size:0.9rem}
	footer{margin-top:44px;padding-top:20px;border-top:1px solid var(--border);color:var(--faint);font-size:0.82rem}
	footer a{color:var(--brand);text-decoration:none}
	footer a:hover{text-decoration:underline}
	@media (max-width:520px){
		body{padding:32px 16px 48px}
		/* 手机上三张卡挤一行：字号收一档，否则 "1,055" 这种五位数放不下 */
		.cards{gap:10px}
		.card{flex:1 1 0;padding:14px 12px}
		.card .num{font-size:1.3rem}
		.card .label{font-size:0.78rem}
		.vname{width:68px;font-size:0.82rem}
		.vnum{width:56px;font-size:0.82rem}
	}
</style>
</head>
<body>
<div class="wrap">
	<h1>下载统计</h1>
	<p class="sub">SERVICES FOR Windows 各版本的下载次数</p>

	<div class="cards">
		<div class="card"><div class="num">${fmt(stats.total)}</div><div class="label">总下载</div></div>
		<div class="card"><div class="num">${fmt(stats.today)}</div><div class="label">今日</div></div>
		<div class="card"><div class="num">${fmt(stats.yesterday)}</div><div class="label">昨日</div></div>
	</div>

	<section>
		<h2>各版本</h2>
		${versionRows}
	</section>

	<section>
		<h2>最近 ${TREND_DAYS} 天</h2>
		<div class="chart">${cols}</div>
		<div class="axis"><span>${firstDay.slice(5)}</span><span>${lastDay.slice(5)}</span></div>
	</section>

	<footer>
		统计方式：访客在官网点击下载按钮时上报版本号，同一路径不重复计算版本。<br>
		数据只是趋势参考，浏览器屏蔽脚本或使用下载工具时不会计入。
		· <a href="https://sfw.us.ci/download">返回下载页</a>
	</footer>
</div>
</body>
</html>`;
}
