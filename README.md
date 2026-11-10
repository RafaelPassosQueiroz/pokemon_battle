# pokemon_battle
This repository contains a Html + Css + Js code, simulating a pokemon battle, I'm using the PokeApi and the TCGdex Api, to get all the pokemons data , their moves and some images

Firstly, in index.html there's a menu, where you can choose your Pokemón, and the adversary's pokemón

Secondly you will be targeted to golpes.html a page where you can see the attributes of your pokemón, and choose 4 of all the moves that it has, to battle with the adversary's pokemón

After choosing your pokemon moves you will be able to battle against your adversary's pokemón, with the true moves and numbers of the PokeApi in luta.html

The golpes.html and luta.html are not ready until february of 2026, in this moment golpes.html is been developed and luta.html has many images of any pokemons that you want to see, this is a side project, but you can accompany the progress by seing the kanban board

## CI/CD with GitHub Actions

The workflow in `.github/workflows/ci-cd.yml` runs on pushes to `main` and pull requests targeting `main`. It checks out the repository, sets up Node.js 24, validates JavaScript syntax and local page assets, runs five automated navigation tests with mocked APIs, and prepares and validates the static site in `_site/`. There are no packages to install: validation, tests and packaging use Node.js built-ins.

Only successful push builds on `main` publish the validated artifact to GitHub Pages. Pull requests run CI without deployment. Deployment uses the `github-pages` environment and the built-in GitHub token with Pages and OIDC permissions; no personal access token is required. An HTTP check then verifies the three published pages.

### One-time repository setup

In **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. This is required before the first deployment. If a run failed before Pages was enabled, open **Actions → CI e CD - Pokemon Battle → the failed run → Re-run failed jobs**.

Published site address after a successful deployment: https://RafaelPassosQueiroz.github.io/pokemon_battle/

### Local verification

With Node.js 24 installed, run each command and continue only if it succeeds:

```shell
node scripts/validate.mjs
node --test
node scripts/build.mjs
node scripts/validate.mjs _site
```

The package contains only the root HTML, CSS, JavaScript and image files. Git metadata, tests, documentation and the experimental Python file are excluded. Keep deployable assets in the root, or update the build and validation scripts when adding directories.

This automation publishes the current project; it does not complete unfinished battle features. Tests simulate API responses, so they do not guarantee the availability of PokeAPI, TCGdex or external images. ChatGPT/Codex assisted in designing, implementing and verifying this pipeline. See [RELATORIO_CICD.md](RELATORIO_CICD.md) for the short report.
