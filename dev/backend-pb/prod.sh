#!/bin/bash

CURRENT_DIR=$(pwd)
cd "$CURRENT_DIR"

if [ "$1" == "--clear" ]; then
    echo "Clearing cached data"
    rm -rf pb_data/*  # Remove files within "pb_data"
fi

echo "Starting PRODUCTION pocketbase..."
./pocketbase serve --http="173.255.240.135:80"