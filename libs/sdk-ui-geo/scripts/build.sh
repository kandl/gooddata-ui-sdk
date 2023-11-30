#!/usr/bin/env bash

_build_styles() {
    sass --load-path=node_modules --load-path=node_modules/mapbox-gl/dist styles/scss/main.scss:styles/css/main.css
}

_clean() {
    rm -rf esm
    rm -rf styles/css
}

_common-build() {
    _build_styles
}

build() {
    _clean
    _common-build
    tsc -p tsconfig.json --incremental false --composite false
}

build-dev() {
    _common-build
    tsc -p tsconfig.dev.json
}

build-dev-watch() {
    _common-build
    tsc --watch -p tsconfig.dev.json
}

build-styles() {
  rm -rf styles/css
  _build_styles
}

FLAG=$1
if [ "$FLAG" = "--dev" ]; then
    build-dev
elif [ "$FLAG" = "--dev-watch" ]; then
    build-dev-watch
elif [ "$FLAG" = "--styles" ]; then
    build-styles
else
    build
fi
