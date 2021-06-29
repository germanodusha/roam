#!/bin/bash

node libs/google-sheet-importer/index.js
cp libs/google-sheet-importer/export/content*.js data/.
npx prettier data/content*.js
npx eslint --fix data/content*.js
