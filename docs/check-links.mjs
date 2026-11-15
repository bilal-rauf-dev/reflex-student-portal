import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Run with: node docs/check-links.mjs
const docs = dirname(fileURLToPath(import.meta.url));
const root = dirname(docs);

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.isFile() && path.endsWith('.md') ? [path] : [];
  });
}

// Recognise inline links and images, reference definitions, and HTML links and images.
const markdownTarget = /(?:\]\(\s*|^ {0,3}\[[^\]]+\]:\s*)(?:<([^>]+)>|([^\s)]+))/g;
const htmlTarget = /<(?:a|img)\b[^>]*?\s(?:href|src)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;
const files = [join(root, 'README.md'), ...markdownFiles(docs)];
let checked = 0;
let broken = 0;

for (const file of files) {
  const lines = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, (comment) =>
    comment.replace(/[^\n]/g, ' '),
  ).split(/\r?\n/);
  let fence;

  for (const [index, line] of lines.entries()) {
    const marker = line.match(/^ {0,3}(~{3,}|\x60{3,})(.*)$/);
    if (marker && !fence) {
      fence = marker[1];
      continue;
    }
    if (fence) {
      if (marker && marker[1].startsWith(fence) && !marker[2].trim()) fence = undefined;
      continue;
    }

    const prose = line.replace(/(\x60+).*?\1/g, '');
    for (const pattern of [markdownTarget, htmlTarget]) {
      for (const [, first, second, third] of prose.matchAll(pattern)) {
        const target = first ?? second ?? third;
        if (/^[a-z][a-z\d+.-]*:|^\//i.test(target)) continue;

        checked += 1;
        const path = target.split(/[?#]/, 1)[0];
        let exists = false;
        try {
          const destination = path ? resolve(dirname(file), decodeURIComponent(path)) : file;
          exists = statSync(destination, { throwIfNoEntry: false })?.isFile();
        } catch (error) {
          if (!(error instanceof URIError) && error.code !== 'ENOTDIR') throw error;
        }
        if (!exists) {
          broken += 1;
          console.error('%s:%d: %s', relative(root, file), index + 1, target);
        }
      }
    }
  }
}

console.log('Checked %d relative links in %d Markdown files. Broken: %d.', checked, files.length, broken);
if (broken) process.exitCode = 1;
