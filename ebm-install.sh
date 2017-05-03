#!/bin/bash
# EBM Install

function ebm_install
{
    local src_directory="./$1"
    local dest_directory="./$2"

    if [ -z "$src_directory" ]; then
        echo "Need to specify a source directory"
        exit
    fi
    if [ -z "$dest_directory" ]; then
        echo "Need to specify a destination directory"
        exit
    fi

    local ebm="./node_modules/ebm"

    mkdir -p $src_directory
    mv $ebm/gulpfile.js $src_directory
    mv $ebm/sass $src_directory
    mv $ebm/js $src_directory
    mv $ebm/html $src_directory

    mkdir -p ./$dest_directory/img
    mv $ebm/icons $dest_directory
    mv $ebm/fonts $dest_directory

    mv $ebm/ebm/control $ebm/
    mv $ebm/ebm/elements $ebm/
    mv $ebm/ebm/functions $ebm/
    mv $ebm/ebm/helpers $ebm/
    mv $ebm/ebm/modules $ebm/
    rm -rf $ebm/ebm
}

ebm_install $1 $2
