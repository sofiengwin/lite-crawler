#!/bin/bash

echo "Uploading Images"

aws s3 cp . s3://litmus-lite/ --recursive --exclude "*" --include "*.png" --profile terraform

echo "Removing images"

rm *.png


