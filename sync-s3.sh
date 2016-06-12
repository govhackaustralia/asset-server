#!/usr/bin/env bash

aws s3 sync public s3://assets.govhack.org --delete --acl public-read
