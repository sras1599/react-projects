#!/usr/bin/env sh

set -e

npm run build

mkdir -p game/2048
mv dist/* game/2048
cd game

git init
git checkout -b main
git add -A
git commit -m 'deploy 2048'

git push -f git@github.com:sras1599/react-projects.git main:gh-pages

cd -
rm -rf game/