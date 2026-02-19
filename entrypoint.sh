#!/bin/bash

set -e

if ! [ command -v "docker" &> /dev/null ]; then
    echo "Starting application with docker compose..."
    docker build -t cicd-wizard-api:latest -f infra/docker/python.Dockerfile .
    docker build -t cicd-wizard-ui:latest -f infra/docker/node.Dockerfile frontend/
    docker compose up -d
else
    echo "docker not found. Please install it to run the application."
    exit 1
fi
