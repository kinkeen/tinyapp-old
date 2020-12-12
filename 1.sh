#!/bin/bash
echo "Kill all processes related to express"
pkill -f express
pkill -f "node express_server.js"

echo "Run project"
node express_server.js