<#
.SYNOPSIS
  安装 lit-review-6step 技能包到目标项目。

.PARAMETER Target
  项目根目录，默认当前目录。

.PARAMETER WithDeps
  同时下载两个 MIT 依赖（YAN 五件套、星塔五件套）。

.EXAMPLE
  .\install.ps1 -Target C:\work\my-paper -WithDeps
#>
param(
    [string]$Target = ".",
    [switch]$WithDeps
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not (Test-Path -LiteralPath $Target)) {
    New-Item -ItemType Directory -Force -Path $Target | Out-Null
}
$target = (Resolve-Path -LiteralPath $Target).Path
$skillsDir = Join-Path $target ".dsh\skills"

Write-Host "目标项目: $target"
New-Item -ItemType Directory -Force -Path $skillsDir | Out-Null

foreach ($name in @("lit-review-6step", "survey-writing", "survey-abstract")) {
    $src = Join-Path $root "skills\$name"
    if (-not (Test-Path -LiteralPath $src)) { throw "缺少 skills\$name，仓库不完整" }
    $dst = Join-Path $skillsDir $name
    if (Test-Path -LiteralPath $dst) { Remove-Item -LiteralPath $dst -Recurse -Force }
    Copy-Item -LiteralPath $src -Destination $dst -Recurse -Force
    Write-Host "  已安装 skill: $name"
}

$tplSrc = Join-Path $root "templates\文献综述项目模板"
$tplDst = Join-Path $target "文献综述项目模板"
if (Test-Path -LiteralPath $tplSrc) {
    if (Test-Path -LiteralPath $tplDst) {
        Write-Warning "文献综述项目模板/ 已存在，跳过（避免覆盖你的项目）"
    } else {
        Copy-Item -LiteralPath $tplSrc -Destination $tplDst -Recurse -Force
        Write-Host "  已安装模板: 文献综述项目模板/"
    }
}

if ($WithDeps) {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        throw "需要 git 才能下载依赖；可改用 -WithDeps:$false 后手动安装"
    }
    $deps = @(
        @{ name = "literature-review-skill";  url = "https://github.com/YANZHANLIN/literature-review-skill.git" },
        @{ name = "literature-review-skills"; url = "https://github.com/xingtaxueshu/literature-review-skills.git" }
    )
    foreach ($dep in $deps) {
        $dst = Join-Path $skillsDir $dep.name
        if (Test-Path -LiteralPath $dst) {
            Write-Host "  已存在，跳过: $($dep.name)"
            continue
        }
        Write-Host "  下载依赖: $($dep.name)"
        git clone --depth 1 $dep.url $dst
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "下载失败: $($dep.name)；可稍后手动 clone 到 $dst"
        }
    }
}

Write-Host ""
Write-Host "完成。新开 DSH 会话后说：用 lit-review-6step，从 S1 开始（或从 S2 开始，题目是 …）。"
