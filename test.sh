#!/bin/bash

#value of default
filename="test"
if ! [ -z $1 ]; then 
    filename=$1
fi

if [[ "x$filename" == "xindex" ]]; then
    echo "Sorry, but I don't think you want to override that file"
    echo "*execution ended*"
    exit 0
fi

if [[ "x$filename" == "xnone" ]]; then
    echo "filename is none, skipping compiling and creating .html"
else
    echo "Starting compilation..."
    #compile
    java -jar tools/closure.jar --js src/core/*.js src/*.js --js_output_file tools/out.js --compilation_level ADVANCED_OPTIMIZATIONS

    #create .html
    rm -f ./$filename.html # I don't know if this ilne is neccesarry, but uh

    cat tools/html_top.txt > ./$filename.html
    cat tools/out.js >> ./$filename.html
    cat tools/html_bottom.txt >> ./$filename.html
fi


#run server
python -m http.server