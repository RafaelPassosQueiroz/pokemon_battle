import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../novo.js', import.meta.url), 'utf8');

function home(player = 'Pikachu', adversary = 'Eevee', fetchImpl) {
  const storage = new Map();
  const alerts = [];
  const requests = [];
  const elements = { inputss: { value: player }, inputs: { value: adversary } };
  const context = vm.createContext({
    document: {
      getElementById: id => elements[id] || null,
      querySelector: () => null,
    },
    localStorage: {
      setItem: (key, value) => storage.set(key, value),
      getItem: key => storage.get(key) ?? null,
    },
    window: { location: { href: '' } },
    alert: message => alerts.push(message),
    console,
    fetch: async url => {
      requests.push(url);
      if (!fetchImpl) throw new Error(`Requisição inesperada: ${url}`);
      return fetchImpl(url);
    },
  });
  vm.runInContext(source, context);
  return { context, storage, alerts, requests };
}

test('abrir a página inicial não consulta APIs de telas ausentes', async () => {
  const state = home();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(state.requests, []);
  assert.deepEqual(state.alerts, []);
});

test('selecionar por nome salva os dois Pokémon e abre golpes.html', async () => {
  const state = home();
  await state.context.mudar();
  assert.equal(state.storage.get('player'), 'pikachu');
  assert.equal(state.storage.get('adversario'), 'eevee');
  assert.equal(state.context.window.location.href, 'golpes.html');
  assert.deepEqual(state.requests, []);
});

test('selecionar por ID resolve os nomes antes de salvar e navegar', async () => {
  const state = home('25', '133', async url => ({
    json: async () => ({ name: url.endsWith('/25') ? 'pikachu' : 'eevee' }),
  }));
  await state.context.mudar();
  assert.equal(state.storage.get('player'), 'pikachu');
  assert.equal(state.storage.get('adversario'), 'eevee');
  assert.equal(state.requests.length, 2);
  assert.equal(state.context.window.location.href, 'golpes.html');
});

test('falha na consulta do jogador impede gravação e navegação', async () => {
  const state = home('999999', 'Eevee', async () => { throw new Error('API indisponível'); });
  await state.context.mudar();
  assert.equal(state.storage.size, 0);
  assert.equal(state.context.window.location.href, '');
  assert.equal(state.alerts.length, 1);
});

test('falha na consulta do adversário impede gravação e navegação', async () => {
  const state = home('Pikachu', '999999', async () => { throw new Error('API indisponível'); });
  await state.context.mudar();
  assert.equal(state.storage.size, 0);
  assert.equal(state.context.window.location.href, '');
  assert.equal(state.alerts.length, 1);
});
