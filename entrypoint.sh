#!/bin/bash

set -e

function run_docker {
    if command -v docker >/dev/null 2>&1; then
        echo "Starting application with docker compose..."
        docker build -t cicd-wizard-api:latest -f infra/docker/python.Dockerfile .
        docker build -t cicd-wizard-ui:latest -f infra/docker/node.Dockerfile frontend/
        docker compose up -d
    else
        echo "docker not found. Please install it to run the application."
        exit 1
    fi
}

function run_kubernetes {
    if command -v kubectl >/dev/null 2>&1; then
        echo "Starting application with kubernetes..."
        kubectl apply -f infra/kubernetes/
    else
        echo "kubectl not found. Please install it to run the application."
        exit 1
    fi
}

function down {
    echo "Stopping application..."
    status=""
    kube_status=""
    if command -v docker >/dev/null 2>&1; then
        status=$(docker compose ps -q 2>/dev/null || true)
    fi
    if command -v kubectl >/dev/null 2>&1; then
        kube_status=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" 2>/dev/null | grep cicd-wizard || true)
    fi

    if [ -n "$status" ]; then
        docker compose down
    elif [ -n "$kube_status" ]; then
        kubectl delete -f infra/kubernetes/
    else
        echo "No running application found."
    fi
}

if [ "$1" = "docker" ]; then
    echo "Running in docker mode..."
    run_docker
elif [ "$1" = "kubernetes" ]; then
    echo "Running in kubernetes mode..."
    run_kubernetes
elif [ "$1" = "down" ]; then
    down
else
    echo "Invalid argument. Please use 'docker' or 'kubernetes'."
    exit 1
fi
