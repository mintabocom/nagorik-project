#!/bin/bash

echo "[NagoMan] Starting Server Setup..."

# Update System
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "[NagoMan] Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
else
    echo "[NagoMan] Docker already installed."
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "[NagoMan] Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "[NagoMan] Docker Compose already installed."
fi

# Set permissions for scripts
chmod +x *.sh
chmod +x migrate.sh

echo "[NagoMan] Server Setup Complete! Please logout and login again for group changes to take effect."
