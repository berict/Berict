#!/bin/bash
cd /berict
git pull
cp -v /berict/file/nginx/default /etc/nginx/sites-enabled/default
nginx -s reload