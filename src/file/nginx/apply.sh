#!/bin/bash
echo Fetching latest commit.
cd /berict
git pull

echo Updating nginx config.
cp -v /berict/file/nginx/default /etc/nginx/sites-enabled/default

echo Restarting nginx.
nginx -s reload

echo Finished.