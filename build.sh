#!/bin/bash
#build-url.sh && build-form.sh && build-target.sh && build-event.sh && build-obj.sh && build-file.sh && sh build-all.sh
cat src/meta/*.js src/core/*.js ../apifunc-js/src/*.js  src/include/*.js src/include/*.js src/*.js src/load/*.js src/form/*.js src/all/*.js > jloads.js