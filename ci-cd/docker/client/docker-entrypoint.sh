#!/bin/sh
set -e

# Ensure we have access rights to the directory containing content to serve
# find /app -type d -exec chmod 755 {} \;
# find /app -type f -exec chmod 644 {} \;

pattern='<base href="\/"\s*\/?>'
replacement='<base href="'$BASE_URL'">'

sed -i -e "s+$pattern+$replacement+g" /usr/share/nginx/html/index.html
envsubst '$BASE_URL:$API_URL' < "/etc/nginx/conf.d/default.conf" > "/etc/nginx/conf.d/default.conf"

exec "$@"