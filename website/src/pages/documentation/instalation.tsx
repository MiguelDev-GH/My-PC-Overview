const Installation = () => {
    return (
        <div className="content">
            <h1>Windows Installation</h1>
            <p>
                For Windows users, <strong>PC Overview</strong> is distributed as a standalone executable (<code>.exe</code>). 
                There is no traditional installation wizard required. Simply download the file to your desired folder and double-click to run it.
            </p>
            <ul>
                <li>
                    <strong>Administrator Privileges:</strong> To ensure accurate data reporting, please run the application with administrative privileges. 
                    This allows the background service to read restricted hardware sensors, such as GPU temperatures and detailed disk data.
                </li>
                <li>
                    <strong>Windows SmartScreen:</strong> Because this is a newly compiled independent application, Windows Defender or SmartScreen might display a "Windows protected your PC" warning. You can safely bypass this by clicking <strong>"More info"</strong> and then <strong>"Run anyway"</strong>.
                </li>
            </ul>

            <h1>Linux & macOS Installation</h1>
            <p>
                For Linux and Mac users, we provide a streamlined installation script. This script automatically downloads the repository and installs all necessary background dependencies.
            </p>
            <ul>
                <li>
                    <strong>Prerequisites:</strong> Before running the command, ensure your system has <strong>Git</strong>, <strong>Node.js</strong>, and <strong>npm</strong> installed.
                </li>
                <li>
                    <strong>Running the Script:</strong> Open your terminal, paste the <code>curl</code> command provided on the Download page, and press Enter. You may be prompted for your user password to allow the script to create global commands.
                </li>
                <li>
                    <strong>Launching the App:</strong> You can now launch the app by typing <code>pc-overview</code> in your terminal. If you are on Linux, the script will also attempt to create a desktop shortcut for easier access.
                </li>
                <li>
                    <strong>macOS Users:</strong> macOS detected: Skipping Linux desktop shortcut creation. You will need to start the application via the terminal using the <code>pc-overview</code> command.
                </li>
            </ul>

            <h1>Troubleshooting & FAQ</h1>
            <p><strong>Q: Why did a black terminal window open, and can I close it?</strong></p>
            <p>
                A: That terminal is the local server working behind the scenes to fetch your hardware metrics. Do not close the terminal window while using the web interface, as this will terminate the data stream.
            </p>

            <p><strong>Q: The web interface opened, but the hardware stats are empty or not updating.</strong></p>
            <p>
                A: This usually happens for two reasons: either the terminal window was accidentally closed, or the application lacks the necessary system permissions. Try restarting the application as an Administrator (Windows) or using <code>sudo pc-overview</code> (Linux/Mac) if standard execution fails to read the sensors.
            </p>

            <h1>Unistalling in Linux & Mac</h1>

            <p>To <strong>unistall</strong> the application, the user need to run the follow command: </p>
            <code>curl -sL https://raw.githubusercontent.com/MiguelDev-GH/My-PC-Overview/main/server/uninstall.sh | sudo bash</code>

        </div>
    );
}

export default Installation;