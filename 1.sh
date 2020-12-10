#!/bin/bash
echo "Kill all processes related to express"
pkill -f express

echo "Run project"
node express_server.js