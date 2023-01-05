#!/usr/bin/env sh

# abort on errors
set -e
npm install
# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

git config --global user.email "mike.82pronka.27a@gmail.com"
git config --global user.name "VerseVent"

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:sigma-vue-internship/easy-interview.git main:gh-pages

cd -