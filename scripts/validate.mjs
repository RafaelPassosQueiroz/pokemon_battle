import { readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, relative, dirname, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] || '.');
const files = readdirSync(root).filter(name => statSync(resolve(root, name)).isFile());
let references = 0;

for (const page of ['index.html', 'golpes.html', 'luta.html']) {
  if (!files.includes(page)) throw new Error(`Página obrigatória ausente: ${page}`);
}

for (const file of files) {
  const path = resolve(root, file);
  if (extname(file) === '.js') {
    const result = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(result.stderr || `JavaScript inválido: ${file}`);
  }
  if (!['.html', '.css'].includes(extname(file))) continue;
  const source = readFileSync(path, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const pattern = extname(file) === '.html'
    ? /\b(?:src|href)\s*=\s*["']([^"']*)["']/gi
    : /url\(\s*["']?([^\s"')]+)["']?\s*\)/gi;
  for (const match of source.matchAll(pattern)) {
    const value = match[1].trim();
    if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) continue;
    if (value.startsWith('/')) throw new Error(`${file}: caminho absoluto incompatível com Pages: ${value}`);
    const target = resolve(dirname(path), decodeURIComponent(value.split(/[?#]/)[0]));
    if (relative(root, target).startsWith('..')) throw new Error(`${file}: arquivo fora do site: ${value}`);
    if (!statSync(target, { throwIfNoEntry: false })?.isFile()) {
      throw new Error(`${file}: arquivo local não encontrado: ${value}`);
    }
    references++;
  }
}

console.log(`Validação OK: 3 páginas, JavaScript válido e ${references} referências locais existentes.`);
