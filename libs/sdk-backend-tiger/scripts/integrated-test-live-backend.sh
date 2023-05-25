#!/bin/bash
set -e
ROOT_DIR=$(echo $(cd $(dirname $0)/.. && pwd -P))
TESTS_DIR="${ROOT_DIR}/tests"

NODE_TLS_REJECT_UNAUTHORIZED=0 NODE_NO_WARNINGS=1 node --experimental-vm-modules node_modules/jest/bin/jest.js --config integrated-test.config.js -e
exit 0
