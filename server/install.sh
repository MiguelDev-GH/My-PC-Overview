#!/bin/bash

# Configuration
APP_NAME="pc-overview"
INSTALL_DIR="/opt/$APP_NAME"
REPO_URL="https://github.com/YOUR_USERNAME/My-PC-Overview.git"

echo "Starting My PC Overview installation..."

# 1. Clone or Update files
if [ -d "$INSTALL_DIR" ]; then
    echo "common: Updating existing installation..."
    sudo rm -rf $INSTALL_DIR
fi

echo "common: Cloning repository from GitHub..."
sudo git clone $REPO_URL $INSTALL_DIR

# 2. Install dependencies
echo "Installing server dependencies (production mode)..."
cd $INSTALL_DIR/server
sudo npm install --production

# 3. Create global terminal command
echo "Creating symbolic link in /usr/local/bin..."
sudo bash -c "cat > /usr/local/bin/$APP_NAME" <<EOF
#!/bin/bash
cd $INSTALL_DIR/server
node app.js
EOF
sudo chmod +x /usr/local/bin/$APP_NAME

# 4. Create Desktop Entry (Application Menu)
echo "Creating desktop shortcut..."
sudo bash -c "cat > /usr/share/applications/$APP_NAME.desktop" <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=My PC Overview
Comment=Local Hardware Monitor
Exec=$APP_NAME
Icon=$INSTALL_DIR/icon.png
Terminal=true
Categories=System;Utility;
EOF

echo "✅ Installation completed successfully!"
echo "You can now launch the app by typing '$APP_NAME' in your terminal or searching for it in your applications menu."