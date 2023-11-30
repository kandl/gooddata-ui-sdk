#!/usr/bin/env bash

_clean() {
    rm -rf esm
    rm -rf styles/css
}

build() {
    _clean
    tsc -p tsconfig.json --incremental false --composite false
}

build-dev() {
    tsc -p tsconfig.json
}

build-dev-watch() {
    tsc --watch -p tsconfig.json
}

FLAG=$1
if [ "$FLAG" = "--dev" ]; then
    build-dev
elif [ "$FLAG" = "--dev-watch" ]; then
    build-dev-watch
else
    build
fi
