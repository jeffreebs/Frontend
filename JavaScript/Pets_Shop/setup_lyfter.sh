#!/bin/bash

PROJECT="lyfter-pet-store"
mkdir -p $PROJECT/{css/pages,js/{api,utils,pages}}

# HTML files
for f in index login register catalog product cart checkout confirmation admin edit-product; do
  touch $PROJECT/$f.html
done

# CSS files
touch $PROJECT/css/global.css
touch $PROJECT/css/components.css
for f in home auth catalog admin; do
  touch $PROJECT/css/pages/$f.css
done

# JS api
for f in config auth.api products.api cart.api; do
  touch $PROJECT/js/api/$f.js
done

# JS utils
for f in session validators ui; do
  touch $PROJECT/js/utils/$f.js
done

# JS pages
for f in home login register catalog product cart checkout admin; do
  touch $PROJECT/js/pages/$f.js
done

# Extras
touch $PROJECT/.env
touch $PROJECT/README.md

echo "✅ Estructura creada exitosamente"
find $PROJECT -type f | sort
