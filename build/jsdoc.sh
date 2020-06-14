#!/bin/bash

PROJECT_ROOT_PATH=$(pwd)

echo "开始生成 Findora extensions wallet 文档"

jsdoc -c jsdoc.jsonc

echo "开始复制自定义样式"

cp -R  ${PROJECT_ROOT_PATH}/docs-src ${PROJECT_ROOT_PATH}/docs

echo "文档生成完毕"
