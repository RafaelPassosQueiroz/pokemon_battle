# Relatório de CI/CD — Pokémon Battle

**Resultado obtido:** foi implementada uma pipeline de GitHub Actions com CI em push e pull request para a branch `main`. A validação local passou para as três páginas e oito referências locais; os cinco testes automatizados passaram. O site foi preparado e validado para publicação. A comprovação de CI/CD no GitHub e da aplicação acessível depende da execução remota e da ativação do GitHub Pages.

**Problema encontrado:** o projeto não possuía pipeline nem publicação configurada. Além disso, `novo.js`, compartilhado entre páginas, iniciava consultas de telas ausentes, acessava elementos inexistentes e buscava Pokémon sem seleção. Os testes reproduziram esse problema antes da correção. O envio pela integração GitHub retornou HTTP 403 (Resource not accessible by integration), e o Git pelo terminal não conseguiu resolver o endereço github.com. A configuração do Pages pelo navegador foi bloqueada porque a ferramenta não conseguiu confirmar a URL. Os arquivos foram alterados localmente; ainda é necessário enviá-los ao repositório e selecionar GitHub Actions em Settings → Pages → Source. Nenhuma execução remota bem-sucedida ou publicação foi confirmada.

**Alteração realizada:** foram adicionados o workflow `.github/workflows/ci-cd.yml`, os scripts de validação e preparação, cinco testes de navegação e a documentação. A inicialização de `novo.js` passou a verificar os elementos da página e a seleção do jogador. O CD depende do sucesso da CI e ocorre somente em push na `main`, publicando o mesmo artefato validado e verificando as três páginas por HTTP.

**Justificativa do deployment:** GitHub Pages é adequado porque a aplicação usa HTML, CSS e JavaScript executados no navegador, sem backend próprio. O Node.js 24 serve apenas para validação, testes e preparação; não há dependências adicionais para instalar. A publicação usa as ações oficiais e o token temporário do GitHub, sem credenciais pessoais.

**Apoio de IA generativa:** ChatGPT/Codex apoiou a análise do projeto, a elaboração da pipeline, a criação dos testes e a correção do erro de inicialização. As verificações locais foram executadas, sem tratar funcionalidades inacabadas do jogo como concluídas.

**Verificação:** executar `node scripts/validate.mjs`, `node --test`, `node scripts/build.mjs` e `node scripts/validate.mjs _site`. No GitHub, consultar Actions e o ambiente `github-pages`. Após o deploy, conferir https://RafaelPassosQueiroz.github.io/pokemon_battle/.

**Referência técnica:** [GitHub — workflows personalizados para Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
