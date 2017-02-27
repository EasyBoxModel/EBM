#!/bin/bash
# EBM Install

function ebm_install
{
    mkdir -p src/img
    mv icons src
    mv fonts src

    npm install
}

ebm_install
