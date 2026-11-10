import { copyFileSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';

const root = process.cwd();
const output = resolve(root, '_site');
// Limpeza restrita à pasta gerada dentro do projeto.
if (output !== resolve(root, '_site') || output === root) throw new Error('Destino inválido');
console.log(`Preparando a pasta de publicação: ${output}`);
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
const extensions = new Set(['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico']);
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && extensions.has(extname(entry.name).toLowerCase())) {
    copyFileSync(resolve(root, entry.name), resolve(output, entry.name));
  }
}
writeFileSync(resolve(output, '.nojekyll'), '');
console.log('Site preparado. Apenas páginas, estilos, scripts e imagens serão publicados.');
