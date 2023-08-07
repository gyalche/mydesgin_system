#!/bin/bash
set -eu

BASE_PATH="./src/shared/css"

TTF_FILE=${BASE_PATH}/rds-icons.ttf
WOFF_FILE=${BASE_PATH}/rds-icons.woff
WOFF2_FILE=${BASE_PATH}/rds-icons.woff2

TTF="data:application/font-ttf;charset=utf-8;base64,$(base64 -i $TTF_FILE)"
WOFF="data:application/font-woff;charset=utf-8;base64,$(base64 -i $WOFF_FILE)"
WOFF2="data:application/font-woff2;charset=utf-8;base64,$(base64 -i $WOFF2_FILE)"

CSS_FILE_IN=${BASE_PATH}/rds-icons.css
CSS_FILE_OUT=${BASE_PATH}/icons.module.css

sed "s|./rds-icons.ttf?[0-9a-f]*|$TTF|g" $CSS_FILE_IN | sed "s|./rds-icons.woff?[0-9a-f]*|$WOFF|g" | sed "s|./rds-icons.woff2?[0-9a-f]*|$WOFF2|g" | sed "s|i\[class^=\"rds-\"]:before,|i\[class^=\"rds-\"]:before, i\[class*=\"_rds-\"]:before,|g" > $CSS_FILE_OUT

rm $CSS_FILE_IN $TTF_FILE $WOFF_FILE $WOFF2_FILE
