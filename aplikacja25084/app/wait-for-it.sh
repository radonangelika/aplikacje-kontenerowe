#!/usr/bin/env bash
set -e

host="$1"
port="$2"
shift 2

echo "Waiting for ${host}:${port}..."
while ! (echo > /dev/tcp/${host}/${port}) >/dev/null 2>&1; do
  sleep 1
done
echo "${host}:${port} is available"

exec "$@"
