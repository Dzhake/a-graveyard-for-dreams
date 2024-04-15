#!/bin/sh
java -jar tools/closure.jar --js src/core/*.js src/*.js --js_output_file tools/out.js --compilation_level ADVANCED_OPTIMIZATIONS --language_out ECMASCRIPT_2018
#./compile.sh

cat tools/html_top.txt > test/index.html
cat tools/out.js >> test/index.html
cat tools/html_bottom.txt >> test/index.html
# The best way to do this...
cp -r ./assets test/assets

cd test
python -m http.server


