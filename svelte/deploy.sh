# deploy.sh

set -e

echo Building
npm run build

cd dist

echo Deploying...
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/yeefun/todomvc-svelte.git master:gh-pages

cd -
