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

    if [ ! -f "./gulpfile.js" ]; then
        mv $ebm/gulpfile.js .
    fi

    # Handle src files
    if [ ! -d "$src_directory" ]; then
        mkdir -p $src_directory
    fi

    src_files=( 'sass' 'js' 'html' )
    for directory in "${src_files[@]}"
    do
        if [ -d "$src_directory/$directory" ]; then
            mv $ebm/$directory/* $src_directory/$directory
        else
            mv $ebm/$directory $src_directory
        fi
        rm -rf $ebm/$directory
    done

    # Handle destination directory
    if [ ! -d "$dest_directory" ]; then
        mkdir ./$dest_directory
    fi

    dest_directories=( 'icons' 'img' 'fonts' )
    for directory in "${dest_directories[@]}"
    do
        if [ -d "$dest_directory/$directory" ]; then
            mv $ebm/$directory/* $dest_directory/$directory
        else
            mv $ebm/$directory $dest_directory
        fi
    done

    # Handle EBM directories
    ebm_directories=( 'control' 'elements' 'functions' 'helpers' 'modules' )
    for directory in "${ebm_directories[@]}"
    do
        mv $ebm/$directory $ebm/
    done
}

ebm_install $1 $2
