#!/usr/bin/env node
/**
 * 仓库自检：push 前跑一次。
 *
 *   node scripts/check.mjs
 *
 * 检查项：
 *   1. catalog/skills.json 与 skills/ 目录一致
 *   2. 每个 SKILL.md / 命令文件有 name + description
 *   3. SKILL.md 里引用的相对路径都存在
 *   4. README 覆盖了每个 skill
 *   5. 没有个人绝对路径
 *   6. 没有密钥
 *   7. install.ps1 带 UTF-8 BOM（Windows PowerShell 5.1 需要）
 *
 * 退出码：0 全部通过；1 有失败。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;
let passed = 0;

function ok(msg) {
  passed += 1;
  console.log(`  PASS  ${msg}`);
}
function fail(msg, detail) {
  failed += 1;
  console.log(`  FAIL  ${msg}`);
  if (detail) console.log(`        ${detail}`);
}
function readText(p) {
  return fs.readFileSync(p, 'utf8');
}
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const TEXT_EXT = new Set(['.md', '.mjs', '.js', '.json', '.ps1', '.sh', '.cff', '.yml', '.yaml', '.txt']);
const textFiles = walk(root).filter((f) => TEXT_EXT.has(path.extname(f).toLowerCase()));

// 1. catalog
console.log('\n[1] catalog 与 skill 目录');
let catalog = null;
try {
  catalog = JSON.parse(readText(path.join(root, 'catalog', 'skills.json')));
  ok('catalog/skills.json 是合法 JSON');
} catch (e) {
  fail('catalog/skills.json 解析失败', e.message);
}
const skillDirs = fs.existsSync(path.join(root, 'skills'))
  ? fs.readdirSync(path.join(root, 'skills'), { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== 'shared')
      .map((d) => d.name)
  : [];
if (catalog) {
  const listed = catalog.skills.map((s) => s.name);
  for (const name of skillDirs) {
    if (!listed.includes(name)) fail(`skills/${name} 未登记在 catalog`);
    else ok(`catalog 覆盖 ${name}`);
  }
  for (const s of catalog.skills) {
    const p = path.join(root, s.path, 'SKILL.md');
    if (fs.existsSync(p)) ok(`${s.path}/SKILL.md 存在`);
    else fail(`${s.path}/SKILL.md 不存在`);
  }
  for (const c of catalog.commands || []) {
    if (fs.existsSync(path.join(root, c))) ok(`命令存在 ${c}`);
    else fail(`命令不存在 ${c}`);
  }
}

// 2. frontmatter
console.log('\n[2] frontmatter');
function checkFrontmatter(file) {
  const text = readText(file);
  const rel = path.relative(root, file);
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return fail(`${rel} 缺少 frontmatter`);
  const block = m[1];
  if (!/^name:\s*\S+/m.test(block)) return fail(`${rel} 缺少 name`);
  if (!/^description:\s*\S+/m.test(block)) return fail(`${rel} 缺少 description`);
  ok(`${rel} frontmatter 完整`);
}
for (const name of skillDirs) checkFrontmatter(path.join(root, 'skills', name, 'SKILL.md'));
if (fs.existsSync(path.join(root, 'commands'))) {
  for (const f of fs.readdirSync(path.join(root, 'commands')).filter((f) => f.endsWith('.md'))) {
    checkFrontmatter(path.join(root, 'commands', f));
  }
}

// 3. 相对路径引用
console.log('\n[3] SKILL.md 引用路径');
const refPattern = /(?:^|[\s`'"(（])((?:\.\.\/shared\/|assets\/|references\/|scripts\/)[^\s`'")）]+\.(?:md|mjs|csv|jpg|png))/g;
for (const name of skillDirs) {
  const skillDir = path.join(root, 'skills', name);
  const text = readText(path.join(skillDir, 'SKILL.md'));
  const seen = new Set();
  for (const m of text.matchAll(refPattern)) {
    const ref = m[1];
    if (seen.has(ref)) continue;
    seen.add(ref);
    const target = path.resolve(skillDir, ref);
    if (fs.existsSync(target)) ok(`${name} → ${ref}`);
    else fail(`${name} 引用的路径不存在: ${ref}`);
  }
}

// 4. README 覆盖
console.log('\n[4] README 覆盖');
const readme = readText(path.join(root, 'README.md'));
for (const name of skillDirs) {
  if (readme.includes(`skills/${name}`)) ok(`README 提到 skills/${name}`);
  else fail(`README 未提到 skills/${name}`);
}

// 5. 个人路径
console.log('\n[5] 个人路径');
const personal = /(?:[A-Za-z]:\\Users\\|\/Users\/[A-Za-z])/;
let personalHits = 0;
for (const f of textFiles) {
  const text = readText(f);
  if (personal.test(text)) {
    personalHits += 1;
    fail(`个人路径: ${path.relative(root, f)}`);
  }
}
if (!personalHits) ok('未发现个人绝对路径');

// 6. 密钥
console.log('\n[6] 密钥');
const secretPatterns = [
  [/eyJ[A-Za-z0-9_-]{10,}\./, 'JWT'],
  [/sk-[A-Za-z0-9]{20,}/, 'OpenAI-style key'],
  [/(gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/, 'GitHub token'],
  [/AKIA[0-9A-Z]{16}/, 'AWS access key'],
];
let secretHits = 0;
for (const f of textFiles) {
  const text = readText(f);
  for (const [re, label] of secretPatterns) {
    if (re.test(text)) {
      secretHits += 1;
      fail(`${label}: ${path.relative(root, f)}`);
    }
  }
}
if (!secretHits) ok('未发现密钥模式');

// 7. install.ps1 BOM
console.log('\n[7] install.ps1 编码');
const ps1 = path.join(root, 'install.ps1');
if (fs.existsSync(ps1)) {
  const b = fs.readFileSync(ps1);
  if (b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf) ok('install.ps1 带 UTF-8 BOM');
  else fail('install.ps1 缺少 UTF-8 BOM（Windows PowerShell 5.1 会乱码）');
}

console.log(`\n结果: ${passed} 通过, ${failed} 失败`);
process.exit(failed ? 1 : 0);
