#!/usr/bin/env node
/**
 * AMiner 检索通道健康检查。
 *
 * 输出一行 JSON：
 *   {"status":"OK|EXPIRED|INVALID|MISSING|NETWORK","http":<code>,"tokenExp":"<iso|null>","hint":"..."}
 *
 * 用法：node .dsh/skills/lit-review-6step/scripts/aminer_health.mjs
 * 退出码恒为 0，结论看 status 字段，避免把诊断结果误报成命令失败。
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ENDPOINT =
  'https://datacenter.aminer.cn/gateway/open_platform/api/paper/list/by/search/venue';

function loadKey() {
  if (process.env.AMINER_API_KEY) {
    return { key: process.env.AMINER_API_KEY, source: 'env' };
  }
  const yml = path.join(os.homedir(), '.dsh', 'profiles', 'web', 'cordis.patch.yml');
  if (fs.existsSync(yml)) {
    const text = fs.readFileSync(yml, 'utf8');
    const m = text.match(/AMINER_API_KEY:\s*['"]?([A-Za-z0-9._~+/=-]+)['"]?/);
    if (m) return { key: m[1], source: yml };
  }
  return null;
}

function tokenExp(key) {
  try {
    const payload = key.split('.')[1];
    const json = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof json.exp === 'number' ? json.exp * 1000 : null;
  } catch {
    return null;
  }
}

function emit(status, extra = {}) {
  console.log(JSON.stringify({ status, ...extra }));
}

const found = loadKey();
if (!found) {
  emit('MISSING', {
    http: null,
    tokenExp: null,
    hint: '未找到 AMINER_API_KEY（环境变量与 cordis.patch.yml 都没有）。按 references/aminer.md 配置，或走降级通道。',
  });
  process.exit(0);
}

const exp = tokenExp(found.key);
const expIso = exp ? new Date(exp).toISOString() : null;

if (exp && exp < Date.now()) {
  emit('EXPIRED', {
    http: null,
    tokenExp: expIso,
    hint: `JWT 已于 ${expIso} 过期。到 AMiner 开放平台换新 token，写回 cordis.patch.yml 的 mcp-aminer.env 后重启 DSH。`,
  });
  process.exit(0);
}

const url = new URL(ENDPOINT);
url.searchParams.set('keyword', 'literature review');
url.searchParams.set('page', '0');
url.searchParams.set('size', '1');

let res;
try {
  res = await fetch(url, {
    headers: { Authorization: found.key, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(20000),
  });
} catch (err) {
  emit('NETWORK', {
    http: null,
    tokenExp: expIso,
    hint: `网关不可达：${err.message}。稍后重试或走降级通道。`,
  });
  process.exit(0);
}

const body = await res.text();
let code = null;
try {
  code = JSON.parse(body).code ?? null;
} catch {
  /* 非 JSON 响应 */
}

if (res.ok) {
  emit('OK', { http: res.status, tokenExp: expIso, hint: 'AMiner 通道可用。' });
} else if (code === 40308 || /invalid token/i.test(body)) {
  emit('INVALID', {
    http: res.status,
    tokenExp: expIso,
    hint: 'token 无效（网关 code 40308）。JWT 可能被吊销或签错，换新 token。',
  });
} else {
  emit('INVALID', {
    http: res.status,
    tokenExp: expIso,
    hint: `网关返回 ${res.status}：${body.slice(0, 160)}`,
  });
}
process.exit(0);
