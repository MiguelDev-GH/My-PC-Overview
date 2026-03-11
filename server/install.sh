#!/bin/bash

# Configuration
APP_NAME="pc-overview"
INSTALL_DIR="/opt/$APP_NAME"
# Link público (não pede senha)
REPO_URL="https://github.com/MiguelDev-GH/My-PC-Overview.git"

echo "🚀 Starting My PC Overview installation..."

echo "🔍 Checking system requirements..."

if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed."
    echo "👉 Please install Git and try again."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    echo "👉 Please install Node.js (v18 or higher recommended) and try again."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed."
    echo "👉 Please install npm and try again."
    exit 1
fi

echo "✅ All requirements met!"
echo "----------------------------------------"

# 1. Clone or Update files
echo "common: Cleaning old files..."
sudo rm -rf $INSTALL_DIR

echo "common: Cloning repository from GitHub..."
# Clonando em modo silencioso e público
sudo git clone $REPO_URL $INSTALL_DIR

# Verifica se o clone deu certo antes de prosseguir
if [ ! -d "$INSTALL_DIR" ]; then
    echo "❌ Error: Failed to clone repository. Check your internet connection."
    exit 1
fi

# 2. Install dependencies
echo "📦 Installing server dependencies..."
cd $INSTALL_DIR/server || exit
sudo npm install --omit=dev

# 3. Create global terminal command
echo "🔗 Creating symbolic link in /usr/local/bin..."
sudo bash -c "cat > /usr/local/bin/$APP_NAME" <<EOF
#!/bin/bash
cd $INSTALL_DIR/server
node app.js
EOF
sudo chmod +x /usr/local/bin/$APP_NAME

# 4. Create Desktop Entry (Verifica se é Linux ou Mac)
if [ "$(uname)" == "Linux" ]; then
    echo "🖥️ Creating desktop shortcut..."
    sudo bash -c "cat > /usr/share/applications/$APP_NAME.desktop" <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=My PC Overview
Comment=Local Hardware Monitor
Exec=$APP_NAME
Icon=$INSTALL_DIR/server/icon.png
Terminal=true
Categories=System;Utility;
EOF
else
    echo "🍏 macOS detected: Skipping Linux desktop shortcut creation."
fi

echo "✅ Installation completed successfully!"
echo "You can now launch the app by typing '$APP_NAME' in your terminal."