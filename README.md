# Locale Guard demo: Lefthook

A small Nuxt travel site in English, Arabic, French and German, translated with
[@nuxtjs/i18n](https://i18n.nuxtjs.org). [Lefthook](https://lefthook.dev/) runs
[locale-guard-cli](https://www.npmjs.com/package/locale-guard-cli) before each
commit and push, and the
[Locale Guard](https://github.com/Mohamed-Almarag/locale-guard) Action checks
each pull request. Both read the same settings file.

## Setup

| | |
|---|---|
| Framework | Nuxt 4 |
| Translation library | `@nuxtjs/i18n` (vue-i18n messages) |
| Locale files | `i18n/locales/{locale}.json`, one file per language |
| Base locale | `en` |
| Git hooks | Lefthook 2 |

The settings, in [.localeguard.yml](.localeguard.yml):

```yaml
files: i18n/locales/{locale}.json
format: '@nuxtjs/i18n'
```

The hooks, in [lefthook.yml](lefthook.yml):

```yaml
pre-commit:
  jobs:
    - name: translations
      glob: 'i18n/locales/*.json'
      run: npx locale-guard-cli --staged

pre-push:
  jobs:
    - name: translations
      run: npx locale-guard-cli --base origin/main
```

`glob` runs the pre-commit check only when a locale file is staged. `lefthook`
and `locale-guard-cli` are dev dependencies, and Lefthook sets up the hooks when
you run `npm install`.

The pull request check, in
[.github/workflows/translations.yml](.github/workflows/translations.yml):

```yaml
- uses: Mohamed-Almarag/locale-guard@v1
```

## Try the hooks

```bash
git clone https://github.com/Mohamed-Almarag/locale-guard-demo-lefthook.git
cd locale-guard-demo-lefthook
npm install
```

Add `"deals": "Deals"` under `nav` in `i18n/locales/en.json` only, then commit
it:

```bash
git add i18n/locales/en.json
git commit -m "Add a deals link"
```

The commit stops, because the other languages do not have the key:

```text
┃  translations ❯
i18n/locales/ar.json
  2:3  error    Missing key nav.deals  missing-keys

i18n/locales/de.json
  2:3  error    Missing key nav.deals  missing-keys

i18n/locales/fr.json
  2:3  error    Missing key nav.deals  missing-keys

✖ 3 new issues (3 errors) since the last commit
  2 existing issues are not shown. --all lists every issue.

exit status 1
```

Add the key to `ar.json`, `de.json` and `fr.json`, stage the four files, and
commit again. This time it goes through:

```text
┃  translations ❯
✔ No new translation issues since the last commit.
  2 existing issues are not shown. --all lists every issue.
```

## Pull requests to look at

| Pull request | What it shows | Result |
|---|---|---|
| [#1 Add booking checkout](https://github.com/Mohamed-Almarag/locale-guard-demo-lefthook/pull/1) | A new page with translation mistakes: missing keys, a typo in a placeholder, a link to a key that does not exist, an empty value, untranslated text, an extra key and a broken plural | ❌ Fails |
| [#2 Add trip details](https://github.com/Mohamed-Almarag/locale-guard-demo-lefthook/pull/2) | The first commit forgets French and German, the second one adds them, and the same comment turns green | ✅ Passes |
| [#3 Style the header](https://github.com/Mohamed-Almarag/locale-guard-demo-lefthook/pull/3) | A change that touches no translation file, so the check finishes in seconds | ✅ Passes |

The hooks would have stopped the mistakes in #1 and in the first commit of #2.
Those commits were made with `git commit --no-verify`, which skips the hooks,
to show that the Action still catches them on the pull request.

The `main` branch already has two old issues: a key German never got, and a key
French still has after it was removed from English. Locale Guard lists them
apart from the issues each change adds, and they do not fail the hooks or the
check.

## Run the site

```bash
npm install
npm run dev
```
