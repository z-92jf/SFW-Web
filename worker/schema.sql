/* ============================================================
   SERVICES FOR Windows 下载计数 —— D1 建表脚本

   用法：
     Cloudflare 控制台 → 「存储和数据库」→「D1 SQL 数据库」→ 进入你的库
     →「控制台」→ 把下面三条【分别】粘贴执行，每贴一条点一次「执行」。

   为什么这个文件里没有行注释（两个减号开头的那种）：
     D1 的输入框可能把多行内容压成一行。一旦压成一行，行注释会把
     整行后面全部吃掉 —— 结果是「执行不报错，但表根本没建出来」，
     概览页的「表数量」一直是 0。块注释没有这个问题：它在结束标记处
     正常结束，后面的语句照常执行。

   粘贴时建议【只贴语句本身】，不要连注释一起贴 —— 那样最保险。

   设计说明：
     不存「每次下载一行」，而是按 (版本, 日期) 累计。
     这样「总下载」「各版本排行」「每日趋势」三种查询都能直接出，
     行数也只有「版本数 × 天数」，几年下来也就几千行。
   ============================================================ */

CREATE TABLE IF NOT EXISTS daily (version TEXT NOT NULL, day TEXT NOT NULL, count INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (version, day));

CREATE INDEX IF NOT EXISTS idx_daily_day ON daily (day);

CREATE INDEX IF NOT EXISTS idx_daily_version ON daily (version);
