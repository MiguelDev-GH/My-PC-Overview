#!/bin/bash

APP_NAME="pc-overview"
INSTALL_DIR="/opt/$APP_NAME"

echo "🗑️ Starting My PC Overview uninstallation..."

if [ -d "$INSTALL_DIR" ]; then
    echo "🧹 Removing main application files (/opt)..."
    sudo rm -rf "$INSTALL_DIR"
fi

if [ -f "/usr/local/bin/$APP_NAME" ]; then
    echo "🔗 Removing global terminal command..."
    sudo rm "/usr/local/bin/$APP_NAME"
fi

if [ "$(uname)" == "Linux" ]; then
    if [ -f "/usr/share/applications/$APP_NAME.desktop" ]; then
        echo "🖥️ Removing desktop shortcut..."
        sudo rm "/usr/share/applications/$APP_NAME.desktop"
    fi
fi

echo "✅ Uninstallation completed successfully! Thank you for the use!"