#!/usr/bin/env node
/**
 * generate-universal.js
 *
 * Reads harness-config.json and generates per-harness skill directories
 * from the canonical skills/ source at repo root into dist/universal/.
 *
 * Usage:
 *   node generate-universal.js          # generate files only
 *   node generate-universal.js --zip    # generate + create zip archive
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const PKG_DIR = __dirname;
const REPO_ROOT = path.resolve(PKG_DIR, '..', '..');
const SKILLS_DIR = path.join(REPO_ROOT, 'skills');
const SHARED_DIR = path.join(SKILLS_DIR, 'shared');
const DIST_DIR = path.join(REPO_ROOT, 'dist', 'universal');
const CONFIG_PATH = path.join(PKG_DIR, 'harness-config.json');

const ZIP_FLAG = process.argv.includes('--zip');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Recursively copy a directory, skipping .gitkeep files in the copy but
 * still creating the directory structure.
 */
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      // Skip .gitkeep placeholders
      if (entry.name === '.gitkeep') continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Parse YAML frontmatter from a markdown string.
 * Returns { data: object, body: string } where body is everything after
 * the closing --- delimiter.
 *
 * Returns null if no frontmatter is present.
 */
function parseFrontmatter(content) {
  // Must start with ---
  if (!content.startsWith('---')) return null;

  const end = content.indexOf('\n---', 3);
  if (end === -1) return null;

  const rawYaml = content.slice(3, end).trim();
  const body = content.slice(end + 4); // skip \n---

  // Simple line-by-line YAML parser (handles string, boolean, array values)
  const data = {};
  let currentKey = null;
  let currentArray = null;

  for (const line of rawYaml.split('\n')) {
    // Array item
    const arrayMatch = line.match(/^(\s+)-\s+(.+)$/);
    if (arrayMatch && currentArray !== null) {
      currentArray.push(arrayMatch[2].trim());
      continue;
    }

    // Key: value
    const kvMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      const val = kvMatch[2].trim();

      if (val === '') {
        // Could be an array or nested object — treat as array start
        currentKey = key;
        currentArray = [];
        data[key] = currentArray;
      } else if (val === 'true') {
        data[key] = true;
        currentArray = null;
      } else if (val === 'false') {
        data[key] = false;
        currentArray = null;
      } else {
        data[key] = val;
        currentArray = null;
      }
      continue;
    }

    // Blank lines or unknown lines reset array tracking
    if (line.trim() === '') {
      currentArray = null;
    }
  }

  return { data, body };
}

/**
 * Serialise a frontmatter data object back to YAML string (simple subset).
 */
function serializeFrontmatter(data) {
  const lines = [];
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${item}`);
      }
    } else if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  return lines.join('\n');
}

/**
 * Transform frontmatter data according to harness rules.
 */
function transformFrontmatter(data, harnessConfig) {
  const result = { ...data };
  const fm = harnessConfig.frontmatter || {};

  if (!fm.keepUserInvocable) {
    delete result['user-invocable'];
  }

  if (!fm.keepArgs) {
    if (fm.convertArgsToHint && result.args) {
      // Convert args array to argument-hint string: [NAME=<value>] ...
      const args = Array.isArray(result.args) ? result.args : [result.args];
      const hint = args
        .map((a) => {
          // arg entries may look like "NAME: description" or just "NAME"
          const name = String(a).split(':')[0].trim().toUpperCase();
          return `[${name}=<value>]`;
        })
        .join(' ');
      result['argument-hint'] = hint;
    }
    delete result.args;
  }

  return result;
}

/**
 * Load shared content files into a map keyed by filename (e.g. "persona.md").
 */
function loadSharedContent() {
  const shared = {};
  if (!fs.existsSync(SHARED_DIR)) return shared;

  for (const entry of fs.readdirSync(SHARED_DIR, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      shared[entry.name] = fs.readFileSync(
        path.join(SHARED_DIR, entry.name),
        'utf8'
      );
    }
  }
  return shared;
}

/**
 * Inline <!-- inline:shared/X.md --> markers in content with loaded shared files.
 */
function inlineSharedContent(content, sharedContent) {
  return content.replace(
    /<!-- inline:shared\/([\w.-]+) -->/g,
    (match, filename) => {
      if (sharedContent[filename] !== undefined) {
        return sharedContent[filename];
      }
      console.warn(`  [warn] Inline marker references missing file: shared/${filename}`);
      return match; // leave marker in place if file not found
    }
  );
}

/**
 * Process a single SKILL.md file: transform frontmatter + inline shared content.
 */
function processSkillMd(content, harnessConfig, sharedContent) {
  const parsed = parseFrontmatter(content);

  let processed;
  if (parsed) {
    const transformedData = transformFrontmatter(parsed.data, harnessConfig);
    const newFrontmatter = serializeFrontmatter(transformedData);
    processed = `---\n${newFrontmatter}\n---${parsed.body}`;
  } else {
    processed = content;
  }

  return inlineSharedContent(processed, sharedContent);
}

/**
 * Remove dist/universal directory for a clean build.
 */
function cleanDist() {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
    console.log('Cleaned dist/universal/');
  }
}

/**
 * Write dist/universal/README.txt with brief install instructions.
 */
function writeReadme() {
  const content = `Vibe Check — Universal Skill Distribution
==========================================

This archive contains per-harness skill directories.
Copy the appropriate folder to your project root.

Harness directories:
  .claude/skills/   — Claude Code (claude.ai/claude-code)
  .cursor/skills/   — Cursor IDE
  .codex/skills/    — OpenAI Codex CLI
  .gemini/skills/   — Gemini CLI
  .agents/skills/   — VS Code Copilot / Antigravity
  .kiro/skills/     — Kiro
  .opencode/skills/ — OpenCode
  .pi/skills/       — Pi

Installation:
  1. Unzip this archive (if zipped).
  2. Copy the folder matching your AI harness into your project root.
     Example (Claude Code):
       cp -r vibe-check-universal/.claude/skills .claude/skills
  3. Follow the harness-specific setup guide at:
       https://vibe-check.dev/docs/install

Generated: ${new Date().toISOString()}
`;
  fs.writeFileSync(path.join(DIST_DIR, 'README.txt'), content, 'utf8');
}

// ---------------------------------------------------------------------------
// Main build
// ---------------------------------------------------------------------------

function build() {
  console.log('=== Vibe Check — generate-universal ===');
  console.log(`Repo root : ${REPO_ROOT}`);
  console.log(`Skills dir: ${SKILLS_DIR}`);
  console.log(`Dist dir  : ${DIST_DIR}`);
  console.log('');

  // Validate skills directory exists
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`ERROR: skills/ directory not found at ${SKILLS_DIR}`);
    process.exit(1);
  }

  // Load config
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const { harnesses } = config;

  // Load shared content for inlining
  const sharedContent = loadSharedContent();
  console.log(
    `Loaded shared files: ${Object.keys(sharedContent).join(', ') || '(none)'}`
  );
  console.log('');

  // Collect skill folders (skip shared/)
  const skillEntries = fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== 'shared');

  console.log(
    `Skill folders: ${skillEntries.map((e) => e.name).join(', ') || '(none)'}`
  );
  console.log('');

  cleanDist();
  fs.mkdirSync(DIST_DIR, { recursive: true });

  // Process each harness
  for (const [harnessName, harnessConfig] of Object.entries(harnesses)) {
    const destBase = path.join(DIST_DIR, harnessConfig.dir, 'vibe-check');
    console.log(`[${harnessName}] → ${path.relative(REPO_ROOT, destBase)}`);

    for (const skillEntry of skillEntries) {
      const skillSrc = path.join(SKILLS_DIR, skillEntry.name);
      const skillDest = path.join(destBase, skillEntry.name);

      // Copy entire skill folder
      copyDirRecursive(skillSrc, skillDest);

      // Transform SKILL.md if present
      const skillMdPath = path.join(skillDest, 'SKILL.md');
      if (fs.existsSync(skillMdPath)) {
        const original = fs.readFileSync(skillMdPath, 'utf8');
        const transformed = processSkillMd(original, harnessConfig, sharedContent);
        fs.writeFileSync(skillMdPath, transformed, 'utf8');
        console.log(`  transformed SKILL.md: ${skillEntry.name}`);
      }
    }
  }

  console.log('');
  writeReadme();
  console.log('Wrote dist/universal/README.txt');

  if (ZIP_FLAG) {
    createZip();
  }

  console.log('');
  console.log('Done.');
}

/**
 * Create vibe-check-universal.zip from dist/universal/
 */
function createZip() {
  const zipPath = path.join(REPO_ROOT, 'dist', 'vibe-check-universal.zip');
  console.log(`Creating zip: ${path.relative(REPO_ROOT, zipPath)}`);

  // Use platform-appropriate zip command
  const isWindows = process.platform === 'win32';
  try {
    if (isWindows) {
      // PowerShell Compress-Archive
      execSync(
        `powershell -Command "Compress-Archive -Path '${DIST_DIR}\\*' -DestinationPath '${zipPath}' -Force"`,
        { stdio: 'inherit' }
      );
    } else {
      execSync(`cd "${path.dirname(DIST_DIR)}" && zip -r "${zipPath}" "${path.basename(DIST_DIR)}"`, {
        stdio: 'inherit',
        shell: true,
      });
    }
    console.log('Zip created successfully.');
  } catch (err) {
    console.error('Failed to create zip:', err.message);
    console.error('Skipping zip creation. Files are available in dist/universal/');
  }
}

build();
