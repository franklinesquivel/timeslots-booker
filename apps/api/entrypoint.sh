#!/bin/sh

yarn migrate:deploy
exec "$@"
